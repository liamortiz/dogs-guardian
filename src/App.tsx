import React, { useState, useEffect } from 'react';
import { RecoilRoot } from 'recoil';
import setToken from './api';

import './App.scss';

const App: React.FC = () => {
  
  //useEffect(() => {setToken()}, []);

  return (
      <RecoilRoot>
      <div className="App">
      </div>
      </RecoilRoot>
  );
}

export default App;
