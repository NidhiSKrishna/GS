#  AI Identity Protection System 🛡️

A modern full-stack web application for detecting deepfakes and identity misuse threats.

## 🎯 Features

- ✅ **Dark-themed Cybersecurity UI** - Modern, sleek interface
- ✅ **Real-time Deepfake Detection** - AI-powered analysis
- ✅ **Risk Scoring System** - Low/Medium/High risk levels with color coding
- ✅ **Dashboard** - Overview of identity status and recent scans
- ✅ **Responsive Design** - Works on desktop and mobile
- ✅ **Smooth Animations** - Modern transitions and loading states
- ✅ **CORS-enabled API** - Easy backend integration

## 🏗️ Project Structure

```
aura-project/
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx      # Dashboard page with 3 info cards
│   │   │   └── Detect.jsx         # Deepfake detection scanner
│   │   ├── App.jsx                # Main app with routing
│   │   ├── App.css                # Component styles
│   │   ├── index.css              # Tailwind + global styles
│   │   └── main.jsx               # Entry point
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
├── backend/
│   ├── server.js                  # Express server & /scan endpoint
│   ├── package.json
│   └── .gitignore (optional)
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Backend Setup & Run

```bash
# Navigate to backend directory
cd aura-project/backend

# Install dependencies (if not already done)
npm install

# Start the server
npm start
# or for development with auto-restart
npm run dev
```

**Backend runs on:** `http://localhost:5000`

### Frontend Setup & Run

```bash
# Navigate to frontend directory
cd aura-project/frontend

# Install dependencies (if not already done)
npm install

# Start development server
npm run dev
```

**Frontend runs on:** `http://localhost:5173` (Vite default)

### Test the Application

1. Open your browser and go to `http://localhost:5173`
2. You should see the AURA Dashboard with the navigation bar
3. Click the "Dashboard" link to view the status cards
4. Click the "Detect" link to test the deepfake scanner
5. Click the "Scan Image" button to test the backend API
6. You should see mock scan results with:
   - Match % (e.g., 82%)
   - Deepfake Detection (Likely/Not Likely)
   - Risk Level (Low/Medium/High)

## 📋 Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express 4** - Web framework
- **CORS** - Cross-origin resource sharing
- **Body-parser** - Middleware for parsing request bodies

## 🎨 UI Features

### Dark Cybersecurity Theme
- Slate/gray color scheme with neon accents
- Blue and purple gradients
- Glowing effects on hover
- Professional and modern aesthetics

### Risk Level Colors
- 🟢 **Green (Low)** - Safe, no threat detected
- 🟡 **Yellow (Medium)** - Possible threat, use caution
- 🔴 **Red (High)** - High threat, do not trust

### Animations
- Fade-in on page load
- Card hover effects with transform
- Pulsing glow on logo
- Loading spinner during scans
- Smooth transitions on all interactive elements

## 🔌 API Endpoints

### GET `/`
**Health Check**
```bash
curl http://localhost:5000/
```

**Response:**
```json
{
  "message": "AURA Backend is running",
  "status": "ok",
  "version": "1.0.0"
}
```

### POST `/scan`
**Deepfake Detection Endpoint**

```bash
curl -X POST http://localhost:5000/scan \
  -H "Content-Type: application/json" \
  -d '{"image": "image-data"}'
```

**Response:**
```json
{
  "match": "82%",
  "deepfake": "Likely",
  "risk": "High",
  "timestamp": "2026-04-18T10:30:00.000Z",
  "confidence": "0.95"
}
```

**Response Fields:**
- `match` - Confidence percentage of the match
- `deepfake` - Detection result: "Likely" or "Not Likely"
- `risk` - Risk level: "Low", "Medium", or "High"
- `timestamp` - When the scan was performed
- `confidence` - Confidence score (0.0-1.0)

## 📱 Pages & Routes

### Dashboard (`/`)
Displays:
- Identity Status card (Safe/At Risk)
- Recent Scan Result
- Overall Risk Score
- Info about AURA system

### Detect (`/detect`)
Features:
- "Scan Image" button
- Real-time API integration
- Loading state with spinner
- Results card with:
  - Match confidence with progress bar
  - Deepfake detection status
  - Risk level badge
  - Recommendation text
- Error handling with user-friendly messages

## 🔧 Customization

### Change Backend Port
Edit `backend/server.js`:
```javascript
const PORT = 5000; // Change this number
```

Update frontend API URL in `frontend/src/pages/Detect.jsx`:
```javascript
const response = await axios.post('http://localhost:NEW_PORT/scan', {...});
```

### Modify Colors/Theme
Edit `frontend/tailwind.config.js` to customize the color scheme.

### Update Mock Results
In `backend/server.js`, modify the `POST /scan` endpoint to change how results are generated.

## 📦 Building for Production

### Frontend Build
```bash
cd aura-project/frontend
npm run build
# Output in: frontend/dist/
```

### Backend Deployment
Simply run with Node.js on your server:
```bash
node server.js
```

## 🐛 Troubleshooting

### Frontend can't connect to backend
- Ensure backend is running on port 5000
- Check CORS is enabled (it is by default)
- Look at browser console for error messages
- Verify the API URL in `Detect.jsx`

### Port already in use
```bash
# Find what's using the port (Linux/Mac)
lsof -i :5000

# Find what's using the port (Windows)
netstat -ano | findstr :5000

# Kill the process or change the port
```

### Module not found errors
- Run `npm install` in the affected directory
- Delete `node_modules` and `package-lock.json`, then reinstall
- Ensure you're using Node.js v14+

## 🚀 Next Steps / Enhancements

Future features to add:
- Real image upload and processing
- Integration with actual AI models (TensorFlow, PyTorch)
- User authentication & profiles
- Scan history & analytics
- Database storage for results
- WebSocket for real-time notifications
- Mobile app (React Native)
- Advanced threat analysis

## 📄 License

This is a hackathon project. Feel free to use and modify as needed.

## 👨‍💻 Support

For issues or questions, check:
1. Backend logs (terminal where `npm start` is running)
2. Browser console (F12 in your browser)
3. Network tab in DevTools to inspect API calls

---

**Happy Scanning! 🎯**

*AURA - Protecting Your Digital Identity*
