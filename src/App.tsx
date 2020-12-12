import React, { useEffect } from 'react';
import { RecoilRoot } from 'recoil';
import { auth } from './api';

import AnimalContainer from './components/AnimalContainer/AnimalContainer';

import './App.scss';

auth();

const App: React.FC = () => {
  useEffect(() => {
    const authInterval = setInterval(auth, 3500 * 1000);
    return () => clearInterval(authInterval);
  }, [])

  return (
      <div className="App">
        <RecoilRoot>
          <AnimalContainer/>
        </RecoilRoot>
      </div>
  );
}

export default App;
