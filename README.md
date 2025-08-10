# 🚀 **Data Integration Hub - Complete OAuth Integration System**

[![Python](https://img.shields.io/badge/Python-3.11-blue.svg)](https://www.python.org/downloads/)
[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.94.0-green.svg)](https://fastapi.tiangolo.com/)
[![Redis](https://img.shields.io/badge/Redis-7.0-red.svg)](https://redis.io/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A modern, full-stack web application for seamless OAuth integrations with popular platforms including **HubSpot**, **Airtable**, and **Notion**. Features a beautiful dark-themed UI with smooth animations and comprehensive security implementation.

## ✨ **Features**

- 🔐 **Complete OAuth 2.0 Implementation** - Secure authentication flows
- 🎨 **Modern Dark UI** - Beautiful interface with gradient accents and animations
- 📊 **Real-time Data Integration** - Fetch and display data from multiple platforms
- 🛡️ **Production-Ready Security** - State validation, token management, error handling
- 📱 **Responsive Design** - Works seamlessly on all devices
- ⚡ **High Performance** - Async/await patterns and optimized rendering
- 🔄 **Multi-Platform Support** - HubSpot, Airtable, Notion integrations
- 📈 **Scalable Architecture** - Redis caching, modular design

## 🏗️ **Architecture**

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Frontend│    │  FastAPI Backend│    │   Redis Cache   │
│                 │    │                 │    │                 │
│ • Dark Theme UI │◄──►│ • OAuth Endpoints│◄──►│ • State Storage │
│ • Animations    │    │ • API Integration│    │ • Token Cache   │
│ • Responsive    │    │ • Security      │    │ • Session Mgmt  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │ External APIs   │
                    │                 │
                    │ • HubSpot CRM   │
                    │ • Airtable      │
                    │ • Notion        │
                    └─────────────────┘
```

## 🚀 **Quick Start**

### **Prerequisites**

- **Python 3.11+** (⚠️ Python 3.12 not supported due to dependency conflicts)
- **Node.js 16+**
- **WSL (Ubuntu)** for Redis
- **Git**

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/KSHITISH05/integrations_technical_assessment.git
   cd integrations_technical_assessment
   ```

2. **Setup Redis (WSL)**
   ```bash
   # Open WSL terminal
   wsl
   
   # Install and start Redis
   sudo apt update
   sudo apt install -y redis-server
   sudo service redis-server start
   sudo systemctl enable redis-server
   
   # Verify Redis
   redis-cli ping
   # Should return: PONG
   ```

3. **Backend Setup**
   ```bash
   cd backend
   
   # Create virtual environment
   python -m venv .venv
   .venv\Scripts\activate  # Windows
   # source .venv/bin/activate  # Linux/Mac
   
   # Install dependencies
   pip install -r requirements.txt
   
   # Create environment file
   copy .env.example .env
   # Edit .env with your credentials
   ```

4. **Frontend Setup**
   ```bash
   cd frontend
   
   # Install dependencies
   npm install
   
   # Start development server
   npm start
   ```

5. **Start the Application**
   ```bash
   # Terminal 1: Backend
   cd backend
   .venv\Scripts\activate
   uvicorn main:app --host 0.0.0.0 --port 8000 --reload
   
   # Terminal 2: Frontend
   cd frontend
   npm start
   ```

6. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

## 🔧 **Configuration**

### **Environment Variables**

Create a `.env` file in the `backend/` directory:

```bash
# HubSpot OAuth
HUBSPOT_CLIENT_ID=your_hubspot_client_id
HUBSPOT_CLIENT_SECRET=your_hubspot_client_secret
HUBSPOT_REDIRECT_URI=http://localhost:8000/integrations/hubspot/oauth2callback

# Airtable OAuth (Optional)
AIRTABLE_CLIENT_ID=your_airtable_client_id
AIRTABLE_CLIENT_SECRET=your_airtable_client_secret

# Redis Configuration
REDIS_HOST=localhost
```

### **HubSpot App Setup**

1. Go to [HubSpot Developer Portal](https://developers.hubspot.com/)
2. Create a new app
3. Add OAuth redirect URL: `http://localhost:8000/integrations/hubspot/oauth2callback`
4. Enable scope: `crm.objects.contacts.read`
5. Copy Client ID and Client Secret to your `.env` file

## 📚 **Usage**

### **Connecting to HubSpot**

1. Open http://localhost:3000
2. Select "HubSpot" from the Integration Type dropdown
3. Click "Connect to HubSpot"
4. Authorize in the popup window
5. Click "Load Data" to fetch contacts

### **API Endpoints**

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/integrations/hubspot/authorize` | Generate OAuth URL |
| `GET` | `/integrations/hubspot/oauth2callback` | Handle OAuth callback |
| `POST` | `/integrations/hubspot/credentials` | Retrieve stored tokens |
| `POST` | `/integrations/hubspot/load` | Fetch contacts data |

### **Data Format**

```json
{
  "id": "201790219986",
  "type": "Contact",
  "name": "Brian Halligan (Sample Contact)",
  "creation_time": "2025-08-09T16:10:09.264Z",
  "last_modified_time": "2025-08-09T18:10:19.506Z"
}
```

## 🛡️ **Security Features**

- **OAuth 2.0 State Validation** - Prevents CSRF attacks
- **Temporary Token Storage** - Redis with automatic expiry
- **Environment Variable Configuration** - No hardcoded secrets
- **Input Validation** - Comprehensive parameter validation
- **Error Handling** - Secure error messages without data leakage
- **CORS Configuration** - Proper cross-origin handling

## 🎨 **UI/UX Features**

- **Dark Theme** - Professional dark interface with gradient accents
- **Smooth Animations** - Fade-in, slide-in, and pulse effects
- **Loading States** - Progress indicators and spinners
- **Responsive Design** - Mobile-first approach
- **Accessibility** - WCAG compliant with proper ARIA labels
- **Error Feedback** - User-friendly error messages

## 🛠️ **Technical Stack**

### **Backend**
- **FastAPI** - Modern, fast web framework
- **Redis** - In-memory data store for OAuth state
- **httpx** - Async HTTP client
- **Python 3.11** - Latest stable Python version

### **Frontend**
- **React 18** - Modern UI library
- **Material-UI** - Component library
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client

### **Development Tools**
- **Uvicorn** - ASGI server
- **npm** - Package manager
- **Git** - Version control

## ⚡ **Performance**

- **Async/await patterns** for non-blocking operations
- **Redis caching** for OAuth state management
- **Optimized rendering** with React best practices
- **Connection pooling** for external API calls
- **Memory-efficient** data handling

## 🔍 **Testing**

### **Manual Testing**
- ✅ OAuth flow completion
- ✅ Data retrieval and display
- ✅ Error handling scenarios
- ✅ UI responsiveness
- ✅ Cross-browser compatibility

### **Integration Testing**
- ✅ Backend-frontend communication
- ✅ Redis integration
- ✅ External API integration
- ✅ Error recovery

## 🚀 **Deployment**

### **Production Considerations**
- Use Redis cluster for high availability
- Implement database for persistent storage
- Add monitoring and logging
- Configure HTTPS and security headers
- Set up CI/CD pipeline

### **Environment Variables**
```bash
# Production
REDIS_URL=redis://prod-cluster:6379
HUBSPOT_CLIENT_ID=prod_client_id
HUBSPOT_CLIENT_SECRET=prod_client_secret
```

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 **Development**

### **Project Structure**
```
integrations_technical_assessment/
├── backend/
│   ├── integrations/
│   │   ├── hubspot.py      # HubSpot OAuth implementation
│   │   ├── airtable.py     # Airtable integration
│   │   └── notion.py       # Notion integration
│   ├── main.py             # FastAPI application
│   ├── redis_client.py     # Redis utilities
│   └── requirements.txt    # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── integrations/   # React integration components
│   │   ├── App.js          # Main application component
│   │   └── index.js        # Application entry point
│   └── package.json        # Node.js dependencies
└── README.md               # This file
```

### **Available Scripts**

```bash
# Backend
uvicorn main:app --reload          # Start development server
pip install -r requirements.txt     # Install dependencies

# Frontend
npm start                           # Start development server
npm build                          # Build for production
npm test                           # Run tests
```

## 🐛 **Troubleshooting**

### **Common Issues**

#### **Redis Connection Failed**
```bash
# Check Redis status
sudo service redis-server status
redis-cli ping
```

#### **Python Dependencies Error**
```bash
# Ensure Python 3.11 is used
python --version
pip install -r requirements.txt --no-cache-dir
```

#### **OAuth State Mismatch**
```bash
# Clear Redis state
redis-cli DEL "hubspot_state:TestOrg:TestUser"
```

#### **Port Already in Use**
```bash
# Find and kill process
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 **Acknowledgments**

- [FastAPI](https://fastapi.tiangolo.com/) - Modern web framework
- [React](https://reactjs.org/) - UI library
- [HubSpot API](https://developers.hubspot.com/) - CRM integration
- [Material-UI](https://mui.com/) - Component library
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework

## 📞 **Support**

For support and questions:
- Create an issue in the repository
- Check the troubleshooting section
- Review the API documentation at http://localhost:8000/docs

---

**Built with ❤️ using modern web technologies**

[![Made with Python](https://img.shields.io/badge/Made%20with-Python-1f425f.svg)](https://www.python.org/)
[![Made with React](https://img.shields.io/badge/Made%20with-React-61dafb.svg)](https://reactjs.org/)
[![Made with FastAPI](https://img.shields.io/badge/Made%20with-FastAPI-009688.svg)](https://fastapi.tiangolo.com/)
