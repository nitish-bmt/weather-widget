import React from 'react';

// importing useState() hook
import { useState } from 'react';

// Importing Components
import Weather from './Weather';
import Header from './Header';

const Main: React.FC = ()=>{

    // city state
    const [city, setCity] = useState<string|null>(null);
    
    return (
        <>
            <Header city={city} setCity={setCity}/>
            <Weather city={city}/>
        </>
    );
}

export default Main;