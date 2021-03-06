import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import './index.css';
import App from './App';
import {store} from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

const originalLog = console.log;

console.zlog = function(...s) {
  // originalLog(s);
  if (!/^%c/.test(s)) { // annoying
    originalLog(...s);
  }
}
