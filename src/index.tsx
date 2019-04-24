import React from 'react';
import ReactDOM from 'react-dom';
import {Redirect, Switch} from "react-router";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import {fetch} from './__mocks__/function/fetch';

import './index.css';

import Home from "./WebPages/Home/Home";
import Connection from "./WebPages/Connection/Connection";
import Recovery from "./WebPages/Recovery/Recovery";
import Help from "./WebPages/Help/Help";
import Profile from "./WebPages/Profile/Profile";
import ProfilePicture from "./Components/ProfilePicture/ProfilePicture";
import Search from "./WebPages/Search/Search";
import Admin from "./WebPages/Admin/Admin";


// mock or not the api call by redefining the fetch function
if (process.env.REACT_APP_FETCH_MOCK === "true") {
    (global as any).fetch = fetch;
}

ReactDOM.render(
    <Router>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/connection' component={Connection}/>
            <Route exact path='/recovery' component={Recovery}/>
            <Route exact path='/help' component={Help}/>
            <Route exact path='/search' component={Search}/>
            <Route exact path='/profile' component={Profile}/>
            <Route exact path='/admin' component={Admin}/>
            <Route exact path='/image' component={ProfilePicture}/>
            <Redirect to='/'/>
        </Switch>
    </Router>
    , document.getElementById('root'));

serviceWorker.register();
