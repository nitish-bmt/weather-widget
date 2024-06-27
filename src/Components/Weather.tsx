// React imports
import React from 'react';

// React Hook imports
import { useState } from 'react';
import { useMemo } from 'react';
import { useEffect } from 'react';


// Importing MUI Components
import {styled, Grid, Box, Typography, Container} from "./Common/CommonMUIComponents";

// importing interfaces
import {CityData} from '../Interfaces/CityData';
import { City } from '../Interfaces/City';
import { PropData } from '../Interfaces/Header';

// importing json file
import data from '../utils/in.json';

// for api calling
import axios from "axios";

// Default React functional component
const Weather: React.FC<{city: string|null}> = ({city}:{city: string|null})=>{

    const [weatherCode, setWeatherCode] = useState<number|null>(null);
    const [min, setMin] = useState<number|null>(null);
    const [max, setMax] = useState<number|null>(null);

    const avgTemp:number|null = useMemo( ()=>{
        if(min && max){
            return (min+max)/2;
        }
        return null;
    }, [min, max]);

    useEffect(() => {

        const selectedCity:CityData|null = data.find( item => item.city === city ) || null;

        // if selected city is found
        if(selectedCity){
    
          let url:string = 'https://api.open-meteo.com/v1/forecast?latitude=' + selectedCity.lat + '&longitude=' + selectedCity.lng + '&daily=weather_code,temperature_2m_max,temperature_2m_min&forecast_days=1';
          
          axios.get(url)
            .then((response)=>{
                setWeatherCode(response.data.daily.weather_code);
                setMin(response.data.daily.temperature_2m_min);
                setMax(response.data.daily.temperature_2m_max);
            })
            .catch((error)=>{
              console.log(error);
            });
          
        }
      }, [city]);

    return(
        <>
            <Container maxWidth="sm" sx={{mx:'auto'}}>
                <Typography variant="h4" component="h5">
                    Weather bohot kharab hai!
                    <Typography variant="h6" component="h5">
                        <p>
                            Weather code: {weatherCode}     <br/>
                            Minimum temprature: {min}       <br/>
                            Minimum temprature: {max}       <br/>
                            Average temprature: {avgTemp}   <br/>
                        </p>
                    </Typography>
                </Typography>
            </Container>


        </>
    );
}

export default Weather;