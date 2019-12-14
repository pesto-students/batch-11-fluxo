import React from 'react';
import ReactDOM from 'react-dom';
import './index.module.scss';
import App from './Container/App/App';
import { ThemeProvider, theme } from './MaterialUI/Import/Import';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './store/reducer';
import { BrowserRouter } from 'react-router-dom';

const store = createStore(reducer);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
