import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import './App.css';

// components
import Weather from './Components/Weather';
import Header from './Components/Header';

// mui imports
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';

// Interfaces
import {CityData} from './Interfaces/cityData';
import {PropData} from './Interfaces/Header';

// city data file
import data from './utils/in.json';

// for api calling
import axios from "axios";



const App: React.FC = ()=>{

  const [city, setCity] = useState<string>('');

  useEffect(() => {

    // filtering out the matches
    const cityObj:CityData[] = data.filter( (item) => {
      if(item.city === city){
        return item;
      }
    });

    // if there exist at least 1 match, using the first one
    if(cityObj){
      let url:string = 'https://api.open-meteo.com/v1/forecast?latitude=' + cityObj[0].lat + '&longitude=' + cityObj[0].lng + '&daily=weather_code,temperature_2m_max,temperature_2m_min&forecast_days=1';
      
      
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
      <Weather/>
    </>
  );
}

export default App;