import React from 'react'
import Weather from './components/Weather'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WeatherForecast from './components/WeatherForecast'
import CityNotFound from './components/CityNotFoundPage'

import sun_icon from "./assets/sun-icon.png"
import night_icon from "./assets/clear-night-icon.png"
import clouds_icon from "./assets/clouds-icon.png"
import fog_icon from "./assets/fog-icon.png"
import moon_clouds_icon from "./assets/moon-clouds-icon.png"
import rain_day_icon from "./assets/rain-day-icon.png"
import rain_icon from "./assets/rain-icon.png"
import rain_night_icon from "./assets/rain-night-icon.png"
import snowfall_day_icon from "./assets/snowfall-day-icon.png"
import snowfall_night_icon from "./assets/snowfall-night-icon.png"
import sun_clouds_icon from "./assets/sun-clouds-icon.png"
import thunder_icon from "./assets/thunder-icon.png"
import WeatherCard from './components/WeatherCard';


const App = () => {
  const getWeatherIcon = (iconCode) => {
    switch (iconCode) {
      case '01d': 
        return sun_icon;
      case '01n': 
        return night_icon;
      case '02d': 
        return sun_clouds_icon;
      case '02n':
          return moon_clouds_icon
      case '03d': 
      case '03n': 
        return clouds_icon;
      case '04d': 
      case '04n': 
        return clouds_icon;
      case '09d': 
      case '09n': 
        return rain_icon;
      case '10d': 
        return rain_day_icon;
      case '10n': 
        return rain_night_icon;
      case '11d': 
      case '11n': 
        return thunder_icon;
      case '13d': 
        return snowfall_day_icon;
      case '13n': 
        return snowfall_night_icon; 
      case '50d': 
      case '50n': 
        return fog_icon;
      default:
        return sun_icon; // Om inget matchar, använd en standardikon
    }
  };
  return (
    <div className='app'>
      <Router>
        <Routes>
          <Route path="/" element={<Weather getWeatherIcon={getWeatherIcon} />} />
          <Route path="/cityNotFound" element={<CityNotFound/>}/>
          <Route path="/forecast" element={<WeatherForecast getWeatherIcon={getWeatherIcon}/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App

