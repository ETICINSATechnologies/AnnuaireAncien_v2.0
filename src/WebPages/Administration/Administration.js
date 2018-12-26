import React, {Component} from 'react';
import './Administration.css';
import Header from "../../Components/Header/Header";
import Nav from "../../Components/Nav/Nav";
import Redirect from "react-router-dom/es/Redirect";
import Auth from "../../Components/Auth/Auth";
import MemberArray from "../../Components/MemberArray/MemberArray";

class Administration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 'pending', // 'connected' 'not_authenticate'
            info: {},
            memberInfo: {}
        };
        this.selectMember = this.selectMember.bind(this)
    }

    componentDidMount() {
        if (!Auth.isConnected())
            this.setState({status: 'not_authenticate'});
    }

    selectMember (member) {
        console.log(member);
        this.setState({memberInfo: member})
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
                <section className="Administration">
                    <MemberArray className="CA" onClick={this.selectMember}/>
                    <MemberArray className="members" onClick={this.selectMember}/>
                    <section className='memberInfo' title='Info du membre'>
                        <div className='infoTitle'> Info du membre </div>
                        <div className='infoArea'> {this.state.memberInfo.username} </div>
                    </section>
                </section>
            </React.Fragment>
        );
    }
}

export default Administration;
