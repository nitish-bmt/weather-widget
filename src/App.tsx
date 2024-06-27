// React imports
import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import './App.css';

// Importing Components
import Weather from './Components/Weather';
import Header from './Components/Header';

// mui imports
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';

// Importing Interfaces
import {CityData} from './Interfaces/CityData';
import {WeatherData} from './Interfaces/WeatherData';
import {PropData} from './Interfaces/Header';

// city data file
import data from './utils/in.json';

// for api calling
import axios from "axios";


// Default React functional component
const App: React.FC = ()=>{

  const [city, setCity] = useState<string>('');
  const [weatherCode, setWeatherCode] = useState<number|null>(null);
  const [min, setMin] = useState<number|null>(null);
  const [max, setMax] = useState<number|null>(null);
  useEffect(() => {

    // filtering out the matches
    // const cityObj:CityData[] = data.filter( (item) => {
    //   if(item.city === city){
    //     return item;
    //   }
    // });
    const selectedCity:CityData|null = data.find( c => c.city === city ) || null;

    // if there exist at least 1 match, using the first one
    if(selectedCity){
      
      console.log(selectedCity.lng);
      console.log(selectedCity.lat);

      let url:string = 'https://api.open-meteo.com/v1/forecast?latitude=' + selectedCity.lat + '&longitude=' + selectedCity.lng + '&daily=weather_code,temperature_2m_max,temperature_2m_min&forecast_days=1';
      
      axios.get(url)
        .then((response)=>{
            setWeatherCode(response.data.daily.weather_code);
            setMin(response.data.daily.temperature_2m_min);
            setMax(response.data.daily.temperature_2m_max);

            console.log(response.data.daily.weather_code);
            console.log(response.data.daily.temperature_2m_min);
            console.log(response.data.daily.temperature_2m_max);
        })
        .catch((error)=>{
          console.log(error);
        });
      
    }

    console.log(city); 
  }, [city]);

  const handleClick = (c: string):void => {
    console.log("inside handleclick");

    // showing current op
    console.log(c);

    // showing previous op
    setCity(c);
    console.log(city)

  }

  return (
    <>
      <Header city={city} handleClick={handleClick} />
      <Weather code={weatherCode} min={min} max={max}/>
    </>
  );
}

export default App;