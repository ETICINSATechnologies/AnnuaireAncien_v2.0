import React, {Component} from 'react';
import './Recovery.css';
import Header from "../../Components/Header/Header";
import Nav from "../../Components/Nav/Nav";
import Auth from "../../Components/Auth/Auth";


interface RecoveryState {
    email: string
    message: string
    color: string

    [property: string]: any
}

class Recovery extends Component<{}, RecoveryState> {
    state = {
        email: '',
        message: '',
        color: 'black'
    };

    activeButton = Auth.addCorrectButton(["home"]);

    onChange = (event: React.ChangeEvent) => {
        event.persist();
        let property = event.target.className;
        let value = (event.target as any).value;

        if (this.state.hasOwnProperty(property)) {
            this.setState({
                [property]: value
            })
        }
    };

    onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        this.setState({
            message: 'Chargement...',
            color: 'black'
        });
        fetch('api/member/reset', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
            .then(res => {
                let message = "Une erreur est survenue";
                let success = 'red';
                if (res.status === 204) {
                    message = "Un mot de passe temporaire a été envoyé à l'adresse mail spécifiée";
                    success = 'green'
                } else if (res.status === 404) {
                    message = "Pas de compte trouvé pour cette adresse mail";
                }
                this.setState({
                    message: message,
                    color: success
                })
            })
    };

    render() {
        return (
            <React.Fragment>
                <Header/>
                <Nav buttons={this.activeButton}> </Nav>
                <div className="Recovery">
                    <section className="Recuperation_section">
                        <div className="Instructions">
                            Afin de récupérer vos identifiants, rentrez votre adresse mail
                            et puis cliquez sur 'Réinitialiser' pour recevoir un mot de passe temporaire
                        </div>
                        <div className="message" style={{color: this.state.color}}>{this.state.message}</div>
                        <div className="Form_container">
                            <form className="Form" onSubmit={(e: React.FormEvent) => this.onSubmit(e)}>
                                <p className='email field'>
                                    <label>Adresse mail :</label>
                                    <input required onChange={this.onChange} className="email" type="text"
                                           name="email"/>
                                </p>
                                <p className='submit_button field'>
                                    <button type="submit">Réinitialiser</button>
                                </p>
                            </form>
                        </div>
                    </section>
                </div>
            </React.Fragment>
        );

    }
};

export default Recovery;
