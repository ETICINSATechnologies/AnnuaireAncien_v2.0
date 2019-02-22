import React, {Component} from 'react';
import './Nav.css';

import help_icon from '../../Images/help_icon.png'
import Auth from "../Auth/Auth";
import {Link} from "react-router-dom";

class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            connection: {
                href: '/connection',
                value: 'se connecter'
            },
            disconnection: {
                href: '/',
                value: 'se déconnecter'
            },
            home: {
                href: '/',
                value: 'accueil'
            },
            search: {
                href: '/search',
                value: 'rechercher'
            },
            profile: {
                href: '/profile',
                value: 'mon profil'
            }
        }
    }

    render() {
        let navButtons = [];

        for (let i = 0; i < this.props.buttons.length; i++) {
            let currentButton = this.state[this.props.buttons[i]];
            if (this.props.buttons[i] === 'disconnection')
                navButtons.push(
                    <Link className="button" key={i} to={currentButton.href} onClick={Auth.disconnect}>
                        {currentButton.value}
                    </Link>
                );
            else
                navButtons.push(
                    <Link className="button" key={i} to={currentButton.href}>
                        {currentButton.value}
                    </Link>
                );
        }

        return (
            <nav className='Nav'>
                <div className='Menu'>
                    {navButtons}
                </div>
                <Link className="help_link" to="/help">
                    <img className="help_icon" src={help_icon} alt=""/>
                </Link>
            </nav>

        );
    }
}

export default Nav;
