/* script.js - WeatherPro Global (PRODUCTION VERSION FOR VERCEL) */

const DAYS = 7;
const DEFAULT_CITY = "Delhi";

// Elements
const el = id => document.getElementById(id);
const searchBtn = el("searchBtn");
const locBtn = el("locBtn");
const searchInput = el("searchInput");
const loader = el("loader");
const themeBtn = el("themeBtn");

// Theme Toggle
const savedTheme = localStorage.getItem("theme") || "dark";
if (savedTheme === "light") document.body.classList.add("light");

themeBtn.onclick = () => {
  document.body.classList.toggle("light");
  const isLight = document.body.classList.contains("light");
  localStorage.setItem("theme", isLight ? "light" : "dark");
  themeBtn.textContent = isLight ? "🌙" : "☀️";
};

// Helpers
function showLoader() { loader.classList.remove("hidden"); }
function hideLoader() { loader.classList.add("hidden"); }

function chooseIcon(text) {
  const c = text.toLowerCase();
  if (c.includes("rain")) return "https://assets2.lottiefiles.com/packages/lf20_kof97aeq.json";
  if (c.includes("cloud")) return "https://assets2.lottiefiles.com/packages/lf20_k80dvvnw.json";
  if (c.includes("snow")) return "https://assets2.lottiefiles.com/packages/lf20_tfb3estd.json";
  if (c.includes("thunder")) return "https://assets2.lottiefiles.com/packages/lf20_xlmzq4wx.json";
  return "https://assets2.lottiefiles.com/packages/lf20_xlky2qpw.json"; // clear/sunny
}

function getAQIClass(aqi) {
  if (aqi <= 50) return 'aqi-good';
  if (aqi <= 100) return 'aqi-moderate';
  return 'aqi-unhealthy';
}

function getAQILabel(aqi) {
  if (aqi <= 50) return 'Good';
  if (aqi <= 100) return 'Moderate';
  if (aqi <= 150) return 'Unhealthy for Sensitive';
  if (aqi <= 200) return 'Unhealthy';
  if (aqi <= 300) return 'Very Unhealthy';
  return 'Hazardous';
}

// Fetch Weather using Vercel serverless function
async function fetchWeather(q) {
  showLoader();
  
  try {
    // Use the serverless function endpoint
    const url = `/api/weather?q=${encodeURIComponent(q)}&days=${DAYS}&aqi=yes&alerts=yes`;
    
    console.log("Fetching weather for:", q);
    const res = await fetch(url);
    
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Failed to fetch weather data");
    }
    
    const data = await res.json();
    console.log("Weather data loaded successfully:", data);
    renderAll(data);
    
  } catch (err) {
    console.error("Weather fetch error:", err);
    alert("Unable to fetch weather data: " + err.message);
  } finally {
    hideLoader();
  }
}

// Render All Data
function renderAll(data) {
  const cur = data.current;
  const loc = data.location;

  // Location
  el("location").textContent = `${loc.name}, ${loc.country}`;
  
  // Current Weather
  el("temp").textContent = Math.round(cur.temp_c) + "°";
  el("condition").textContent = cur.condition.text;
  el("feels").textContent = Math.round(cur.feelslike_c) + "°C";
  
  // Stats
  el("humidity").textContent = cur.humidity;
  el("wind").textContent = cur.wind_kph;
  el("windDir").textContent = cur.wind_dir;
  el("visibility").textContent = cur.vis_km;
  el("pressure").textContent = cur.pressure_mb;

  // Sun Times
  const astro = data.forecast.forecastday[0].astro;
  el("sunrise").textContent = astro.sunrise;
  el("sunset").textContent = astro.sunset;

  // AQI
  if (cur.air_quality) {
    const aqiValue = cur.air_quality["us-epa-index"];
    const aqiSection = el("aqiSection");
    aqiSection.style.display = "block";
    
    const aqiEl = el("aqi");
    aqiEl.textContent = aqiValue;
    aqiEl.className = "aqi-value " + getAQIClass(aqiValue);
    
    const statusEl = el("aqiStatus");
    statusEl.textContent = getAQILabel(aqiValue);
    statusEl.className = "aqi-status " + getAQIClass(aqiValue);
    
    el("pm25").textContent = cur.air_quality.pm2_5.toFixed(1);
  }

  // Weather Icon
  el("currentIcon").src = chooseIcon(cur.condition.text);

  // 7-Day Forecast
  const forecastContainer = el("forecast");
  forecastContainer.innerHTML = "";
  
  data.forecast.forecastday.forEach((day, idx) => {
    const date = new Date(day.date);
    const dayName = idx === 0 ? "Today" : date.toLocaleDateString('en-US', { weekday: 'short' });
    
    const card = document.createElement("div");
    card.className = "forecast-card";
    card.innerHTML = `
      <div class="forecast-day">${dayName}</div>
      <lottie-player 
        class="forecast-icon" 
        src="${chooseIcon(day.day.condition.text)}" 
        autoplay 
        loop>
      </lottie-player>
      <div class="forecast-temp">${Math.round(day.day.maxtemp_c)}°</div>
      <div class="forecast-temp-low">${Math.round(day.day.mintemp_c)}°</div>
      <div class="forecast-rain">💧 ${day.day.daily_chance_of_rain}%</div>
    `;
    forecastContainer.appendChild(card);
  });
}

// Event Listeners
searchBtn.onclick = () => {
  const city = searchInput.value.trim() || DEFAULT_CITY;
  fetchWeather(city);
};

searchInput.addEventListener("keypress", e => {
  if (e.key === "Enter") searchBtn.click();
});

locBtn.onclick = () => {
  if (navigator.geolocation) {
    showLoader();
    navigator.geolocation.getCurrentPosition(
      pos => fetchWeather(`${pos.coords.latitude},${pos.coords.longitude}`),
      err => {
        hideLoader();
        alert("Location access denied");
      }
    );
  } else {
    alert("Geolocation not supported");
  }
};

// Quick City Buttons
document.querySelectorAll(".quick").forEach(btn => {
  btn.onclick = () => {
    const city = btn.dataset.q;
    searchInput.value = city;
    fetchWeather(city);
  };
});

// Auto Load Default City
fetchWeather(DEFAULT_CITY);