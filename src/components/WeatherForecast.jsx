import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { GoArrowLeft } from "react-icons/go";
import {  IoLocationOutline  } from "react-icons/io5";
import './WeatherForecast.css'

const WeatherForecast = ({getWeatherIcon}) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { forecastData, weather, isNight } = location.state;
    
  return (
    <div className={`forecast ${isNight ? 'night' : 'day'}`}>
    <div className="weather-forecast">
      <div className='top-section'>
      <button onClick={() => navigate(-1)}><GoArrowLeft size={30}/></button>
     
      <p>{weather.location} <IoLocationOutline size={25}/></p>
      </div>

      <div className="forecast-cards">
        {forecastData.length > 0 ? (
          forecastData.map((forecastItem, index) => (
            <div key={index} className={`forecast-item ${isNight ? 'night' : 'day'}`}>
              <div className='section-1'>
              <p className='temperature'>{forecastItem.temperature} °C</p>
              <p>{forecastItem.time}</p>
               <img src={getWeatherIcon(forecastItem.icon)} alt={forecastItem.description} className="weather-icon" />
              </div>
              <div className='section-2'>
              <p>{index === 0 ? "Idag" : forecastItem.date}</p>
              <p>{forecastItem.description}</p>
              </div>             
            </div>
          ))
        ) : (
          <p>Ingen prognosdata tillgänglig.</p>
        )}
      </div>
    </div>
    </div>

  );
};

export default WeatherForecast





