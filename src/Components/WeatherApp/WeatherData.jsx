import React from 'react';


function WeatherData(props){
  return (
    <div className="element">
    <img src={props.icon} className="icon" alt="" />
    <div className="data">
       <div className="data-percent">{props.value}</div>
       <div className="text">{props.name}</div>
    </div>
  </div>
  )
}
export default WeatherData;