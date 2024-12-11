import React from 'react';
import './HourlyForecast.css';

const HourlyForecast = ({ hourlyForecast, getWeatherIcon, isNight }) => {

  console.log(isNight)
  return (
    <div className={`hourly-forecast ${isNight ? 'night' : 'day'}`}>
      <div className="hourly-forecast-container">
        {hourlyForecast ? (
          <ul className="hourly-forecast-list">
            {hourlyForecast.map((forecast, index) => (
              <li key={index} className="hourly-forecast-item">
                <p>{forecast.time}</p>
                 <img src={getWeatherIcon(forecast.icon)} alt={forecast.description} className="weather-icon" />
                <p className='temperature'>{forecast.temperature} °C</p>           
              </li>
            ))}
          </ul>
        ) : (
          <p>Ingen timprognos tillgänglig.</p>
        )}
      </div>
    </div>
  );
};

export default HourlyForecast;

