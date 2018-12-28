import React, {Component} from 'react';
import './Administration.css';
import Redirect from "react-router-dom/es/Redirect";
import Auth from "../../Components/Auth/Auth";
import Header from "../../Components/Header/Header";
import Nav from "../../Components/Nav/Nav";
import MemberArray from "../../Components/MemberArray/MemberArray";
import MemberInfo from "../../Components/MemberInfo/MemberInfo";

class Administration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 'pending', // 'connected' 'not_authenticate'
            memberInfo: {}
        };
        this.selectMember = this.selectMember.bind(this)
    }

    componentDidMount() {
        if (!Auth.isConnected())
            this.setState({status: 'not_authenticate'});
    }

    selectMember (member) {
        this.setState({memberInfo: member});
    }

    render() {
        if (this.state.status === 'not_authenticate')
            return <Redirect to='/'/>;

        let activeButton = ["home"];
        activeButton.push('search');
        activeButton.push('profile');
        activeButton = Auth.addCorrectButton(activeButton);

        return (
            <React.Fragment>
                <Header/>
                <Nav buttons={activeButton}> </Nav>
                <section className="Administration">
                    <MemberArray className="CA" onClick={this.selectMember}/>
                    <MemberArray className="members" onClick={this.selectMember}/>
                    <MemberInfo info={this.state.memberInfo}/>
                </section>
            </React.Fragment>
        );
    }
}

export default Administration;
