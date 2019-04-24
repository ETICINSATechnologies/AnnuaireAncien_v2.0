import React, {Component} from 'react';
import './InformationForm.css';
import Auth from "../../Components/Auth/Auth";
import PositionForm from "../PositionForm/PositionForm";

interface CreationFormState{

}

interface CreationFormProps{

}

class InformationForm extends Component<CreationFormProps, CreationFormState> {
    render(){
        return(
            <form className="InformationForm">
                <label>Nom</label>
                <input type="text" required/>

                <label>Prénom</label>
                <input type="text" required/>

                <label>Genre</label>
                <div className='genreSelection'>
                    <input type="radio" name="gender" value="M"/><label>Homme</label>
                    <input type="radio" name="gender" value="F"/><label>Femme</label>
                </div>

                <label>Date de Naissance</label>
                <input type="date" name="bdaytime"/>

                <label>Telephone</label>
                <input type="text" required/>

                <label>Année d'obtention de diplôme</label>
                <input type="text" required/>

                <label>Email</label>
                <input type="text" required/>

                <label>Facebook</label>
                <input type="text"/>

                <label>LinkedIn</label>
                <input type="text"/>

                <label className='user'>Username</label>
                <input type="text" required/>

                <label>Mot de Passe</label>
                <input type="password" required/>

                <label>Confirmer Mot de Passe</label>
                <input type="password" required/>
            </form>
        );
    }

}

export default InformationForm;