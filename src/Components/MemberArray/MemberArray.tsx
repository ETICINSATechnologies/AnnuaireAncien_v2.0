import React, {Component} from 'react';

import './MemberArray.css';
import Auth from "../../Components/Auth/Auth";

import {Member, MemberInterface} from "../../Model/Member";
import {SearchInterface} from "../../Model/Searchinterface";
import MemberArrayElement from "./MemberArrayElement";
import MemberArrayHeader from "./MemberArrayHeader";


interface MemberArrayProps {
    parameters: SearchInterface
    ref: string

    selectMember(member: Member): void
}

interface MemberArrayState {
    status: statusType
    members: Member[]
    memberMapping: object
}

type statusType = 'init' | 'noResult' | 'result' | 'pending' | 'error';

class MemberArray extends Component<MemberArrayProps, MemberArrayState> {
    state = {
        status: 'init' as statusType,
        members: [] as Member[],
        memberMapping: {},
    };

    getMembers = (searchArray: SearchInterface) => {
        // create the url with eventually the parameters
        let url = Object.keys(searchArray).reduce((url, property, i) => {
            let value = searchArray[property];
            if (value === '') return url;
            let delimiter = i == 0 ? '?' : '&';
            return url + delimiter + property + '=' + value
        }, 'api/v1/core/member');

        this.setState({
            status: 'pending'
        });

        fetch(url, {
            headers: {
                Authorization: Auth.getToken()
            }
        })
            .then(res => {
                if (res.status === 200)
                    res.json()
                        .then((result) => {
                            if (result && result.content.length > 0) {
                                let memberMapping = {};
                                let members = result.content.map(
                                    (member: MemberInterface, index: string) => {
                                        (memberMapping as any)[member.id] = index;
                                        return new Member(member)
                                    });
                                this.setState({
                                    status: 'result',
                                    members: members,
                                    memberMapping: memberMapping
                                })
                            }
                            else {
                                this.setState({
                                    status: 'noResult'
                                })
                            }
                        });
                else {
                    this.setState({
                        status: 'error'
                    })
                }
            })
    };

    selectMemberById = (id: number) => {
        this.props.selectMember(this.state.members[(this.state.memberMapping as any)[id]]);
    };

    render() {
        let data;
        if (this.state.status === 'result') {
            const members = this.state.members.map((member) => {
                return <MemberArrayElement key={member.id} memberInfo={member.read()}
                                           selectMemberById={this.selectMemberById}/>;
            });
            data =
                <table>
                    <caption>Liste des membres</caption>
                    <thead><MemberArrayHeader/></thead>
                    <tbody>{members}</tbody>
                </table>
        }
        else {
            let message;
            if (this.state.status === 'init') message = "Vous pouvez effectuer une recherche sur les critères ci-contre";
            else if (this.state.status === 'noResult') message = "La recherche n'a donné aucun résultat";
            else if (this.state.status === 'error') message = "Une erreur est survenue lors de la recherche";
            else if (this.state.status === 'pending') message = "Chargement...";

            data = <div className='info'>{message}</div>;
        }

        return (
            <section className={`MemberArray members`}>
                {data}
            </section>
        )
    }
}

export default MemberArray;
