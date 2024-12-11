import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './LocalWeather.css'

const LocalWeather = ({ getWeatherIcon }) => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const weatherData = await fetchWeatherByCoords(latitude, longitude);
          setWeather(weatherData);
        },
        (error) => {
          setError("Kunde inte hämta din plats. Tillåt platsåtkomst i din webbläsare.");
          console.error(error.message);
        }
      );
    } else {
      setError("Geolocation stöds inte av din webbläsare.");
    }
  }, []);

  const fetchWeatherByCoords = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${import.meta.env.VITE_REACT_APP_API_KEY}&lang=se`
      );
      const data = response.data;

      return {
        location: data.name,
        temperature: Math.floor(data.main.temp - 273.15),
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        windSpeed: data.wind.speed,
        humidity: data.main.humidity,
      };
    } catch (error) {
      console.error("Fel vid hämtning av väderdata: ", error);
    }
  };

  const temperatureMessage = (temperature) => {
    if (temperature >= 30) {
      return "Ojojoj, det är stekhett! Håll dig i skuggan, annars smälter du bort! 🥵🍹"
    } else if (temperature >= 20) {
      return "Väldigt behagligt ute, perfekt för en prommis!🌞"
    } else if (temperature >= 10) {
      return "Kyligt, men inte för kallt. Perfekt för en hoodie och kaffe! ☕❄️"
    } else if (temperature >= 0) {
      return "Brrr! Tiden för jackan är här! 🧥☃️"
    } else {
      return "Iskallt! In med dig och ta en varm choklad! ☕❄️"
    }
  }

  return (
    <div className='local-weather'>
      {error && <p>{error}</p>}
      {weather ? (
        <div>
          <h2>{weather.location}</h2>
          <div className='text-row'>
            <img src={getWeatherIcon(weather.icon)} alt={weather.description} size={10} className="weather-icon" />
            <p> - {weather.temperature}°C</p>
          </div>

          <div className='local-weather-section'>
            <p>{weather.description}</p>
            <p>Vindhastighet: {weather.windSpeed} m/s</p>
            <p>Luftfuktighet: {weather.humidity}%</p>
          </div>

          <div className="temperature-message">
            <p>{temperatureMessage(weather.temperature)}</p>
          </div>

        </div>
      ) : (
        !error && <p>Laddar väderdata...</p>
      )}


    </div>
  );
};

export default LocalWeather;
