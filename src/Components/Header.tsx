import React from 'react';
// import {useState} from 'react';

// mui imports
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// import { SelectChangeEvent } from "@mui/material";


// importing interfaces
import {CityData} from '../Interfaces/CityData';
import {PropData} from '../Interfaces/Header';

import data from '../utils/in.json';


const Header: React.FC<PropData> = ({city, handleClick})=>{

  let currentSelection: string = '';
  const handleChange = (event: SelectChangeEvent) =>{
    currentSelection = event.target.value as string;
    console.log(currentSelection)
  }

  return (
    <>
        <Container maxWidth="md">
        <Box sx={{ minWidth: 120 }}>

            <Typography variant="h3" component="h5">Weather kaisa hai?</Typography>
            <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">City</InputLabel>
            <Select onChange={handleChange}>
                { data.map( 
                    (item: CityData) => {
                      return <MenuItem value={item.city}>{item.city}</MenuItem>
                    }
                  ) 
                }
            </Select>

            <Button variant="contained" onClick={()=>{handleClick(currentSelection)}}>Check Weather</Button>
            </FormControl>

        </Box>
        </Container>
    </>
  );
}

export default Header;

