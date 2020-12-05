import React, { useState, useEffect } from 'react';
import { clientID, clientSecret } from './api';
import './App.scss';

const App: React.FC = () => {
  async function getToken() {
    const response = await fetch('https://api.petfinder.com/v2/oauth2/token', {
      method: 'POST',
      body: `grant_type=client_credentials&client_id=${clientID}&client_secret=${clientSecret}`,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    });

    response.json().then(data => console.log(data));
  }
  
  // useEffect(() => {getToken()}, []);


  return (
      <div className="App">
      </div>
  );
}

export default App;
