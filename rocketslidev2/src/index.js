import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./styles.css";

import {
    BrowserRouter as Router,
    Route,
    Link
  } from 'react-router-dom'
//import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Router><App/></Router>, document.getElementById('root'));
//registerServiceWorker();
