import React, { useEffect } from 'react';
import { RecoilRoot } from 'recoil';
import { auth } from './api';

import AnimalContainer from './components/AnimalContainer/AnimalContainer';

import './App.scss';

const App: React.FC = () => {

  auth();
  useEffect(() => {
    const authInterval = setInterval(auth, 3500 * 1000);
    return () => clearInterval(authInterval);
  }, [])

  return (
      <RecoilRoot>
      <div className="App">
        <AnimalContainer/>
      </div>
      </RecoilRoot>
  );
}

export default App;
