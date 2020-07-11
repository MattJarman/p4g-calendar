import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import App from './components/app';
import ScrollToTop from './components/scroll-to-top';
import './tailwind.css';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <HashRouter basename="/">
    <ScrollToTop />
    <App />
  </HashRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
