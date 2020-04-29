import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router} from "react-router-dom";

import "./Static/CSS/global.scss";

import App from "./Components/Pages/App";

ReactDOM.render(<Router><App /></Router>, document.getElementById('root'));
