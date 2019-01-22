import React, {Component} from 'react';
import './Home.css';
import Header from "../../Components/Header/Header";
import Nav from "../../Components/Nav/Nav";
import CA from "./CA";
import Auth from "../../Components/Auth/Auth";
import fetch from "../../__mocks__/fetch";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            leftBoard: [],
            rightBoard: []
        }
    }

    componentDidMount() {
        fetch('api/v1/core/member/board/latest', {
            headers: {
                Authorization: Auth.getToken()
            }
        })
            .then(res => res.json())
            .then((result) => {
                if (result.content) {
                    let rightBoard = result.content;
                    let leftBoard = rightBoard.splice(0, rightBoard.length / 2);
                    this.setState({
                        leftBoard: leftBoard,
                        rightBoard: rightBoard
                    });
                }
            })
    }

    render() {
        console.log(this.state);
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
                        <CA className="left_CA" members={this.state.leftBoard} position="left"/>
                        <div className="home_title">
                            <p className="welcome"> Bienvenue sur l'annuaire des anciens </p>
                            <p className="welcome_etic"> ETIC INSA TECHNOLOGIES </p>
                        </div>
                        <CA className="right_CA" members={this.state.rightBoard} position="right"/>
                    </section>
                </div>
            </React.Fragment>
        );
    }
}

export default Home;
