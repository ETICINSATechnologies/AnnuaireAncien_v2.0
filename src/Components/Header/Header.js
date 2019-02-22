import React, {Component} from 'react';
import './Header.css';

import home_logo from '../../Images/home_logo.png'
import {Link} from "react-router-dom";

class Header extends Component {
    render() {
        return (
            <header className='Header'>
                <Link className="header_a" to="/">
                    <img className="home_logo" src={home_logo} alt=""/>
                    <h1 className="title"> Annuaire des Anciens </h1>
                </Link>
            </header>

        );
    }
}

export default Header;
