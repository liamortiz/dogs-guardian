import React from 'react';
import { RecoilRoot } from 'recoil';
import AnimalContainer from './components/AnimalContainer/AnimalContainer';

import './App.scss';

const App: React.FC = () => {
  return (
      <div className="App">
        <RecoilRoot>
          <AnimalContainer/>
        </RecoilRoot>
      </div>
  );
}

export default App;
