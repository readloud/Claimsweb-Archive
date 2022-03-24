import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import authenticateUser from './Authenticate'
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
ReactDOM.render(<Router><App /></Router>, document.getElementById('root'));

//registerServiceWorker();
