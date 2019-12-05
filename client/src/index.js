import React from 'react';
import ReactDOM from 'react-dom';
import './IndexStyle/index.module.scss';
import App from './Container/App/App';
import { ThemeProvider, theme } from './MaterialUI/Import/Import';

const app = (
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);

ReactDOM.render(app, document.getElementById('root'));
