import React from 'react';
import {Link} from "react-router-dom";

import './Nav.css';
import helpIcon from '../../Images/help_icon.png';
import Auth from "../Auth/Auth";


type NavProps = {
    buttons: string[]
}

type redirect = {
    href: string
    value: string
}

const navRedirect = {
    connection: {
        href: '/connection',
        value: 'se connecter'
    } as redirect,
    disconnection: {
        href: '/',
        value: 'se déconnecter'
    } as redirect,
    home: {
        href: '/',
        value: 'accueil'
    } as redirect,
    search: {
        href: '/search',
        value: 'rechercher'
    } as redirect,
    profile: {
        href: '/profile',
        value: 'mon profil'
    } as redirect,
};

const Nav: React.SFC<NavProps> = ({buttons}: NavProps) => {
    let navButtons = buttons.map((button: string, i: number) => {
        return (
            <Link className="button" key={i} to={(navRedirect as any)[button].href}
                  onClick={button === 'disconnection' ? Auth.disconnect : undefined}>
                {(navRedirect as any)[button].value}
            </Link>
        );
    });

    return (
        <nav className='Nav'>
            <div className='Menu'>{navButtons}</div>
            <Link className="help_link" to="/help">
                <img className="help_icon" src={helpIcon} alt=""/>
            </Link>
        </nav>

    );
};

export default Nav;
