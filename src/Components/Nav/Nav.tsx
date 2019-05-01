import React, {Component} from 'react';
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
        value: 'Se Connecter'
    } as redirect,
    disconnection: {
        href: '/',
        value: 'Se Déconnecter'
    } as redirect,
    home: {
        href: '/',
        value: 'Accueil'
    } as redirect,
    search: {
        href: '/search',
        value: 'Rechercher'
    } as redirect,
    profile: {
        href: '/profile',
        value: 'Mon Profil'
    } as redirect,
    member_creation: {
        href: '/member_creation',
        value: 'Ajout'
    } as redirect,
    data: {
        href: '/data',
        value: 'Publier'
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
