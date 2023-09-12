import React from 'react';
import clear_icon from '../Assets/clear.png';
import cloud_icon from '../Assets/cloud.png';
import drizzle_icon from '../Assets/drizzle.png';
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';
import thunderstorm_icon from '../Assets/thunderstorm.png';
import unclear_icon from '../Assets/unclear.png';


function WeatherMain(props){
    const getWeatherIcon = (weatherType) => {
        switch (weatherType) {
          case 'Clear':
            return clear_icon;
          case 'Rain':
            return rain_icon;
          case 'Snow':
            return snow_icon;
          case 'Clouds':
            return cloud_icon;
          case 'Drizzle':
            return drizzle_icon;
          case 'Thunderstorm':
            return thunderstorm_icon;
          
          default:
            return unclear_icon
        }
      }

  return (
    <div className="main-container">
          <div className="weather-image">
          <img src={getWeatherIcon(props.main)} alt={props.main} />
          </div>
          <div className="weather-temp">{props.temp}{props.units === 'metric' ? '°C' : '°F'}</div>
          <div className="weather-location">{props.search}</div>
          <div className="description">{props.main}</div>
    </div>
  )
}
export default WeatherMain;