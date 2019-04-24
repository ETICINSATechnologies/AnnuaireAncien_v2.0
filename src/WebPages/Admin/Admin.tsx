import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

import './Admin.css';
import Header from "../../Components/Header/Header";
import Nav from "../../Components/Nav/Nav";
import Auth from "../../Components/Auth/Auth";
import InformationForm from "../../Components/InformationForm/InformationForm";
import PositionForm from "../../Components/PositionForm/PositionForm";
import {defaultMember, Member} from "../../Model/Member";

interface AdminState {
    status: string
}

class Admin extends Component<{}, AdminState> {
    state = {
        status: 'pending', // 'connected' 'not_authenticate'
    };

    componentDidMount() {
        if (!Auth.isConnected())
            this.setState({status: 'not_authenticate'});
        else {
            this.setState({status: "connected"});
        }
    }

    render() {
        let activeButton = ["home"];
        if (this.state.status === 'not_authenticate')
            return <Redirect to='/'/>;

        activeButton.push('search');
        activeButton = Auth.addCorrectButton(activeButton);

        return (
            <React.Fragment>
                <Header/>
                <Nav buttons={activeButton}/>
                <section className="Admin">
                    <div className="HeaderContainer">
                        <h1 className = 'title'>Création de Membre</h1>
                        <h3 className = 'description'> Veuillez remplir les champs suivants </h3>
                    </div>
                    <PositionForm modifyEnabled={true} memberPositions={[]} updateMemberPositions={()=>{}}/>
                    <h2>Informations Personelles</h2>
                    <InformationForm />
                    <button type="submit" className="registerbtn">Valider</button>
                </section>
            </React.Fragment>
        );
    }
}

export default Admin;