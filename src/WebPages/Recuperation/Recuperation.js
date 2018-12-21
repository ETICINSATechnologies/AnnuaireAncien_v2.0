import React, {Component} from 'react';
import './Recuperation.css';
import Header from "../../Components/Header/Header";
import Nav from "../../Components/Nav/Nav";
import Auth from "../../Components/Auth/Auth";

class Recuperation extends Component {
    render() {
        let activeButton = Auth.addCorrectButton(["home"]);

        return (
            <React.Fragment>
                <Header/>
                <Nav buttons={activeButton}> </Nav>
                <div className="Recuperation">
                    <section className="Recuperation_section">
                        <div className="div1">
                            Afin de récupérer vos identifiants, veuillez contacter par mail l'administrateur de ce site
                            en
                            utilisant
                            l'adresse mail suivante :
                        </div>
                        <button className="div2"> contact@etic-insa.com</button>
                        <div className="div3"> adresse copié !</div>
                    </section>
                </div>
            </React.Fragment>
        );
    }
}

export default Recuperation;
