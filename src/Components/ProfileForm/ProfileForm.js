import React, {Component} from 'react';
import './ProfileForm.css';

class ProfileForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            function: props.function,
            info: {
                firstName: '',
                lastName: '',
                email: '',
                telephone: '',
                department: '',
                company: ''
            }
        };

        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        let parameters = Object.assign({}, this.state.info);
        parameters[event.target.className] = event.target.value;
        this.setState({info: parameters});
    }

    render() {
        return (
            <form className="ProfileForm">
                <div className="info_area">Appuyer sur Sauvegarder pour enregistrer les modifications
                </div>
                <div className="image"> </div>
                <p> Téléphone </p>
                <p className="right needed"> Nom </p>
                <input type="text" className="telephone" value={this.state.info.telephone} onChange={this.onChange}/>
                <input type="text" className="lastName" value={this.state.info.lastName} onChange={this.onChange}/>
                <p> Département </p>
                <p className="right p_info needed"> Prénom </p>
                <input type="text" className="department" value={this.state.info.department} onChange={this.onChange}/>
                <input type="text" className="firstName" value={this.state.info.firstName} onChange={this.onChange}/>
                <p className="needed"> Adresse mail </p>
                <p> Travaille chez </p>
                <input type="text" className="email" value={this.state.info.email} onChange={this.onChange}/>
                <input type="text" className="company" value={this.state.info.company} onChange={this.onChange}/>
                <div className="div_button">
                    <input className="input_button password" type="button" value="Changer mot de passe"/>
                </div>
                <div className="div_button">
                    <input className="input_button update" type="button" value="Sauvegarder"/>
                </div>
            </form>
        );
    }
}

export default ProfileForm;
