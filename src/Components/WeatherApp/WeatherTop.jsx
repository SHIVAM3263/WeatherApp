import React from 'react'

export const WeatherTop = (props) => {
   
    
  return (
    <div className="top-bar">
            <input type="text" className="cityInput" placeholder="search" onChange={event=>{props.setsearch(event)}} />
            <button className="value-convertor" onClick={props.toggleTemperatureUnit}>&deg;{props.unit === 'metric' ? 'F': 'C'}</button>
    </div>
  )
}
