# AURA Backend

Node.js backend for AURA - AI Identity Protection System with MongoDB Atlas integration.

## Setup

1. Install dependencies:
   `ash
   npm install
   `

2. Set up MongoDB Atlas:
   - Create a free account at https://www.mongodb.com/atlas
   - Create a new cluster
   - Create a database user
   - Whitelist your IP address (or 0.0.0.0/0 for all)
   - Get your connection string

3. Configure environment variables:
   - Copy .env file and update:
     `
     MONGO_URI=mongodb+srv://your-username:your-password@cluster0.mongodb.net/aura-db?retryWrites=true&w=majority
     JWT_SECRET=your-super-secret-jwt-key-here
     `

4. Start the server:
   `ash
   npm start
   # or for development
   npm run dev
   `

## API Endpoints

### Authentication
- POST /auth/signup - Register new user
- POST /auth/login - Login user

### Protected Routes (require JWT token in Authorization header)
- POST /analyze - Analyze image for deepfakes
- GET /history - Get user's analysis history

## Database Schemas

### User
- email: String (required, unique)
- password: String (hashed with bcrypt)
- createdAt: Date

### History
- userId: ObjectId (reference to User)
- imageUrl: String
- result: String ('AI-generated' or 'Real')
- confidence: Number (0-1)
- reasons: Array of Strings
- createdAt: Date
