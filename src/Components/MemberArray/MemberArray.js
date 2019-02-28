import React, {Component} from 'react';
import './MemberArray.css';
import Auth from "../../Components/Auth/Auth";
import MemberDisplay from "../../Components/MembersDisplay/MemberDisplay";


class MemberArray extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 'init', // 'noResult', 'result', 'pending
            mapping: {},
            info: {}
        };
        this.getMembers = this.getMembers.bind(this);
    }

    componentDidMount() {
        if (!this.props.search)
            this.getMembers();
    }

    getMembers(searchArray) {
        let url = 'api/v1/core/member';
        if (searchArray) {
            Object.keys(searchArray).forEach((key, i) => {
                if (i === 0) url += '?';
                else url += '&';
                url += key + '=' + searchArray[key];
            });
        }
        if (this.props.board) url += '/board/latest';
        this.setState({
            status: 'pending'
        });

        fetch(url, {
            headers: {
                Authorization: Auth.getToken()
            }
        })
            .then(res => res.json())
            .then((result) => {
                if (result && result.content.length > 0) {
                    let mapping = this.mapMembers(result);
                    this.setState({
                        status: 'result',
                        info: result,
                        mapping: mapping
                    })
                }
                else {
                    this.setState({
                        status: 'noResult'
                    })
                }
            })
    }

    /**
     Associate the id of a member with its position in the array 'state.info.content'
     */
    mapMembers(result) {
        let i = 0;
        let mapping = {};
        result.content.forEach((member) => {
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

        if (this.state.status === 'result' && this.state.info.hasOwnProperty('content')) {
            for (let i = 0; i < this.state.info.content.length; i++) {
                if (this.state.info.content[i])
                    members.push(
                        <MemberDisplay key={i} info={this.state.info.content[i]}
                                       onClick={(id) => this.props.onClick(this.getMemberById(id))}/>
                    )
            }
        }
        else {
            let message;
            if (this.state.status === 'init') message = "Vous pouvez effectuer une recherche sur les critères ci-contre";
            else if (this.state.status === 'noResult') message = "La recherche n'a donné aucun résultat";
            else if (this.state.status === 'pending') message = "Chargement...";

            return (
                <section className={`MemberArray ${this.props.className}`}>
                    <div className='info'>{message}</div>
                </section>
            );
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
