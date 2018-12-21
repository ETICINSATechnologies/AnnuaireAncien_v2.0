import React, {Component} from 'react';
import './Search.css';
import Header from "../../Components/Header/Header";
import Nav from "../../Components/Nav/Nav";
import Auth from "../../Components/Auth/Auth";
import Redirect from "react-router-dom/es/Redirect";

class Search extends Component {
    render() {
        let activeButton = ["home"];
        if (!Auth.isConnected())
            return <Redirect to='/'/>;

        activeButton.push('profile');
        activeButton = Auth.addCorrectButton(activeButton);

        return (
            <React.Fragment>
                <Header/>
                <Nav buttons={activeButton}> </Nav>
                <div className="Search">
                </div>
            </React.Fragment>
        );
    }
}

export default Search;
