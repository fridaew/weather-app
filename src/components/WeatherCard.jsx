import React from 'react';
import './weatherCard.css'
import { IoArrowForwardCircleOutline, IoLocationOutline } from "react-icons/io5";
import HourlyForecast from './HourlyForecast';
import { FaWind } from "react-icons/fa";
import { GiSunset, GiWaterDrop, GiSunrise } from "react-icons/gi";

const WeatherCard = ({ weather, hourlyForecast, getWeatherIcon, fetchFiveDayForecast, isNight }) => {

  return (
    <div className="weather-card">
      <div className='location-pin'>
        <IoLocationOutline size={20} />
        <h2>{weather.location}</h2>
      </div>
      <div className='location-info'>
        <p>Tid: {weather.localTime}</p>
        <p> / {weather.localDate}</p>
      </div>

      <div className='weather-info'>
        <img src={getWeatherIcon(weather.icon)} alt={weather.description} className="weather-icon" />
        <p className='description'>{weather.description}</p>
        <p className='temperature'>{weather.temperature} °C</p>
      </div>

      <div className="five-days-forecast">
        <p>5 -dagars prognos</p>
        <button onClick={fetchFiveDayForecast}><IoArrowForwardCircleOutline size={35} /></button>
      </div>

      <div className="weather-description">
        <div className="info-item">
          <p className="sunset-icon"><GiSunset size={40} /></p>
          <div>
            <p>Solnedgång</p>
            <p>{weather.sunset}</p>
          </div>
        </div>
        <div className="info-item">
          <p className="sunrise-icon"><GiSunrise size={40} /></p>
          <div>
            <p>Soluppgång</p>
            <p>{weather.sunrise}</p>
          </div>
        </div>
      </div>

      <hr className='divider' />

      <div className='weather-description'>
        <div className='info-item'>
          <p className='wind-icon'><FaWind size={20} /></p>
          <div >
            <p>Vindhastighet</p>
            <p>{weather.windSpeed} m/s</p>
          </div>
        </div>

        <div className='info-item'>
          <p className='water-icon'><GiWaterDrop size={20} /></p>
          <div >
            <p>Luftfuktighet</p>
            <p> {weather.humidity}%</p>
          </div>

        </div>

      </div>
      <HourlyForecast isNight={isNight} hourlyForecast={hourlyForecast} getWeatherIcon={getWeatherIcon} />
    </div>
  );
};

export default WeatherCard;


