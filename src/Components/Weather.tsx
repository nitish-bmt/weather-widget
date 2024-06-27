// React imports
import React from 'react';
import { useMemo } from 'react';

// importing interfaces
import { WeatherData } from '../Interfaces/WeatherData';

// MUI component imports
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

// MUI typography imports
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

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
                            Weather code: {props.code}        <br/>
                            Minimum temprature: {props.min}   <br/>
                            Minimum temprature: {props.max}   <br/>
                            Average temprature: {avgTemp}   <br/>
                        </p>
                    </Typography>
                </Typography>
            </Container>


        </>
    );
}

export default Weather;