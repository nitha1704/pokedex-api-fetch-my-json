import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {GlobalContext} from './context/PokedexContext';

ReactDOM.render(
  <React.StrictMode>
    <GlobalContext>
      <App />
    </GlobalContext>
  </React.StrictMode>,
  document.getElementById("root")
);

