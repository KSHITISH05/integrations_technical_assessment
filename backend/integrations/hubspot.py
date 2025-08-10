# hubspot.py

import os
import json
import secrets
import asyncio
import httpx
import base64
import requests
from integrations.integration_item import IntegrationItem
from urllib.parse import quote

from fastapi import Request, HTTPException
from fastapi.responses import HTMLResponse

from redis_client import add_key_value_redis, get_value_redis, delete_key_redis


# Environment configuration (must be provided via backend/.env)
HUBSPOT_CLIENT_ID = os.environ.get('HUBSPOT_CLIENT_ID')
HUBSPOT_CLIENT_SECRET = os.environ.get('HUBSPOT_CLIENT_SECRET')
HUBSPOT_REDIRECT_URI = os.environ.get('HUBSPOT_REDIRECT_URI')

# Minimal scope to read contacts; can be extended via HUBSPOT_SCOPES env var
HUBSPOT_SCOPES = os.environ.get('HUBSPOT_SCOPES', 'crm.objects.contacts.read')

AUTHORIZATION_URL_BASE = 'https://app.hubspot.com/oauth/authorize'


async def authorize_hubspot(user_id: str, org_id: str):
    if not HUBSPOT_CLIENT_ID or not HUBSPOT_REDIRECT_URI:
        raise HTTPException(status_code=500, detail='HubSpot env vars not configured.')

    state_data = {
        'state': secrets.token_urlsafe(32),
        'user_id': user_id,
        'org_id': org_id,
    }

    # Save original state payload in Redis (10 minutes)
    await add_key_value_redis(
        f'hubspot_state:{org_id}:{user_id}', json.dumps(state_data), expire=600
    )

    # Prepare URL parameters (encode everything that can contain special chars)
    encoded_state_for_url = base64.urlsafe_b64encode(
        json.dumps(state_data).encode('utf-8')
    ).decode('utf-8')
    state_param = quote(encoded_state_for_url, safe='')
    redirect_uri_encoded = quote(HUBSPOT_REDIRECT_URI, safe='')
    scope_encoded = quote(HUBSPOT_SCOPES, safe=' ')

    auth_url = (
        f"{AUTHORIZATION_URL_BASE}?client_id={HUBSPOT_CLIENT_ID}"
        f"&redirect_uri={redirect_uri_encoded}"
        f"&scope={scope_encoded}"
        f"&state={state_param}"
    )
    return auth_url


async def oauth2callback_hubspot(request: Request):
    if request.query_params.get('error'):
        raise HTTPException(
            status_code=400,
            detail=request.query_params.get('error_description')
            or request.query_params.get('error'),
        )

    code = request.query_params.get('code')
    encoded_state = request.query_params.get('state')
    if not code or not encoded_state:
        raise HTTPException(status_code=400, detail='Missing code or state')

    state_data = json.loads(base64.urlsafe_b64decode(encoded_state).decode('utf-8'))
    original_state = state_data.get('state')
    user_id = state_data.get('user_id')
    org_id = state_data.get('org_id')

    saved_state = await get_value_redis(f'hubspot_state:{org_id}:{user_id}')
    if not saved_state or original_state != json.loads(saved_state).get('state'):
        raise HTTPException(status_code=400, detail='State does not match.')

    if not HUBSPOT_CLIENT_ID or not HUBSPOT_CLIENT_SECRET or not HUBSPOT_REDIRECT_URI:
        raise HTTPException(status_code=500, detail='HubSpot env vars not configured.')

    async with httpx.AsyncClient() as client:
        response, _ = await asyncio.gather(
            client.post(
                'https://api.hubapi.com/oauth/v1/token',
                data={
                    'grant_type': 'authorization_code',
                    'client_id': HUBSPOT_CLIENT_ID,
                    'client_secret': HUBSPOT_CLIENT_SECRET,
                    'redirect_uri': HUBSPOT_REDIRECT_URI,
                    'code': code,
                },
                headers={'Content-Type': 'application/x-www-form-urlencoded'},
            ),
            delete_key_redis(f'hubspot_state:{org_id}:{user_id}'),
        )

    if response.status_code >= 400:
        raise HTTPException(status_code=response.status_code, detail=response.text)

    await add_key_value_redis(
        f'hubspot_credentials:{org_id}:{user_id}',
        json.dumps(response.json()),
        expire=600,
    )

    return HTMLResponse(content="""
    <html>
      <script>window.close();</script>
    </html>
    """)


async def get_hubspot_credentials(user_id: str, org_id: str):
    key = f'hubspot_credentials:{org_id}:{user_id}'
    credentials = await get_value_redis(key)
    if not credentials:
        raise HTTPException(status_code=400, detail='No credentials found.')
    await delete_key_redis(key)
    return json.loads(credentials)


def create_integration_item_metadata_object(response_json):
    props = response_json.get('properties', {}) or {}
    first_name = props.get('firstname') or ''
    last_name = props.get('lastname') or ''
    email = props.get('email')

    display_name = (' '.join([first_name, last_name]).strip()) or email or f"Contact {response_json.get('id')}"

    return IntegrationItem(
        id=response_json.get('id'),
        type='Contact',
        name=display_name,
        creation_time=response_json.get('createdAt'),
        last_modified_time=response_json.get('updatedAt'),
    )

async def get_items_hubspot(credentials):
    # credentials arrives as a JSON string via form-data
    if isinstance(credentials, (bytes, bytearray)):
        credentials = credentials.decode('utf-8')

    data = json.loads(credentials)
    access_token = data.get('access_token')
    if not access_token:
        raise HTTPException(status_code=400, detail='Missing access_token')

    headers = {'Authorization': f'Bearer {access_token}'}
    url = 'https://api.hubapi.com/crm/v3/objects/contacts'
    params = {'limit': 100, 'properties': 'firstname,lastname,email'}

    items = []
    after = None

    while True:
        page_params = dict(params)
        if after:
            page_params['after'] = after

        resp = requests.get(url, headers=headers, params=page_params)
        if resp.status_code >= 400:
            raise HTTPException(status_code=resp.status_code, detail=resp.text)

        body = resp.json()
        for contact in body.get('results', []):
            items.append(create_integration_item_metadata_object(contact))

        paging = body.get('paging', {})
        next_page = paging.get('next', {})
        after = next_page.get('after')
        if not after:
            break

    return items