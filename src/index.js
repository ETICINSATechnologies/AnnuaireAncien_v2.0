import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

import Home from "./WebPages/Home/Home";
import Connection from "./WebPages/Connection/Connection";
import Help from "./WebPages/Help/Help";
import Recuperation from "./WebPages/Recuperation/Recuperation";
import Profile from "./WebPages/Profile/Profile";
import Search from "./WebPages/Search/Search";
import Administration from "./WebPages/Administration/Administration";

import fetch from "./__mocks__/fetch";

// mock or not the api call by redefining the fetch function
if (process.env.REACT_APP_FETCH_MOCK === "true") {
    global.fetch = fetch;
}

ReactDOM.render(
    <Router>
        <React.Fragment>
            <Route exact path='/' component={Home}/>
            <Route exact path='/connection' component={Connection}/>
            <Route exact path='/recup' component={Recuperation}/>
            <Route exact path='/help' component={Help}/>
            <Route exact path='/profile' component={Profile}/>
            <Route exact path='/search' component={Search}/>
            <Route exact path='/administration' component={Administration}/>
        </React.Fragment>
    </Router>
    , document.getElementById('root')
);

registerServiceWorker();
