import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'
import './Connection.css';
import Modal from "../../Components/Modal/Modal";
import Header from "../../Components/Header/Header";
import Nav from "../../Components/Nav/Nav";
import Auth from "../../Components/Auth/Auth";
import CopyContent from "../../Components/CopyContent/CopyContent";

type ConnectionState = {
    parameters  : Param
    status      : string
    show        : boolean
}

interface Param {
    username    :   string
    password    :   string
}

const statusMessage = {
    connect: '',
    loading: '',
    error: 'Une erreur est survenue',
    invalid: 'Identifiant ou mot de passe invalide',
    missingValue: 'Veuillez compléter tous les champs du formulaire !'
};

class Connection extends Component<{}, ConnectionState> {
    state = {
        parameters: {
            username    : ""    ,
            password    : ""    ,
        },
        show        : false ,
        status: 'loading',
    };

    onChange = (event: React.ChangeEvent) => {
        let parameters = Object.assign({}, this.state.parameters);
        (parameters as any)[event.target.className] = (event.target as any).value;
        this.setState({parameters: parameters});
    };

    tryToConnect = (event: React.MouseEvent) => {
        event.preventDefault();
        if (!this.state.parameters.username || !this.state.parameters.password) {
            this.setState({status: 'missingValue'})
        }
        else {
            fetch('api/v1/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state.parameters)
            })
                .then(res => {
                    if (res.status === 200) {
                        this.setState({status: 'pending'});
                        res.json()
                            .then(result => {
                                Auth.connect(result.token);
                                this.setState({status: 'connect'})
                            })
                    }
                    else if (res.status === 401)
                        this.setState({status: 'invalid'});
                    else
                        this.setState({status: 'error'});
                })
        }
    };

    showModal = () => {
        this.setState({
            ...this.state,
            show: !this.state.show
        });
    }

    render() {
        let activeButton = ["home"];

        return (
            <React.Fragment>
                <Header/>
                <Nav buttons={activeButton}> </Nav>
                <div className="Connection">
                    <section className="connect_section">
                        <form className="connect_form">
                            <div className="info_area"> {(statusMessage as any)[this.state.status]} </div>
                            <p> Identifiant </p>
                            <input type="text" className="username" value={this.state.parameters.username}
                                   onChange={this.onChange}/>
                            <p> Mot de passe </p>
                            <input type="password" className="password" value={this.state.parameters.password}
                                   onChange={this.onChange}/>
                            <input type="button" className = "forgot_password" value = "Mot de passe oublié ?"
                                   onClick ={() => this.showModal()}/>
                            <input type="submit" className="connect_input" value="Se connecter"
                                   onClick={this.tryToConnect}/>
                        </form>
                    </section>
                    {this.state.status === 'connect' && <Redirect to='/profile'/>}
                </div>
                <div className="modal">
                    <Modal show={this.state.show} onClose={this.showModal}>
                        <p className = "text-content">
                            Afin de récupérer vos identifiants, veuillez contacter par mail l'administrateur de ce site
                            en
                            utilisant
                            l'adresse mail suivante :
                        </p>

                        <CopyContent className="contact" textToCopy="contact@etic-insa.com"/>
                    </Modal>
                </div>
            </React.Fragment>
        );
    }
}

export default Connection;
