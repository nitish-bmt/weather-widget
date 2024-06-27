// React imports
import React from 'react';
import { useState } from 'react';

import './App.css';

// Importing Components
import Weather from './Components/Weather';
import Header from './Components/Header';

// Default React functional component
const App: React.FC = ()=>{

  // city state
  const [city, setCity] = useState<string|null>(null);
  return (
    <>
      <Header city={city} setCity={setCity}/>
      <Weather city={city}/>
    </>
  );
}

export default App;