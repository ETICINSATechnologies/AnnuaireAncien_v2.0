import React, {Component} from 'react';
import './Profile.css';
import Header from "../../Components/Header/Header";
import Nav from "../../Components/Nav/Nav";
import {Redirect} from 'react-router-dom'
import Auth from "../../Components/Auth/Auth";
import ProfileForm from "../../Components/ProfileForm/ProfileForm";
import fetch from "../../__mocks__/fetch";


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 'pending', // 'connected' 'not_authenticate'
            info: {}
        }
    }

    componentDidMount() {
        if (!Auth.isConnected())
            this.setState({status: 'not_authenticate'});
        else
        {
            this.setState({status: "connected"});
            fetch('api/v1/core/member/me', {
                headers: {
                    Authorization: Auth.getToken()
                }
            })
                .then(res => res.json())
                .then((result) => {
                    this.setState({info: result});
                    console.log(this.state.info);
                })
        }
    }

    render() {
        if (this.state.status === 'not_authenticate')
            return <Redirect to='/'/>;

        let activeButton = ["home"];
        activeButton.push('search');
        activeButton = Auth.addCorrectButton(activeButton);

        return (
            <React.Fragment>
                <Header/>
                <Nav buttons={activeButton}> </Nav>
                <section className='Profile'>
                    <ProfileForm info={this.state.info} function='update'/>
                </section>
            </React.Fragment>
        );
    }
}

export default Profile;
