import React, { useState, useEffect } from 'react';
import { RecoilRoot } from 'recoil';
import { auth } from './api';

import AnimalContainer from './components/AnimalContainer/AnimalContainer';
import './App.scss';

const App: React.FC = () => {
  
  useEffect(() => {auth()}, []);

  return (
      <RecoilRoot>
      <div className="App">
        <AnimalContainer/>
      </div>
      </RecoilRoot>
  );
}

export default App;
