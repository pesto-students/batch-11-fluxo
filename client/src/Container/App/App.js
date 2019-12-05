import React from 'react';
import style from './App.module.scss';
import LandingPage from '../../Component/LandingPage/LandingPage';

const App = () => {
  return (
    <div className={style.App}>
      <LandingPage />
    </div>
  );
};

export default App;
