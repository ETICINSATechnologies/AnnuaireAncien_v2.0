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

interface MemberCreationState {
    status: string
    initial: boolean
    updateSucceed: boolean
    member: Member
}

class MemberCreation extends Component<{}, MemberCreationState> {
    state = {
        status: 'pending', // 'connected' 'not_authenticate'
        initial: true,
        updateSucceed: false,
        member: defaultMember
    };

    componentDidMount() {
        if (!Auth.isConnected())
            this.setState({status: 'not_authenticate'});
        else {
            this.setState({status: "connected"});
        }
    }

    updateMemberPositions = (mPositions: MemberPosition[]) => {
        this.setState({
            member: new Member({
                ...this.state.member,
                positions: mPositions
            } as MemberInterface)
        });
    };

    createMember = async (info: Member) => {
        info.positions = this.state.member.positions;

        let res = fetch('member', {
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
        let activeButton = ["home"];
        if (this.state.status === 'not_authenticate')
            return <Redirect to='/'/>;

        activeButton.push('search');
        activeButton.push('data');
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
            </React.Fragment>
        );
    }
}

export default MemberCreation;