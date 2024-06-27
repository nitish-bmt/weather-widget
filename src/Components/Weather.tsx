// React imports
import React from 'react';
import { useMemo } from 'react';

// importing interfaces
import { WeatherData } from '../Interfaces/WeatherData';

// Importing MUI Components
import {styled, Grid, Box, Typography, Container} from "./Common/CommonMUIComponents";

// Default React functional component
const Weather: React.FC<WeatherData> = (props: WeatherData)=>{

    const avgTemp:number|null = useMemo( ()=>{
        if(props.min && props.max){
            return (props.min+props.max)/2;
        }
        return null;
    }, [props.min, props.max]);

    return(
        <>
            <Container maxWidth="sm">
                <Typography variant="h4" component="h5">
                    Weather bohot kharab hai!
                    <Typography variant="h6" component="h5">
                        <p>
                            Weather code: {props.code}          <br/>
                            Minimum temprature: {props.min}     <br/>
                            Minimum temprature: {props.max}     <br/>
                            Average temprature: {avgTemp}       <br/>
                        </p>
                    </Typography>
                </Typography>
            </Container>


        </>
    );
}

export default Weather;