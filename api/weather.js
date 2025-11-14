// api/weather.js - Vercel Serverless Function
// This proxies requests to weatherapi.com to keep API key secure

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const { q, days = 7, aqi = 'yes', alerts = 'yes' } = req.query;
    
    // Get API key from environment variable
    const key = process.env.WEATHER_API_KEY;
    
    if (!key) {
      res.status(500).json({ 
        error: 'Server configuration error: WEATHER_API_KEY not set' 
      });
      return;
    }
    
    if (!q) {
      res.status(400).json({ 
        error: 'Missing required parameter: q (city name or coordinates)' 
      });
      return;
    }

    // Build API URL
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${encodeURIComponent(key)}&q=${encodeURIComponent(q)}&days=${encodeURIComponent(days)}&aqi=${encodeURIComponent(aqi)}&alerts=${encodeURIComponent(alerts)}`;
    
    // Fetch from Weather API
    const response = await fetch(url);
    const data = await response.text();
    
    // Return response with same status code
    res.status(response.status)
       .setHeader('Content-Type', 'application/json')
       .send(data);
       
  } catch (err) {
    console.error('Weather API Error:', err);
    res.status(500).json({ 
      error: 'Failed to fetch weather data',
      message: err.message 
    });
  }
};