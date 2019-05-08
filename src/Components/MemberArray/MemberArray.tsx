import React, { Component } from 'react';
import './MemberArray.css';
import Auth from "../../Components/Auth/Auth";
import { Member, MemberInterface } from "../../Model/Member";
import { SearchInterface } from "../../Model/Searchinterface";
import MemberArrayElement from "./MemberArrayElement";
import MemberArrayHeader from "./MemberArrayHeader";
import Modal from "../Modal/Modal";


interface MemberArrayProps {
    parameters: SearchInterface
    ref: string
    selectMember(member: Member): void
    getPage(pageNum: number): void
}

interface PageStatus {
    currentPage: number
    totalPages: number
}

interface MemberArrayState {
    status: statusType
    members: Member[]
    memberMapping: object
    page: PageStatus
    bufferInput: string
    showDeleteMember: boolean
    memberIdToDelete: number
}

type statusType = 'init' | 'noResult' | 'result' | 'pending' | 'error';

class MemberArray extends Component<MemberArrayProps, MemberArrayState> {
    state = {
        status: 'init' as statusType,
        members: [] as Member[],
        memberMapping: {},
        page: {
            currentPage: 0,
            totalPages: 1
        },
        bufferInput: '1',
        showDeleteMember: false,
        memberIdToDelete: 0
    };

    deleteMember = (id: number): void => {
        fetch('api/member/' + id, {
            method: 'DELETE',
            headers: {
                'Authorization': Auth.getToken(),
                'Content-Type': 'application/json'
            }
        })
        this.showDeleteMember();
    }

    showDeleteMember = (): void => {
        this.setState({
            ...this.state,
            showDeleteMember: !this.state.showDeleteMember
        })
    }

    getPageSize = () => {
        if (window.matchMedia("(orientation:landscape)")) {
            return 12;
        } else if (window.matchMedia("(orientation:portrait) and (max-width: 500px)")) {
            return 15;
        } else {
            return 8;
        }
    };

    getMembers = (searchArray: SearchInterface, page: number) => {
        //manage pages
        let baseurl: string = `api/member?pageSize=${this.getPageSize()}&pageNumber=${page}`;

        // create the url with eventually the parameters
        let url = Object.keys(searchArray).reduce((url, property, i) => {
            let value = searchArray[property];
            if (value === '') return url;
            let delimiter = '&';
            return url + delimiter + property + '=' + value
        }, baseurl);

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

                                let thisPage: PageStatus = {
                                    currentPage: result.meta.page,
                                    totalPages: result.meta.totalPages,
                                };

                                this.setState({
                                    status: 'result',
                                    members: members,
                                    memberMapping: memberMapping,
                                    page: thisPage,
                                    bufferInput: result.meta.page + 1
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

    selectPageByInput = (event: any) => {
        if (event.key === 'Enter') {
            this.props.getPage(event.target.value - 1);
        }
    };

    inputChangeHandler = (event: any) => {
        this.setState({
            bufferInput: event.target.value
        });
    };

    render() {
        let data;
        if (this.state.status === 'result') {
            const members = this.state.members.map((member) => {
                return <MemberArrayElement key={member.id} memberInfo={member.read()}
                    selectMemberById={this.selectMemberById}
                    deleteMember={(id: number) => {
                        this.setState({
                            ...this.state,
                            showDeleteMember: true,
                            memberIdToDelete: id
                        })
                    }} />;
            });
            data =
                <div>
                    <table>
                        <caption>Liste des membres</caption>
                        <thead><MemberArrayHeader /></thead>
                        <tbody>{members}</tbody>
                    </table>
                </div>
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
                <div className='searchResult'>
                    <div className='data'>
                        {data}
                    </div>
                    {this.state.page.totalPages === 1 ? null :
                        <div className='pagination'>
                            <input disabled={this.state.page.currentPage === 0} type='button' className='pagePrevious'
                                value='Page précédente' onClick={() => this.props.getPage(this.state.page.currentPage - 1)} />

                            <p className='pageIndicator'>
                                <label>Page </label>
                                <input type='number' className='pageInput' value={this.state.bufferInput} onKeyDown={this.selectPageByInput}
                                    onChange={this.inputChangeHandler} />
                                <label> de {this.state.page.totalPages}</label>
                            </p>

                            <input disabled={(this.state.page.currentPage + 1) === this.state.page.totalPages} type='button'
                                className='pageNext' value='Page suivante'
                                onClick={() => this.props.getPage(this.state.page.currentPage + 1)} />
                        </div>}
                </div>
                <Modal show={this.state.showDeleteMember} onClose={this.showDeleteMember}>
                    <p> Voulez-vous vraiment supprimer ce membre ?</p>
                    <div className='buttons'>
                        <button onClick={() => this.deleteMember(this.state.memberIdToDelete)}>Oui</button>
                        <button onClick={() => this.showDeleteMember()}>Non</button>
                    </div>
                </Modal>
            </section>
        )
    }
}

export default MemberArray;
