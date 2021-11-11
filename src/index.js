import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import WebFont from 'webfontloader';
import { polyfill } from "seamless-scroll-polyfill";

polyfill();
WebFont.load({
  google: {
    families: [
      'Quicksand', 'sans-serif',
      'Nunito Sans', 'sans-serif',
      'Source Sans Pro:400,700', 'sans-serif',
      'Fira Sans:300', 'sans-serif'

    ]
  }
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
