import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { StateProvider } from './Components/StateProvider';
import reducer, { initialState } from './Reducer/Reducer';

ReactDOM.render(
  <StateProvider initialState={initialState} reducer={reducer}>
    <App />
  </StateProvider>,
  document.getElementById('root')
);
