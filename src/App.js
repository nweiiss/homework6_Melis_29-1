import React from 'react';
import { useState } from 'react';

export default function WeatherApp() {
  const [cityName, setCityName] = useState('');
  const [city, setCity] = useState('');
  const [temperature, setTemperature] = useState('');

  const API_KEY = 'd602f96d3ebb895f7e56b87d284069c3';
  const DEFAULT_API = 'http://api.openweathermap.org/data/2.5/weather';

  const handleInputChange = async (event) => {
    const inputCityName = event.target.value;
    setCityName(inputCityName);
  }

    const findButton = async() => {
      try {
        const response = await fetch(`${DEFAULT_API}?q=${cityName}&appid=${API_KEY}&units=metric`);
        const data = await response.json();
        setCity(data?.name || 'Город не найден...');
        const temp = data?.main?.temp;
        setTemperature(temp + '°C');

      } catch (error) {
        console.error(error, 'ERROR!');
      }
    }

  return (
    <>
      <div className='container'>
        <input
          value={cityName}
          onChange={handleInputChange}
          placeholder="Введите название города"
        />
        <button onClick={findButton}>Найти</button>
        <div className="city">{city}</div>
        <div className="temp">{temperature}</div>
      </div>
    </> 
  );
}

