// React imports
import React from 'react';

// import { SelectChangeEvent } from "@mui/material";
import {SelectChangeEvent} from '@mui/material/Select';
import {Button, FormControl, InputLabel, Select, MenuItem, Container, Box, Typography} from './Common/CommonMUIComponents'

// importing interfaces
import {CityData} from '../Interfaces/CityData';
import {PropData} from '../Interfaces/Header';

// importing json file
import data from '../utils/in.json';

// Default React functional component
const Header: React.FC<PropData> = ({city, handleClick})=>{

  let currentSelection: string = '';

  // function to handle change in dropdown
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

