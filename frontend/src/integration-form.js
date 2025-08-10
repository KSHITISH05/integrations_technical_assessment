// import { useState } from 'react';
// import {
//     Box,
//     Autocomplete,
//     TextField,
// } from '@mui/material';
// import { AirtableIntegration } from './integrations/airtable';
// import { NotionIntegration } from './integrations/notion';
// import { HubSpotIntegration } from './integrations/hubspot';
// import { DataForm } from './data-form';

// const integrationMapping = {
//     'Notion': NotionIntegration,
//     'Airtable': AirtableIntegration,
//     'HubSpot': HubSpotIntegration,
// };

// export const IntegrationForm = () => {
//     const [integrationParams, setIntegrationParams] = useState({});
//     const [user, setUser] = useState('TestUser');
//     const [org, setOrg] = useState('TestOrg');
//     const [currType, setCurrType] = useState(null);
//     const CurrIntegration = integrationMapping[currType];

//   return (
//     <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column' sx={{ width: '100%' }}>
//         <Box display='flex' flexDirection='column'>
//         <TextField
//             label="User"
//             value={user}
//             onChange={(e) => setUser(e.target.value)}
//             sx={{mt: 2}}
//         />
//         <TextField
//             label="Organization"
//             value={org}
//             onChange={(e) => setOrg(e.target.value)}
//             sx={{mt: 2}}
//         />
//         <Autocomplete
//             id="integration-type"
//             options={Object.keys(integrationMapping)}
//             sx={{ width: 300, mt: 2 }}
//             renderInput={(params) => <TextField {...params} label="Integration Type" />}
//             onChange={(e, value) => setCurrType(value)}
//         />
//         </Box>
//         {currType && 
//         <Box>
//             <CurrIntegration user={user} org={org} integrationParams={integrationParams} setIntegrationParams={setIntegrationParams} />
//         </Box>
//         }
//         {integrationParams?.credentials && 
//         <Box sx={{mt: 2}}>
//             <DataForm integrationType={integrationParams?.type} credentials={integrationParams?.credentials} />
//         </Box>
//         }
//     </Box>
//   );
// }


import { useState } from 'react';
import {
    Box,
    Autocomplete,
    TextField,
} from '@mui/material';
import { AirtableIntegration } from './integrations/airtable';
import { NotionIntegration } from './integrations/notion';
import { HubSpotIntegration } from './integrations/hubspot';
import { DataForm } from './data-form';

const integrationMapping = {
    'Notion': NotionIntegration,
    'Airtable': AirtableIntegration,
    'HubSpot': HubSpotIntegration,
};

export const IntegrationForm = () => {
    const [integrationParams, setIntegrationParams] = useState({});
    const [user, setUser] = useState('TestUser');
    const [org, setOrg] = useState('TestOrg');
    const [currType, setCurrType] = useState(null);
    const CurrIntegration = integrationMapping[currType];

    return (
        <div className="space-y-8">
            {/* Configuration Card */}
            <div className="card-gradient rounded-lg p-6 space-y-6 animate-slide-in [animation-delay:200ms]">
                <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gradient-primary rounded"></div>
                    <h2 className="text-xl font-semibold text-foreground">Integration Configuration</h2>
                </div>
                
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">User</label>
                        <input
                            type="text"
                            value={user}
                            onChange={(e) => setUser(e.target.value)}
                            className="w-full px-3 py-2 bg-secondary border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Organization</label>
                        <input
                            type="text"
                            value={org}
                            onChange={(e) => setOrg(e.target.value)}
                            className="w-full px-3 py-2 bg-secondary border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Integration Type</label>
                        <select
                            value={currType || ''}
                            onChange={(e) => setCurrType(e.target.value)}
                            className="w-full px-3 py-2 bg-secondary border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        >
                            <option value="">Select Integration</option>
                            {Object.keys(integrationMapping).map((type) => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Integration Component */}
            {currType && (
                <div className="animate-slide-in [animation-delay:300ms]">
                    <CurrIntegration 
                        user={user} 
                        org={org} 
                        integrationParams={integrationParams} 
                        setIntegrationParams={setIntegrationParams} 
                    />
                </div>
            )}

            {/* Data Form */}
            {integrationParams?.credentials && (
                <div className="animate-slide-in [animation-delay:400ms]">
                    <DataForm 
                        integrationType={integrationParams?.type} 
                        credentials={integrationParams?.credentials} 
                    />
                </div>
            )}
        </div>
    );
}
