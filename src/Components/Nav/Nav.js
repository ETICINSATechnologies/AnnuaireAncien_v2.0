import React, {Component} from 'react';
import './Nav.css';

import help_icon from '../../Images/help_icon.png'
import Auth from "../Auth/Auth";

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
        if (this.props.buttons){
            for (let i = 0; i < this.props.buttons.length; i++) {
                let currentButton = this.state[this.props.buttons[i]];
                if (this.props.buttons[i] === 'disconnection')
                    navButtons.push(
                        <a className="button" key={i} href={currentButton.href} onClick={Auth.disconnect}>
                            {currentButton.value}
                        </a>
                    );
                else
                    navButtons.push(
                        <a className="button" key={i} href={currentButton.href}>
                            {currentButton.value}
                        </a>
                    );
            }
        }

        return (
            <nav className='Nav'>
                <div className='Menu'>
                    {navButtons}
                </div>
                <a className="help_link" href="/help">
                    <img className="help_icon" src={help_icon} alt=""/>
                </a>
            </nav>

        );
    }
}

export default Nav;
