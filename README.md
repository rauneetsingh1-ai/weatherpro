🌍 WeatherPro Global
A beautiful, production-ready weather application with global city coverage. Features a modern dark blue UI with glassmorphic design.

✨ Features
🌎 Global Coverage - Weather for any city in any country
🎨 Dark Blue UI - Modern, professional design with glassmorphism
📊 7-Day Forecast - Detailed weather predictions
🌡️ Detailed Metrics - Temperature, humidity, wind, visibility, pressure
🌅 Sunrise/Sunset - Daily sun times
💨 Air Quality Index - Real-time AQI monitoring
📱 Responsive - Works on all devices
🎯 16+ Quick Cities - Instant access to popular global cities
📍 Geolocation - Use your current location
🌓 Theme Toggle - Switch between dark and light modes
🚀 Quick Start
Local Development
Clone or download all files to a folder
Open index.html in your browser
That's it! No build process required.
Deploy to Vercel
Method 1: Using Vercel CLI
bash
# Install Vercel CLI
npm install -g vercel

# Navigate to your project folder
cd weatherpro

# Deploy
vercel
Method 2: Using Vercel Dashboard
Go to vercel.com
Click "New Project"
Import your GitHub repository (or drag & drop your folder)
Important: Add environment variable:
Name: WEATHER_API_KEY
Value: 9739b38346e2465baa2163628251311
Click "Deploy"
📁 File Structure
weatherpro/
├── index.html          # Main HTML file
├── styles.css          # Styling (dark blue theme)
├── script.js           # Frontend JavaScript
├── vercel.json         # Vercel configuration
├── api/
│   └── weather.js      # Serverless function (optional)
└── README.md           # This file
🔧 Configuration
For Production Deployment
To keep your API key secure in production, update script.js:

Replace the fetch URL (around line 50):

javascript
// Change from CORS proxy to your serverless function:
const url = `/api/weather?q=${encodeURIComponent(q)}&days=${DAYS}&aqi=yes&alerts=yes`;
Then set the environment variable WEATHER_API_KEY in Vercel dashboard.

🌐 Supported Cities
Search for any city in any country! The app includes quick access to:

🇮🇳 Delhi, Mumbai (India)
🇬🇧 London (UK)
🇺🇸 New York (USA)
🇯🇵 Tokyo (Japan)
🇫🇷 Paris (France)
🇦🇪 Dubai (UAE)
🇸🇬 Singapore
🇦🇺 Sydney (Australia)
🇨🇦 Toronto (Canada)
🇩🇪 Berlin (Germany)
🇷🇺 Moscow (Russia)
🇨🇳 Beijing (China)
🇰🇷 Seoul (South Korea)
🇹🇭 Bangkok (Thailand)
🇹🇷 Istanbul (Turkey)
...and thousands more!

🎨 Theme
The app features a dark blue color scheme:

Deep navy backgrounds (
#020617 to 
#0c1e3f)
Blue accents and borders
Glassmorphic cards with blur effects
Smooth animations and transitions
Light mode available via toggle
📱 Responsive Design
Desktop: Full-width layout with detailed metrics
Tablet: Adaptive grid layout
Mobile: Optimized single-column view
🔒 Security
API key stored in environment variables (production)
CORS proxy used for preview/development
Serverless function for secure API calls
🌟 Credits
Weather data: WeatherAPI.com
Icons: Lottie animations from LottieFiles
Built with vanilla HTML, CSS, and JavaScript
📄 License
Free to use and modify for personal and commercial projects.

Built with ❤️ • Production Ready • Global Weather Coverage

