import React, {Component} from 'react';
import './Home.css';

import Header from "../../Components/Header/Header";
import Nav from "../../Components/Nav/Nav";
import Auth from "../../Components/Auth/Auth";
import Board from "./Board";

import {Member, MemberInterface} from "../../Model/Member";

import {fetch} from "../../__mocks__/function/fetch";


type HomeState = {
    leftBoard: Member[]
    rightBoard: Member[]
}

class Home extends Component<{}, HomeState> {
    state = {
        leftBoard: [],
        rightBoard: []
    };
    
    // Uncomment the code below to display board photos
    /**
    componentDidMount() {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/core/member/board/latest`, {
            headers: {
                Authorization: Auth.getToken()
            }
        })
            .then(res => res.json())
            .then((result) => {
                // create an array of member from result.content
                let members = result.content.map((member: MemberInterface) => {
                    return new Member(member);
                }) as Member[];

                // split members in two parts, splice transforms the object on which it is called 
                let rightBoard = Array.from(members) as Member[];
                let leftBoard = rightBoard.splice(0, rightBoard.length / 2) as Member[];

                this.setState({
                    leftBoard: leftBoard,
                    rightBoard: rightBoard
                });
            });
    }
    **/

    render() {
        let activeButton = [];
        if (Auth.isConnected()) {
            activeButton.push('search');
            activeButton.push('profile');
        }
        activeButton = Auth.addCorrectButton(activeButton);

        return (
            <React.Fragment>
                <Header/>
                <Nav buttons={activeButton}> </Nav>
                <div className="Home">
                    <section className="home">
                        <Board members={this.state.leftBoard} position="left"/>
                        <div className="home_title">
                            <p className="welcome"> Bienvenue sur l'annuaire des anciens </p>
                            <p className="welcome_etic"> ETIC INSA TECHNOLOGIES </p>
                        </div>
                        <Board members={this.state.rightBoard} position="right"/>
                    </section>
                </div>
            </React.Fragment>
        );
    }
}

export default Home;
