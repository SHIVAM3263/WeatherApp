import React, { useEffect, useState } from 'react'
import './WeatherApp.css'
import humidity_icon from '../Assets/humidity.png'
import wind_icon from '../Assets/wind.png'
import WeatherData from './WeatherData'
import  WeatherMain  from './WeatherMain'
import { WeatherTop } from './WeatherTop'


const App = () => {
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
 
const handleChange=(event)=>{
setSearch(event.target.value);
};

const toggleTemperatureUnit = () => {
  setUnits(units === 'metric' ? 'imperial' : 'metric');
};

  return (
    <div className="container">
        <WeatherTop setsearch={handleChange} toggleTemperatureUnit={toggleTemperatureUnit} unit={units}/>
        
        {!city ? (<div className="error-container"><p>Error retreiving data</p></div>)
        : (
        <>
        <WeatherMain main={city.main} search={search} temp={city.temp} unit={units} />
         <div className="data-container">
           <WeatherData name= "humidity" icon={humidity_icon} value={`${city.humidity}%`} />
           <WeatherData name="wind Speed" icon={wind_icon} value={`${city.speed}km/hr`} />
         </div>
        </>)
      }
          
        

    </div>
    

  )
}
export default App