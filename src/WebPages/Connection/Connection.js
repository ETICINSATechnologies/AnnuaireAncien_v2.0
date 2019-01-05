import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'
import './Connection.css';
import Header from "../../Components/Header/Header";
import Nav from "../../Components/Nav/Nav";
import Auth from "../../Components/Auth/Auth";
import fetch from "../../__mocks__/fetch";

class Connection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            parameters: {
                username: "username",
                password: "password"
            },
            status: 'loading',
            statusMessage: {
                connect: '',
                loading: '',
                invalid: 'Identifiant ou mot de passe invalide',
                missingValue: 'Veuillez compléter tous les champs du formulaire !'
            }
        };

        this.onChange = this.onChange.bind(this);
        this.tryToConnect = this.tryToConnect.bind(this);
    }

    onChange(event) {
        let parameters = Object.assign({}, this.state.parameters);
        parameters[event.target.className] = event.target.value;
        this.setState({parameters: parameters});
    }

    tryToConnect(event) {
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
                    if (res.status !== 200)
                        this.setState({status: 'invalid'});
                    else {
                        this.setState({status: 'pending'});
                        res.json()
                            .then(result => {
                                console.log("token: " + result.token);
                                Auth.connect(result.token);
                                this.setState({status: 'connect'})
                            })
                    }
                })
        }
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
                            <div className="info_area"> {this.state.statusMessage[this.state.status]} </div>
                            <p> Identifiant </p>
                            <input type="text" className="username" value={this.state.parameters.username}
                                   onChange={this.onChange}/>
                            <p> Mot de passe </p>
                            <input type="text" className="password" value={this.state.parameters.password}
                                   onChange={this.onChange}/>
                            <a href="/recup"> Mot de passe oublié ?</a>
                            <input type="submit" className="connect_input" value="Se connecter"
                                   onClick={this.tryToConnect}/>
                        </form>
                    </section>
                    {this.state.status === 'connect' && <Redirect to='/profile'/>}
                </div>
            </React.Fragment>
        );
    }
}

export default Connection;
