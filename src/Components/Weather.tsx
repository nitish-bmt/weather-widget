// React imports
import React, { useCallback } from 'react';

// React Hook imports
import { useState } from 'react';
import { useMemo } from 'react';
import { useEffect } from 'react';


// Importing MUI Components
import {styled, Grid, Box, Typography, Container} from "./Common/CommonMUIComponents";

// importing interfaces
import {CityData} from '../Interfaces/CityData';
import {WeatherData} from '../Interfaces/WeatherData';
import { City } from '../Interfaces/City';
import { PropData } from '../Interfaces/Header';

// importing json file
import data from '../utils/in.json';

// for api calling
import axios from "axios";

// Default React functional component
const Weather: React.FC<{city: string|null}> = ({city}:{city: string|null})=>{

    const [weather, setWeather] = useState<WeatherData|null>(null);

    const avgTemp:number|null = useMemo( ()=>{
        if(weather){
            return (weather.min+weather.max)/2;
        }
        return null;
    }, [weather]);

    const fetchWeather = useCallback(async ()=>{    

        const selectedCity:CityData|null = data.find( item => item.city === city ) || null;

        // if selected city is found
        if(selectedCity){
    
        let url:string = 'https://api.open-meteo.com/v1/forecast?latitude=' + selectedCity.lat + '&longitude=' + selectedCity.lng + '&daily=weather_code,temperature_2m_max,temperature_2m_min&forecast_days=1';
        
        // axios.get(url)
        //     .then((response)=>{
        //         const w:WeatherData = {
        //             code: response.data.daily.weather_code,
        //             min: response.data.daily.temperature_2m_min,
        //             max: response.data.daily.temperature_2m_max
        //         }
        //         setWeather(w);
        //     })
        //     .catch((error)=>{
        //         console.log(error);
        //     });
        try {
            const response = await axios.get(url);
            // setError(null);
            const t: WeatherData = {
                code: response.data.daily.weather_code,
                min: response.data.daily.temperature_2m_min,
                max: response.data.daily.temperature_2m_max
            }
            setWeather(t);
        } catch (error: any) {
            console.log(error);
        // TODO: Handle specific errors based on API response and give definitive type above
        // setError(error.response.data.reason);
        } finally {
        // setLoading(false);
        }
        
        }
    }, [city, weather]);

    // useEffect(() => {

    //     if(weather){

    //     }


    //     localStorage.setItem("lastCity", city as string);
    // }, [city]);

    // fetching on everychange
    useEffect( ()=>{
        if(city){
            fetchWeather();
        }
    }, [city]);

    // fetching every 10 mins
    useEffect(()=>{
        const interval = setInterval(()=>{
            fetchWeather();
        }, 600000);

        // kinda like destructor
        return ()=>{
            clearInterval(interval);
        };
    },[fetchWeather]);

    return(
        <>
            <Container maxWidth="sm" sx={{mx:'auto'}}>
                <Typography variant="h4" component="h5">
                    Weather bohot kharab hai!

                    {/* conditional jsx to  */}
                    {weather && (
                        <Typography variant="h6" component="h5">
                            Weather code: {weather.code}            <br/>
                            Minimum temprature: {weather.min}°C     <br/>
                            Minimum temprature: {weather.max}°C     <br/>
                            Average temprature: {avgTemp}°C         <br/>
                        </Typography>
                    )}
                </Typography>
            </Container>


        </>
    );
}

export default Weather;