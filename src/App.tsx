import React, { useState, useEffect } from 'react';
import { RecoilRoot } from 'recoil';
import { auth } from './api';

import DogContainer from './components/DogContainer/DogCardContainer';

import './App.scss';

const App: React.FC = () => {
  
  //useEffect(() => {auth()}, []);

  return (
      <RecoilRoot>
      <div className="App">
        <DogContainer/>
      </div>
      </RecoilRoot>
  );
}

export default App;
