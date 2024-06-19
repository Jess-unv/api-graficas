import React from 'react';
import './App.css';  
import ParidadPesoDolar from './components/ParidadPesoDolar';
import IndicadoresBMV from './components/IndicadoresBMV';
import ComparativaBMVSP500 from './components/ComparativaBMVSP500';

const App = () => {
  return (
    <div className="container">
      <h1>EconoGraficos</h1>
      <div className="component">
        <ParidadPesoDolar />
      </div>
      <div className="component">
        <IndicadoresBMV />
      </div>
      <div className="component">
        <ComparativaBMVSP500 />
      </div>
    </div>
  );
};

export default App;
