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
            positionId: 'Poste',
            company: 'Entreprise',
            year: 'Année'
        };
        this.state = {
            searchValues: {
                firstName: '',
                lastName: '',
                positionId: '',
                company: '',
                year: ''
            },
            positions: [],
            memberInfo: {}
        };
        this.selectMember = this.selectMember.bind(this);
        this.makeSearch = this.makeSearch.bind(this);
        this.updateParameters = this.updateParameters.bind(this);
    }

    componentDidMount() {
        fetch('api/v1/core/position', {
            headers: {
                Authorization: Auth.getToken()
            }
        })
            .then(res => res.json())
            .then((result) => {
                this.setState({positions: result});
            })
    }

    selectMember(member) {
        this.setState({memberInfo: member});
    }

    makeSearch(event) {
        event.preventDefault();

        // copy the input into a new variable
        let searchArray = Object.assign({}, this.state.searchValues);

        // remove the empty param fields
        Object.keys(searchArray).forEach((paramName) => {
            if (searchArray[paramName] === "")
                delete searchArray[paramName];
        });

        this.refs.members.getMembers(searchArray);
    }

    updateParameters(event) {
        const paramName = event.target.className;
        let paramValue = event.target.value;

        // update if this is not the year or if the year is a 4 digit number
        if (paramName !== "year" || paramValue.match(/^(\d?){4}$/))
            this.setState({
                searchValues: {
                    ...this.state.searchValues,
                    [event.target.className]: (paramValue)
                }
            });
    }

    render() {
        let activeButton = ["home"];
        if (!Auth.isConnected())
            return <Redirect to='/'/>;

        activeButton.push('profile');
        activeButton = Auth.addCorrectButton(activeButton);

        // create the dropdown for the positions
        let positionDropDown = this.state.positions.map((position, index) => {
            return <option key={index} value={position.id}>{position.label}</option>;
        });

        // create an array which contains the div and input for each field of the research
        let renderSearchFields = [];
        Object.keys(this.searchFields).forEach((fieldName) => {
            renderSearchFields.push(
                <div className={`${fieldName}Div`} key={`${fieldName}Div`}> {this.searchFields[fieldName]} </div>
            );
            if (fieldName === 'positionId') {
                renderSearchFields.push(
                    <select key='positionId' className='positionId' onChange={this.updateParameters}>
                        <option value=""/>
                        {positionDropDown}
                    </select>
                )
            }
            else {
                renderSearchFields.push(
                    <input type="text" className={fieldName} key={`${fieldName}Input`}
                           onChange={this.updateParameters} value={this.state.searchValues[fieldName]}/>
                );
            }
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
