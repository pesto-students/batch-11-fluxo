import React from 'react';
import ReactDOM from 'react-dom';
import './IndexStyle/index.module.scss';
import App from './Container/App/App';
import { ThemeProvider, theme } from './MaterialUI/Import/Import';
import { BrowserRouter } from 'react-router-dom';


const app = (
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </BrowserRouter>
);

ReactDOM.render(app, document.getElementById('root'));
