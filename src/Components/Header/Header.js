import React, {Component} from 'react';
import './Header.css';

import home_logo from '../../Images/home_logo.png'

class Header extends Component {
    render() {
        return (
            <header className='Header'>
                <a className="header_a" href="/">
                    <img className="home_logo" src={home_logo} alt=""/>
                    <h1 className="title"> Annuaire des Anciens</h1>
                </a>
            </header>

        );
    }
}

export default Header;
