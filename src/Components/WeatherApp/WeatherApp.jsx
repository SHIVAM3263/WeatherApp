import React, { useEffect, useState } from 'react'
import './WeatherApp.css'
import clear_icon from '../Assets/clear.png'
import cloud_icon from '../Assets/cloud.png'
import drizzle_icon from '../Assets/drizzle.png'
import humidity_icon from '../Assets/humidity.png'
import rain_icon from '../Assets/rain.png'
import snow_icon from '../Assets/snow.png'
import wind_icon from '../Assets/wind.png'
import thunderstorm_icon from '../Assets/thunderstorm.png'
import unclear_icon from '../Assets/unclear.png'
import WeatherData from './WeatherData'



const WeatherApp = () => {
  const[city,setCity]=useState(null);
  const[search,setSearch]=useState(null);
  const [units, setUnits] = useState('metric');

useEffect(()=>{
  const fetchAPI=async () =>{
  try{
  const URL=`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=5ebb0289ae43be3e664b3270df178e86&units=${units}`;
  const response= await fetch(URL);
  if (response.ok) {
    const resjson = await response.json();

    const {
      weather,
      main: { temp, feels_like, humidity },
      wind: { speed },
    } = resjson;

    const { description,main} = weather[0];

    const cityData = {
      description,
      main,
      temp,
      feels_like,
      humidity,
      speed,
    };

    setCity(cityData);
  } else {
    // If the response is not ok, set city to null
    setCity(null);
  }
} catch (error) {
  // Handle any other errors here, e.g., network error
  console.error(error);
  setCity(null);
}

};
  fetchAPI();
},
[search,units]
)
 
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

const toggleTemperatureUnit = () => {
  setUnits(units === 'metric' ? 'imperial' : 'metric');
};
  return (
    <div className="container">
        <div className="top-bar">
            <input type="text" className="cityInput" placeholder="search" onChange={event=>setSearch(event.target.value)} />
            <button className="value-convertor" onClick={toggleTemperatureUnit}>&deg;{units === 'metric' ? 'F': 'C'}</button>
        </div>
        
        {!city ? (<div className="error-container"><p>No data Found</p></div>)
        : (
        <>
        <div className="main-container">
          <div className="weather-image">
          <img src={getWeatherIcon(city.main)} alt={city.description} />
          </div>
          <div className="weather-temp">{city.temp}{units === 'metric' ? '°C' : '°F'}</div>
          <div className="weather-location">{search}</div>
          <div className="description">{city.description}</div>
         </div>
 
         <div className="data-container">
           <WeatherData name= "humidity" icon={humidity_icon} value={`${city.humidity}%`} />
           <WeatherData name="wind Speed" icon={wind_icon} value={`${city.speed}km/hr`} />
         </div>
        </>)
      }
          
        

    </div>
    

  )
}
export default WeatherApp