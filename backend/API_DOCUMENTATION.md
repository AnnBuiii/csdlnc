# 📚 Smart Recruitment System - API Documentation

## Overview

This is a comprehensive OpenAPI/Swagger documentation for the Smart Recruitment System API. The system supports candidates (job seekers), recruiters (employers), and administrators with features for job searching, applications, interviews, recommendations, and analytics.

## 📁 Generated Files

1. **`openapi.yaml`** - Complete OpenAPI 3.0.3 specification file
   - Contains all API endpoints with request/response schemas
   - Includes authentication details, parameters, and examples
   - Validated OpenAPI format

2. **`swagger.html`** - Interactive Swagger UI documentation
   - Beautiful, responsive interface
   - Try-it-out feature for testing endpoints
   - Built with Swagger UI CDN

3. **Integrated in `src/app.js`** - Documentation endpoints:
   - `GET /docs` - Redirects to documentation
   - `GET /docs.html` - HTML documentation page
   - `GET /openapi.yaml` - Raw OpenAPI specification

## 🔗 Accessing Documentation

Once the server is running (port 8000):

| URL | Description |
|-----|-------------|
| `http://localhost:8000/docs` | Main documentation page |
| `http://localhost:8000/docs.html` | Direct HTML docs |
| `http://localhost:8000/openapi.yaml` | Raw OpenAPI spec |
| `https://editor.swagger.io/?url=http://localhost:8000/openapi.yaml` | Swagger Editor (external) |

## 🚀 Key Features Documentation

### Authentication System
- JWT-based authentication with refresh tokens
- Three user roles: `candidate`, `recruiter`, `admin`
- Token format: `Authorization: Bearer <jwt-token>`

### Main API Categories

1. **Authentication** (`/api/auth/`)
   - Registration (candidate/recruiter)
   - Login/Logout
   - Token refresh
   - Current user info

2. **Candidates** (`/api/candidates/`)
   - Profile management
   - Experience/skills tracking
   - Public profile viewing

3. **Jobs** (`/api/jobs/`)
   - Job search and filtering
   - Job posting (recruiters)
   - Job details and related jobs

4. **Applications** (`/api/applications/`)
   - Submit applications
   - Track application status
   - View application history

5. **Interviews** (`/api/interviews/`)
   - Schedule interviews
   - Interview management
   - Result tracking

6. **Recommendations** (`/api/recommendations/`)
   - Job recommendations for candidates
   - Candidate recommendations for jobs
   - Similar candidate search

7. **Analytics** (`/api/analytics/`)
   - Recruiter dashboard
   - Admin statistics
   - Job analytics

## 📊 API Structure

### Base URLs
- Development: `http://localhost:8000/api`
- Production: `https://api.srs.com/api`

### Response Format
All API responses follow this structure:
```json
{
  "success": true|false,
  "message": "Descriptive message",
  "data": object|array,
  "meta": { /* pagination info */ }
}
```

### Error Handling
Standard error responses include:
```json
{
  "success": false,
  "message": "Error description",
  "error": "ErrorType",
  "statusCode": 400,
  "timestamp": "2024-01-01T00:00:00Z"
}
```

## 🛠️ Using the OpenAPI Specification

### With Swagger Tools
```bash
# Validate the spec
npx @redocly/cli lint openapi.yaml

# Generate client SDKs
openapi-generator-cli generate -i openapi.yaml -g typescript-axios -o client-sdk

# Generate server stubs
openapi-generator-cli generate -i openapi.yaml -g nodejs-express-server -o server-stubs
```

### With Editor Tools
1. **Swagger Editor**: Paste URL `http://localhost:8000/openapi.yaml`
2. **Postman**: Import from URL or file
3. **Redoc**: Generate beautiful static docs

## 🔍 Example API Calls

### Register Candidate
```bash
curl -X POST "http://localhost:8000/api/auth/register/candidate" \
  -H "Content-Type: application/json" \
  -d '{"email": "candidate@example.com", "password": "password123", "fullName": "Nguyen Van A"}'
```

### Search Jobs
```bash
curl -X GET "http://localhost:8000/api/jobs?keyword=developer&location=Hanoi&jobType=fulltime"
```

### Submit Application
```bash
curl -X POST "http://localhost:8000/api/applications" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..." \
  -H "Content-Type: application/json" \
  -d '{"jobId": "123e4567-e89b-12d3-a456-426614174000", "resumeUrl": "https://storage.com/resume.pdf"}'
```

## 🧪 Testing the Documentation

1. **Start the server**:
   ```bash
   cd backend
   npm start
   ```

2. **Verify endpoints**:
   - Open browser to `http://localhost:8000/docs`
   - Click on `/health` endpoint to test connection
   - Navigate through different API sections

3. **Try endpoints**:
   - Use the "Try it out" button in Swagger UI
   - Test public endpoints first (jobs search)
   - Register test users to try authenticated endpoints

## 🎨 Documentation Features

- **Interactive UI**: Try endpoints directly from browser
- **Code generation**: Copy code snippets for various languages
- **Schema visualization**: See request/response structures
- **Authentication helper**: Add tokens for testing
- **Responsive design**: Works on desktop and mobile

## 📈 Maintenance

To update the documentation:

1. **Update `openapi.yaml`** when API changes
2. **Regenerate HTML** if needed:
   ```bash
   # Using swagger-codegen
   npx swagger-codegen generate -i openapi.yaml -l html -o docs/
   ```

3. **Verify changes**:
   - Check spec validity
   - Test interactive features
   - Update README if needed

## 🔗 Related Resources

- [OpenAPI Specification](https://swagger.io/specification/)
- [Swagger UI](https://swagger.io/tools/swagger-ui/)
- [OpenAPI Generator](https://openapi-generator.tech/)
- [Redoc](https://github.com/Redocly/redoc)

## 📄 License

This documentation is part of the Smart Recruitment System project. The OpenAPI specification follows the OpenAPI Initiative standards.

---
*Documentation generated on April 23, 2024*