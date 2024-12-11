import React from 'react';
import {useNavigate } from 'react-router-dom';
import '../components/CityNotFoundPage.css'
import windyUmbrella from "../assets/windy-umbrella-girl.png"

const CityNotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/")
  }
  
  return (
    <div className="not-found-page">
      <h1>404</h1>
      <h2>Oops! Staden finns inte.</h2>
      <p>Vi kunde inte hitta någon väderinformation för den staden. Försök igen med en annan stad!</p>
      <button onClick={handleGoBack}>Gå tillbaka</button>
      <img src={windyUmbrella} alt="windy-ubrella" />
    </div>
  );
};

export default CityNotFoundPage;
