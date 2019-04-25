import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom'
import './Connection.css';
import Header from "../../Components/Header/Header";
import Nav from "../../Components/Nav/Nav";
import Auth from "../../Components/Auth/Auth";


type ConnectionState = {
    parameters: Param
    status: string
}

interface Param {
    username: string
    password: string
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
            username: "username",
            password: "password"
        },
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
            fetch('/login', {
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
                                if(this.state.parameters.username ==='admin'){
                                    Auth.connect(result.token, true);
                                }else {
                                    Auth.connect(result.token, false);
                                }
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
                            <Link to="/recovery"> Mot de passe oublié ?</Link>
                            <input type="submit" className="connect_input" value="Se connecter"
                                   onClick={this.tryToConnect}/>
                        </form>
                    </section>
                    {this.state.status === 'connect' && Auth.isAdmin() && <Redirect to='/admin'/>}
                    {this.state.status === 'connect' && !Auth.isAdmin() && <Redirect to='/profile'/>}
                </div>
            </React.Fragment>
        );
    }
}

export default Connection;
