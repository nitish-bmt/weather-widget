import React from 'react';
import { WeatherData } from '../Interfaces/WeatherData';

const Weather: React.FC<WeatherData> = ({code, min, max})=>{
    return(
        <>
            <h3>Weather bohot kharab hai!</h3>
            <h4>{code}</h4>
            <h4>{min}</h4>
            <h4>{max}</h4>
        </>
    );
}

export default Weather;