import './Header.css';
import React, {Component} from 'react';
import {Link} from "react-router-dom";

let home_logo = require('../../Images/home_logo.png');

const Header = () => {
    return (
        <header className='Header'>
            <Link className="header_a" to="/">
                <img className="home_logo" src={home_logo} alt=""/>
                <h1 className="title"> Annuaire des Anciens </h1>
            </Link>
        </header>

    );
};

export default Header;
