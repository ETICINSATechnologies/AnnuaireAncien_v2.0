import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

import './Data.css';
import Header from "../../Components/Header/Header";
import Nav from "../../Components/Nav/Nav";
import Auth from "../../Components/Auth/Auth";
import {emitKeypressEvents} from "readline";

interface AdminState {

}

class Data extends Component<{}, AdminState> {

    dragOverHandler = (event: any) => {
        console.log("it's here");
        event.preventDefault();
    }

    dropHandler = (event: any) => {
        console.log("it fell");
        event.preventDefault();
    }

    render() {
        let activeButton = ['home'];
        if (Auth.isConnected()) {
            activeButton.push('search');
            if(Auth.isAdmin()){
                activeButton.push('member_creation');
            }else{
                activeButton.push('profile');
            }
        }
        activeButton = Auth.addCorrectButton(activeButton);

        return(<React.Fragment>
            <Header/>
            <Nav buttons={activeButton}/>
            <section className="Data">
                <div className='import'>
                    <h2>Importer la base de données de l'annuaire</h2>
                    <h3>Attention! Cette action efface la base éxistante!</h3>
                    <div id='drop_zone' onDrop={this.dropHandler} onDragOver={this.dragOverHandler}>
                        <p>Copier votre fichier ici</p>
                        <p> OU </p>
                        <input type='file'/>
                    </div>
                    <input type='button' value='Envoyer'/>
                </div>
                <div className='export'>
                    <input id='download' type='button' value="Télécharger l'Annuaire"/>
                </div>
            </section>
            </React.Fragment>
                );
    }
}

export default Data;