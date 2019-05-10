import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

import './MemberCreation.css';
import Header from "../../Components/Header/Header";
import Nav from "../../Components/Nav/Nav";
import Auth from "../../Components/Auth/Auth";
import InformationForm from "../../Components/InformationForm/InformationForm";
import PositionForm from "../../Components/PositionForm/PositionForm";
import {defaultMember, Member, MemberInterface} from "../../Model/Member";
import {MemberPosition} from "../../Model/MemberPosition";
import Modal from "../../Components/Modal/Modal";

interface MemberCreationState {
    status: string
    mailConfigured: boolean
    mailConfigURL: string
    initial: boolean
    updateSucceed: boolean
    member: Member
}

class MemberCreation extends Component<{}, MemberCreationState> {
    state = {
        status: 'pending', // 'connected' 'not_authenticate'
        mailConfigured: false,
        mailConfigURL: '',
        initial: true,
        updateSucceed: false,
        member: defaultMember
    };

    componentDidMount() {
        this.checkMailConfig();
        if (!Auth.isConnected())
            this.setState({status: 'not_authenticate'});
        else {
            this.setState({status: "connected"});
        }
    }

    checkMailConfig = () => {
        fetch('api/email/status', {
            headers: {
                'Authorization': Auth.getToken(),
            }
        }).then((res) => {
            if(res.status === 200){
                res.json()
                    .then((res) => {
                        if(res.status === "no_access_token"){
                            this.setState({
                                mailConfigured: false,
                                mailConfigURL: res.url
                            });
                        }else{
                            this.setState({
                                mailConfigured: true
                            })
                        }
                    })
            }
        });
    };

    configMailClickHandler = () => {
        let code = (document.getElementById('code') as HTMLInputElement).value;

        fetch('api/email/validation', {
            method: 'POST',
            headers: {
                Authorization: Auth.getToken(),
            },
            body: code
        }).then((res) => {
            if(res.status === 200){
                this.setState({
                    mailConfigured: true
                })
            }else{
                alert('Erreur : Code Inconnu');
            }
        })
    };

    updateMemberPositions = (mPositions: MemberPosition[]) => {
        this.setState({
            member: new Member({
                ...this.state.member,
                positions: mPositions
            } as MemberInterface)
        });
    };

    createMember = async (info: Member) => {
        Object.keys(info).forEach((key) => (info[key] === '') && (info[key] = undefined));
        info.positions = this.state.member.positions;

        let res = fetch('api/member', {
            method: 'POST',
            headers: {
                'Authorization': Auth.getToken(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(info)
        });


        res.then(res => {
            if (res.status === 200) {
                res.json()
                    .then(() => {
                        this.setState({
                            initial : false,
                            updateSucceed: true,
                            member: defaultMember
                        })
                    });
            } else {
                this.setState({
                    initial: false,
                    updateSucceed: false
                });
            }
        });

        return res;
    };

    render() {
        if (!Auth.isAdmin())
            return <Redirect to='/'/>;

        let activeButton = ['home', 'search', 'data'];
        activeButton = Auth.addCorrectButton(activeButton);

        return (
            <React.Fragment>
                <Header/>
                <Nav buttons={activeButton}/>
                <section className="MemberCreation">
                    <div className="HeaderContainer">
                        <h1 className = 'title'>Création de Membre</h1>
                        {
                        this.state.initial ?
                            <h3 className = 'description'> Veuillez remplir les champs suivants </h3> :
                            this.state.updateSucceed ?
                                <h3 className= 'description'>Nouveau membre est bien créé.</h3> :
                                <h3 className='error_info'>Erreur de saisie. Veuillez recommencer.</h3>
                        }
                    </div>
                    <h2>Informations Personelles</h2>
                    <InformationForm updateSuccess={this.state.updateSucceed} createMember={this.createMember}/>
                    <PositionForm modifyEnabled={true} memberPositions={this.state.member.positions} updateMemberPositions={this.updateMemberPositions}/>
                </section>

                <Modal onClose={() => {window.location.href = '/'}} show={!this.state.mailConfigured}>
                    <div className='MailConfig'>
                        <h1>Configuration Adresse Mail</h1>
                        <p>Pour pouvoir utiliser l'application, il vous faut configurer l'adresse mail qui sera utilisé pour envoyer les mails de confirmation
                            <br/><br/>
                            Rendez-vous sur l'url suivant et copiez le code obtenu ici</p>

                        <a onClick={() => window.open(this.state.mailConfigURL, '_blank')}>Cliquez ici pour autoriser l'envoi de mail</a>
                        <input type='text' id='code' placeholder='Copiez le code obtenu ici.'/>
                        <br/>
                        <input type='button' value='Valider' onClick={this.configMailClickHandler}/>
                    </div>
                </Modal>

            </React.Fragment>
        );
    }
}

export default MemberCreation;