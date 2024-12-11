import React, { useState } from 'react';
import axios from 'axios';
import WeatherCard from './WeatherCard';
import LocalWeather from './LocalWeather'
import { CiSearch } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import { DateTime } from 'luxon';
import './weather.css';

const Weather = ({getWeatherIcon}) => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState();
  const [hourlyForecast, setHourlyForecast] = useState();
  const [isNight, setIsNight] = useState(false);
  const [showForm, setShowForm] = useState(true)

  const navigate = useNavigate();

  const fetchWeatherData = async () => {
    if (city === "") {
      alert("Du måste ange en stad");
      return;
    }
 
    try {
      console.log(`Fetching weather data for ${city}`);

      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_REACT_APP_API_KEY}&lang=se`
      );

      const weather = weatherResponse.data;

      const { timezone, sys, dt } = weather;

  
      const offsetInHours = timezone / 3600;
      const timeZone = `UTC${offsetInHours >= 0 ? '+' : ''}${offsetInHours}`;

      const getTimeInZone = (timestamp) => DateTime.fromMillis(timestamp * 1000, { zone: timeZone });

      const localDateTime = getTimeInZone(dt);
      const sunriseTime = getTimeInZone(sys.sunrise);
      const sunsetTime = getTimeInZone(sys.sunset);

   
      const sunriseTimeFormatted = sunriseTime.toLocaleString(DateTime.TIME_SIMPLE);
      const sunsetTimeFormatted = sunsetTime.toLocaleString(DateTime.TIME_SIMPLE);

    
      const localDate = localDateTime.toLocaleString(DateTime.DATE_MED);

      const utcTime = Date.now() + (new Date().getTimezoneOffset() * 60000);
      const localTime = new Date(utcTime + timezone * 1000).toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' });

      setIsNight(localDateTime > sunsetTime);

      setWeather({
        humidity: weather.main.humidity,
        windSpeed: weather.wind.speed,
        temperature: Math.floor(weather.main.temp - 273.15),
        location: weather.name,
        icon: weather.weather[0].icon,
        description: weather.weather[0].description,
        localTime: localTime,
        localDate: localDate,
        sunrise: sunriseTimeFormatted,
        sunset: sunsetTimeFormatted,
      });

      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${import.meta.env.VITE_REACT_APP_API_KEY}&lang=se`
      );

      const cityTimezone = forecastResponse.data.city.timezone * 1000;
     
      const forecastWithinTimeRange = forecastResponse.data.list.filter(item => {
        const itemDate = new Date(item.dt * 1000 + cityTimezone);
        const now = new Date();
        const endOfNextDay = new Date(now);
        endOfNextDay.setDate(now.getDate() + 1);
        endOfNextDay.setHours(16, 0, 0, 0);
        return itemDate >= now && itemDate <= endOfNextDay;
      });
      
      const hourlyForecast = forecastWithinTimeRange.map(forecast => ({
        time: new Date(forecast.dt * 1000 + cityTimezone).toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' }),
        temperature: Math.floor(forecast.main.temp - 273.15),
        icon: forecast.weather[0].icon,
        description: forecast.weather[0].description,
      }));

      setHourlyForecast(hourlyForecast);

    } catch (error) {

      if(error.response && error.response.status === 404) {
        navigate('/cityNotFound');
      } else{
        alert("Ett okänt fel inträffade: " + error.message);
      }
    }
  };

  const fetchFiveDayForecast = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${import.meta.env.VITE_REACT_APP_API_KEY}&lang=se`
      );

      const fiveDayData = response.data.list.filter((item, index) => index % 8 === 0);

      console.log(response.data)

      const formattedData = fiveDayData.map(forecast => ({
        date: new Date(forecast.dt * 1000).toLocaleDateString('sv-SE', { weekday: 'short', day: 'numeric', month: 'short' }),
        temperature: Math.floor(forecast.main.temp - 273.15),
        icon: forecast.weather[0].icon,
        description: forecast.weather[0].description,
      }));

      navigate('/forecast', { state: { forecastData: formattedData, weather, isNight } });

    } catch (error) {
      alert("Ett fel inträffade vid hämtning av 5-dagars prognos.");
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData();
    setShowForm(false);
  };

  const handleSearchButton = () => {
    setShowForm(true)
  }

  return (
    <div className={`weather ${isNight ? 'night' : 'day'}`}>
      {showForm ? (
        <form className="search-bar" onSubmit={handleSubmit}>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Ange stad..."
            className="input-field"
          />
          <button type="submit" className="submit-button"><CiSearch size={30} color='white' /></button>
        </form>
      ) : (
        <div className='search-container'>
          <button type="submit" className="search-button" onClick={handleSearchButton}><CiSearch size={30} color='white' /></button>
        </div>
      )}
      
      {!weather && <LocalWeather getWeatherIcon={getWeatherIcon}/>}
        {weather && (
        <div>
          <WeatherCard getWeatherIcon={getWeatherIcon} weather={weather} hourlyForecast={hourlyForecast} fetchFiveDayForecast={fetchFiveDayForecast} isNight={isNight}/>
        </div>
      )}
    </div>
  );
};

export default Weather;










