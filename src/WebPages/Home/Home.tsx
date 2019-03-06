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

    componentDidMount() {
        fetch('api/v1/core/member/board/latest', {
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

        /*fetch('api/v1/core/member')
            .then((res: any) => res.json())
            .then((response: Page<Member>) => {
                console.log(response);
                let member = new Member(response.content[0]);
                console.log(member);
                console.log(member.read());
                member.department = {
                    id: 1,
                    label: 'kdlsdk',
                    name: ''
                };
                member.telephone = '01234567890';
                let m = member.update();
                //console.log(b.toString());
                fetch('api/v1/core/department', {
                    headers: {
                        Authorization: token
                    }
                })
                    .then(res => res.json())
                    .then((response) => {
                        let a = response as Department[];
                        console.log(a);
                        member.department = a[1];
                        console.log(JSON.stringify(m.positions[0].year));
                        fetch('api/v1/core/member/1', {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: token
                            },
                            body: JSON.stringify(m)
                        })
                            .then(res => res.json())
                            .then()
                    })
            })*/
    }

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
