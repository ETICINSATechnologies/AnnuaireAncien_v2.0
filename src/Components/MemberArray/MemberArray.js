import React, {Component} from 'react';
import './MemberArray.css';
import Auth from "../../Components/Auth/Auth";
import MemberDisplay from "../../Components/MembersDisplay/MemberDisplay";
import fetch from "../../__mocks__/fetch";


class MemberArray extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 'pending',
            mapping: {},
            info: {}
        };
        this.getMembers = this.getMembers.bind(this);
    }

    // getMembers() {
    //     let url = 'api/v1/core/member';
    //     if (this.props.board) url += '/board/latest';
    //     fetch(url, {
    //         headers: {
    //             Authorization: Auth.getToken()
    //         }
    //     })
    //         .then(res => res.json())
    //         .then((result) => {
    //             if (result) {
    //                 this.setState({
    //                     status: 'processing',
    //                     info: result
    //                 });
    //             }
    //             let mapping = this.mapMembers();
    //             this.setState({
    //                 mapping: mapping
    //             })
    //         })
    // }


    componentDidMount() {
        if (!this.props.search)
            this.getMembers();
    }

    getMembers(searchArray) {

        // let params = [];
        // let url = new URL('api/v1/core/member');
        // console.log(url);
        let url = 'api/v1/core/member';
        if (searchArray) {
            Object.keys(searchArray).forEach((key, i) => {
                if (i === 0) url += '?';
                else url += '&';
                url += key + '=' + searchArray[key];
            });
        }
        console.log(url);
        if (this.props.board) url += '/board/latest';

        fetch(url, {
            headers: {
                Authorization: Auth.getToken()
            }
        })
            .then(res => res.json())
            .then((result) => {
                if (result) {
                    this.setState({
                        status: 'processing',
                        info: result
                    });
                }
                let mapping = this.mapMembers();
                this.setState({
                    mapping: mapping
                })
            })
    }


    /**
     Associate the id of a member with its position in the array 'state.info.content'
     */
    mapMembers() {
        let i = 0;
        let mapping = {};
        this.state.info.content.forEach((member) => {
            if (!(member.id in mapping))
                mapping[member.id] = i++;
        });

        return mapping
    }

    getMemberById(id) {
        if (id in this.state.mapping) {
            let position = this.state.mapping[id];
            return this.state.info.content[position];
        }
        return null
    }

    render() {
        let members = [];
        if (this.state.status === 'pending') {
            for (let j = 0; j < 10; j++)
                members.push(
                    <tr key={j}>
                        <td/>
                        <td/>
                        <td/>
                        <td/>
                    </tr>
                )
        }
        else if (this.state.info.hasOwnProperty('content')) {
            for (let i = 0; i < this.state.info.content.length; i++) {
                if (!this.state.info.content[i]) {
                    //infos membre supprimés
                } else {
                    members.push(
                        <MemberDisplay key={i} info={this.state.info.content[i]}
                                       onClick={(id) => this.props.onClick(this.getMemberById(id))}/>
                    )
                }

            }
        }

        return (
            <section className={`MemberArray ${this.props.className}`}>
                <table>
                    <caption>
                        Liste des membres {this.props.board ? 'du CA' : ''}
                    </caption>
                    <thead><MemberDisplay header info/></thead>
                    <tbody>{members}</tbody>
                </table>
            </section>
        );
    }
}

export default MemberArray;
