import React, {Component} from 'react';
import './Administration.css';

import Auth from "../../Components/Auth/Auth";
import Header from "../../Components/Header/Header";
import Nav from "../../Components/Nav/Nav";
import MemberArray from "../../Components/MemberArray/MemberArray";
import MemberInfo from "../../Components/MemberInfo/MemberInfo";

import {Route, Redirect} from 'react-router'
class Administration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            memberInfo: {}
        };
        this.selectMember = this.selectMember.bind(this)
    }

    selectMember (member) {
        this.setState({memberInfo: member});
    }

    render() {
        if (!Auth.isConnected())
            return <Redirect to='/'/>;

        {/*<Route exact path="/" render={() => (*/}
            {/*if (!Auth.isConnected())*/}
                {/*return <Redirect to='/'/>;*/}
        {/*)}/>*/}

        {/*<Route exact path="/" render={() => (*/}
            {/*loggedIn ? (*/}
            {/*) : (*/}
                {/*<Redirect to="/"/>*/}
            {/*)*/}
        {/*)}/>*/}

        let activeButton = ["home"];
        activeButton.push('search');
        activeButton.push('profile');
        activeButton = Auth.addCorrectButton(activeButton);

        return (
            <React.Fragment>
                <Header/>
                <Nav buttons={activeButton}> </Nav>
                <section className="Administration">
                    <MemberArray className="members" onClick={this.selectMember}/>
                    <MemberArray className="CA" board onClick={this.selectMember}/>
                    <MemberInfo editable info={this.state.memberInfo}/>
                </section>
            </React.Fragment>
        );
    }
}

export default Administration;
