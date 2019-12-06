import React from 'react';
import ReactDOM from 'react-dom';
import './IndexStyle/index.module.scss';
import App from './Container/App/App';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
  typography: {
    fontFamily: ['Montserrat', 'sans-serif'].join(','),
  },
});
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
