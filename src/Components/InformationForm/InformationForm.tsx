import React, { Component } from 'react';
import './InformationForm.css';

import { defaultMember, Member, MemberInterface } from "../../Model/Member";

interface InformationFormState {
    memberInfo: MemberInterface,
    numberBuffer: string
}

interface InformationFormProps {
    updateSuccess: boolean,
    createMember(info: Member): Promise<Response>
}

class InformationForm extends Component<InformationFormProps, InformationFormState> {
    state = {
        memberInfo: new Member(defaultMember),
        numberBuffer: ''
    };

    textChangeHandler = (event: React.ChangeEvent) => {
        event.persist();
        if (event.target.className === 'numberBuffer') {
            this.setState({
                numberBuffer: (event.target as any).value,
                memberInfo: {
                    ...this.state.memberInfo,
                    memberInfo: {
                        ...this.state.memberInfo,
                        gradeYear: Number((event.target as any).value)
                    }
                }
            })
        } else {
            this.setState({
                memberInfo: {
                    ...this.state.memberInfo,
                    [event.target.className]: (event.target as any).value
                }
            });
        }
    };

    radioChangeHandler = (event: React.ChangeEvent) => {
        let nB = Object.assign({}, this.state.memberInfo);
        nB.gender = (event.target as any).value;
        this.setState({
            memberInfo: nB
        });
    };

    formSubmitHandler = async (event: any) => {
        event.preventDefault();
        let res = await this.props.createMember(this.state.memberInfo);
        if (res.status === 200) {
            this.setState({
                memberInfo: new Member(defaultMember),
                numberBuffer: ''
            })
            let form : HTMLFormElement = document.getElementById("InformationForm") as any
            form ? form.reset(): null;
        }
        return false
    };

    render() {
        return (
            <form id="InformationForm" className="InformationForm" onSubmit={this.formSubmitHandler}>
                <div className="PersonalDetails">
                    <label className="needed">Nom</label>
                    <input type="text" className='lastName' onChange={this.textChangeHandler} required />

                    <label className="needed">Prénom</label>
                    <input type="text" className='firstName' onChange={this.textChangeHandler} required />

                    <label>Genre</label>
                    <div className='genreSelection'>
                        <p>
                            <input type="radio" name="gender" value="M"
                                onChange={this.radioChangeHandler} /><label>H</label>
                        </p>
                        <p>
                            <input type="radio" name="gender" value="F"
                                onChange={this.radioChangeHandler} /><label>F</label>
                        </p>
                        <p>
                            <input type="radio" name="gender" value="Autre"
                                onChange={this.radioChangeHandler} /><label>Autre</label>
                        </p>
                    </div>

                    <label className="needed">Date de Naissance</label>
                    <input type="date" className="birthday" onChange={this.textChangeHandler} />

                    <label>Telephone</label>
                    <input type="text" className='telephone' onChange={this.textChangeHandler}
                        pattern='([0]{1}[0-9]{9})|([\+]+[0-9]{11})' />

                    <label>Année d'obtention de diplôme</label>
                    <input type="text" className='numberBuffer' pattern='[0-9]{4}'
                        onChange={this.textChangeHandler} />

                    <label>Facebook</label>
                    <input type="text" className='facebook' onChange={this.textChangeHandler} />

                    <label>LinkedIn</label>
                    <input type="text" className='linkedin' onChange={this.textChangeHandler} />

                    <label>Email</label>
                    <input type="text" className='email' onChange={this.textChangeHandler} required
                        pattern='([\-\w\.]+@([\-\w]+\.)+[\-\w]{2,4})' />
                </div>
                <input type="submit" className="registerbtn" value="Valider" />
            </form>
        );
    }

}

export default InformationForm;