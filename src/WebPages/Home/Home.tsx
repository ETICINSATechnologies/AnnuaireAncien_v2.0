import React, { Component } from 'react';
import './Home.css';

import Header from "../../Components/Header/Header";
import Nav from "../../Components/Nav/Nav";
import Auth from "../../Components/Auth/Auth";


type HomeState = {
}

class Home extends Component<{}, HomeState> {
    state = {
    };

    render() {
        let activeButton = [];
        if (Auth.isConnected()) {
            activeButton.push('search');
            if (Auth.isAdmin()) {
                activeButton.push('member_creation');
                activeButton.push('data');
            } else {
                activeButton.push('profile');
            }
        }
        activeButton = Auth.addCorrectButton(activeButton);

        return (
            <React.Fragment>
                <Header />
                <Nav buttons={activeButton}> </Nav>
                <div className="Home">
                    <section className="home">
                        <div className="home_title">
                            <p className="welcome"> Bienvenue sur l'annuaire des anciens </p>
                            <p className="welcome_je" />
                        </div>
                    </section>
                </div>
            </React.Fragment>
        );
    }
}

export default Home;
