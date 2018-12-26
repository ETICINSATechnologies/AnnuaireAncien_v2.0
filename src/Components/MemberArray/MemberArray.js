import React, {Component} from 'react';
import './MemberArray.css';
import Auth from "../../Components/Auth/Auth";
import MemberDisplay from "../../Components/MembersDisplay/MemberDisplay";

class MemberArray extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 'pending',
            info: {}
        };
    }

    componentDidMount() {
        fetch('api/v1/core/member', {
            headers: {
                Authorization: Auth.getToken()
            }
        })
            .then(res => res.json())
            .then((result) => {
                if (result)
                    this.setState({
                        status: 'processing',
                        info: result
                    });
            })

    }

    render() {
        let members = [];
        if (this.state.status === 'pending') {
            for (let i = 0; i < 9; i++)
                members.push(
                    <MemberDisplay key={i} info/>
                )
        }
        else if (this.state.info.hasOwnProperty('content')) {
            members = [];
            for (let j = 0; j < 3; j++) {
                for (let i = 0; i < this.state.info.content.length; i++) {
                    members.push(
                        <MemberDisplay key={`${j}${i}`} info={this.state.info.content[i]}
                                       onClick={(id) => this.props.onClick(id)}/>
                    )
                }
            }
        }

        return (
            <section className={`MemberArray ${this.props.className}`}>
                <table>
                    <caption>
                        Liste des membres {this.props.className === 'CA' ? 'du CA' : ''}
                    </caption>
                    <thead><MemberDisplay header info/></thead>
                    <tbody>{members}</tbody>
                </table>
            </section>
        );
    }
}

export default MemberArray;
