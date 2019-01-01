import React, {Component} from 'react';
import './Home.css';
import Header from "../../Components/Header/Header";
import Nav from "../../Components/Nav/Nav";
import CA from "./CA";
import Auth from "../../Components/Auth/Auth";

class Home extends Component {
    render() {
        let activeButton = [];
        if (Auth.isConnected()) {
            activeButton.push('search');
            activeButton.push('profile');
        }
        activeButton = Auth.addCorrectButton(activeButton);

        return (
            <React.Fragment>
                <Header/>
                <Nav buttons={activeButton}> </Nav>
                <div className="Home">
                    <section className="home">
                        <CA className="left_CA" position="left"/>
                        <div className="home_title">
                            <p className="welcome"> Bienvenue sur l'annuaire des anciennes </p>
                            <p className="welcome_etic"> ETIC INSA TECHNOLOGIES </p>
                        </div>
                        <CA className="right_CA" position="right"/>
                    </section>
                </div>
            </React.Fragment>
        );
    }
}

export default Home;
