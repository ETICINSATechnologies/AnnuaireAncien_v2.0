import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

import './Profile.css';
import Header from "../../Components/Header/Header";
import Nav from "../../Components/Nav/Nav";
import Auth from "../../Components/Auth/Auth";
import ProfileForm from "../../Components/ProfileForm/ProfileForm";
import PositionForm from "../../Components/PositionForm/PositionForm";

import {Member, MemberInterface, defaultMember} from "../../Model/Member";
import {MemberPosition} from "../../Model/MemberPosition";


interface ProfileState {
    status: string
    modifyEnabled: boolean
    update: boolean
    updateSucceed: boolean
    previousMember: Member
    member: Member
}


class Profile extends Component<{}, ProfileState> {
    state = {
        status: 'pending', // 'connected' 'not_authenticate'
        modifyEnabled: false,
        update: false,
        updateSucceed: false,
        previousMember: defaultMember,
        member: defaultMember
    };

    componentDidMount() {
        if (!Auth.isConnected())
            this.setState({status: 'not_authenticate'});
        else {
            this.setState({status: "connected"});
            fetch('member/me', {
                headers: {
                    Authorization: Auth.getToken()
                }
            })
                .then(res => res.json())
                .then((result) => {
                    let member = new Member(JSON.parse(JSON.stringify(result)));
                    let prevMember = new Member(JSON.parse(JSON.stringify(result)));
                    this.setState({
                        previousMember: prevMember,
                        member: member
                    });
                })
        }
    }

    updateMember = () => {
        fetch('member/' + this.state.member.id, {
            method: 'PUT',
            headers: {
                'Authorization': Auth.getToken(),
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(this.state.member.update())
        })
            .then(res => {
                if (res.status === 200) {
                    res.json()
                        .then((result) => {
                            let member = new Member(JSON.parse(JSON.stringify(result)));
                            let prevMember = new Member(JSON.parse(JSON.stringify(result)));
                            this.setState({
                                previousMember: prevMember,
                                member: member,
                                update: true,
                                updateSucceed: true,
                                modifyEnabled: false
                            });
                        })
                } else {
                    this.setState({
                        update: true,
                        updateSucceed: false
                    });
                }
            });
    };

    updateMemberPassword = (pass : string) => {

        let member= this.state.previousMember;
        member.password=pass;

        fetch('member/' + this.state.member.id, {
            method: 'PUT',
            headers: {
                'Authorization': Auth.getToken(),
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(member.update())
        })
            .then(res => {
                if (res.status === 200) {
                    res.json()
                        .then(() => {
                            this.setState({
                                update: true,
                                updateSucceed: true,
                            });
                        })
                } else {
                    this.setState({
                        update: true,
                    });
                }
            });
    };

    enableModification = () => {
        let member = new Member(JSON.parse(JSON.stringify(this.state.previousMember)));
        this.setState({
            update: false,
            modifyEnabled: !this.state.modifyEnabled,
            member: member
        })
    };

    resetFields = () => {
        let member = new Member(JSON.parse(JSON.stringify(this.state.previousMember)));
        this.setState({
            member : member,
            modifyEnabled : false,
        });
    };

    updateMemberPositions = (mPositions: MemberPosition[]) => {
        this.setState({
            member: new Member({
                ...this.state.member,
                positions: mPositions
            } as MemberInterface)
        });
    };

    modifyMember = (member: Member) => {
        this.setState({
            member: member
        })
    };

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
                <section className="Profile">
                    <ProfileForm member={this.state.member} modifyEnabled={this.state.modifyEnabled}
                                 update={this.state.update} updateSucceed={this.state.updateSucceed}
                                 modifyMember={this.modifyMember} updateMember={this.updateMember}
                                 updateMemberPassword={this.updateMemberPassword}
                                 enableModification={this.enableModification} resetFields={this.resetFields}/>
                    <PositionForm memberPositions={this.state.member.positions} modifyEnabled={this.state.modifyEnabled}
                                  updateMemberPositions={this.updateMemberPositions}/>
                </section>
            </React.Fragment>
        );
    }
}

export default Profile;
