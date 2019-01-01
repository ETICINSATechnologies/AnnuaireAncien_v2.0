import React, {Component} from 'react';
import './Search.css';
import Header from "../../Components/Header/Header";
import Nav from "../../Components/Nav/Nav";
import Auth from "../../Components/Auth/Auth";
import Redirect from "react-router-dom/es/Redirect";
import MemberArray from "../../Components/MemberArray/MemberArray";
import MemberInfo from "../../Components/MemberInfo/MemberInfo";

class Search extends Component {
    constructor(props) {
        super(props);
        this.searchFields = {
            firstName: 'Prénom',
            lastName: 'Nom',
            position: 'Poste',
            company: 'Entreprise',
            year: 'Année'
        };
        this.state = {
            status: 'pending', // 'connected' 'not_authenticate'
            memberInfo: {}
        };
        this.selectMember = this.selectMember.bind(this);
        this.makeSearch = this.makeSearch.bind(this)
    }

    selectMember(member) {
        this.setState({memberInfo: member});
    }

    makeSearch(event) {
        event.preventDefault();
        this.refs.members.getMembers();
    }

    render() {
        let activeButton = ["home"];
        if (!Auth.isConnected())
            return <Redirect to='/'/>;

        activeButton.push('profile');
        activeButton = Auth.addCorrectButton(activeButton);

        let renderSearchFields = [];
        Object.keys(this.searchFields).forEach((fieldName) => {
            renderSearchFields.push(
                <div className={`${fieldName}Div`} key={`${fieldName}Div`}> {this.searchFields[fieldName]} </div>
            );
            renderSearchFields.push(
                <input type="text" className={`${fieldName}Input`} key={`${fieldName}Input`}/>
            )
        });

        return (
            <React.Fragment>
                <Header/>
                <Nav buttons={activeButton}> </Nav>
                <section className="Search">
                    <div className="searchArea">
                        <div className='infoTitle'> Rechercher</div>
                        <form className="searchForm">
                            {renderSearchFields}
                            <input className="searchInput" type="submit" value="Rechercher" onClick={this.makeSearch}/>
                        </form>
                    </div>
                    <MemberArray className="members" onClick={this.selectMember} search ref="members"/>
                    <MemberInfo info={this.state.memberInfo}/>
                </section>
            </React.Fragment>
        )
            ;
    }
}

export default Search;
