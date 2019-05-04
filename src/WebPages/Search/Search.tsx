import React, {Component} from 'react';
import {Redirect} from "react-router-dom";

import './Search.css';
import Header from "../../Components/Header/Header";
import Nav from "../../Components/Nav/Nav";
import Auth from "../../Components/Auth/Auth";
import MemberArray from "../../Components/MemberArray/MemberArray";
import MemberInfo from "../../Components/MemberInfo/MemberInfo";

import {Position} from "../../Model/Position";
import {Member} from "../../Model/Member";
import {SearchInterface} from "../../Model/Searchinterface";

let defaultMan = require('../../Images/default_man.svg');
let defaultWoman = require('../../Images/default_woman.svg');


interface SearchState {
    searchValues: SearchInterface
    positions: Position[]
    selectedMember?: Member
    img: string
}


const searchFields = {
    firstName: 'Prénom',
    lastName: 'Nom',
    positionId: 'Poste',
    company: 'Entreprise',
    year: 'Année',
} as SearchInterface;


class Search extends Component<{}, SearchState> {
    state = {
        searchValues: {
            firstName: '',
            lastName: '',
            positionId: '',
            company: '',
            year: ''
        } as SearchInterface,
        positions: [],
        selectedMember: undefined,
        img: defaultMan
    };

    componentDidMount() {
        fetch('position', {
            headers: {
                Authorization: Auth.getToken()
            }
        })
            .then(res => res.json())
            .then((result) => {
                this.setState({positions: result as Position[]});
            })
    }

    selectMember = (member: Member) => {
        this.setState({
            selectedMember: member
        });
        this.getMemberImage(member);
    };

    getMemberImage = (member: Member) => {
        fetch(`member/${member.id}/image`, {
            headers: {
                'Authorization': Auth.getToken(),
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (res.status === 200) {
                    res.blob()
                        .then(image => {
                            this.setState({
                                img: URL.createObjectURL(image),
                            })
                        })
                } else {
                    this.setState({
                        img: (this.state.selectedMember as any).gender === 'F' ? defaultWoman : defaultMan
                    });
                }
            })
    };

    makeSearch = (page :number,event?: React.MouseEvent) => {
        event? event.preventDefault():null;

        // copy the input into a new variable
        let searchArray = Object.assign({}, this.state.searchValues);

        // remove the empty param fields
        Object.keys(searchArray).forEach((paramName) => {
            if (searchArray[paramName] === "")
                delete searchArray[paramName];
        });

        (this.refs.members as MemberArray).getMembers(searchArray, page);
    };

    updateParameters = (event: React.ChangeEvent) => {
        const paramName = event.target.className;
        let paramValue = (event.target as any).value;

        // update if this is not the year or if the year is a 4 digit number
        if (paramName !== "year" || paramValue.match(/^(\d?){4}$/))
            this.setState({
                searchValues: {
                    ...this.state.searchValues,
                    [event.target.className]: (paramValue)
                }
            });
    };

    render() {
        let activeButton = ["home"];
        if (!Auth.isConnected())
            return <Redirect to='/'/>;

        if(Auth.isAdmin()) {
            activeButton.push('member_creation');
            activeButton.push('data');
        }else{
            activeButton.push('profile');
        }
        activeButton = Auth.addCorrectButton(activeButton);

        // create the dropdown for the positions
        let positionDropDown = this.state.positions.map((position: Position, index) => {
            return <option key={index} value={position.id}>{position.label}</option>;
        });

        // create an array which contains the div and input for each field of the research
        let renderSearchFields: any = [];
        Object.keys(searchFields).forEach((fieldName) => {
            renderSearchFields.push(
                <div className={`${fieldName}Div`} key={`${fieldName}Div`}> {searchFields[fieldName]} </div>
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
                            <input className="searchInput" type="submit"
                                   value="Rechercher" onClick={(e: React.MouseEvent) => this.makeSearch(0, e)}
                            />
                        </form>
                    </div>
                    <MemberArray parameters={this.state.searchValues} selectMember={this.selectMember} ref="members"
                                 getPage={this.makeSearch}/>
                    <MemberInfo member={this.state.selectedMember} image={this.state.img}/>
                </section>
            </React.Fragment>
        );
    }
}

export default Search;
