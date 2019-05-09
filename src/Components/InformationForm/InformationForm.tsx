import React, {Component} from 'react';
import './InformationForm.css';

import {defaultMember, Member, MemberInterface} from "../../Model/Member";

interface InformationFormState{
    memberInfo: MemberInterface,
    numberBuffer: string,
    dateBuffer: string
}

interface InformationFormProps{
    updateSuccess: boolean,
    createMember (info: Member): Promise<Response>
}

class InformationForm extends Component<InformationFormProps, InformationFormState> {
    state = {
        memberInfo: new Member(defaultMember),
        numberBuffer: '',
        dateBuffer: ''
    };

    textChangeHandler = (event: React.ChangeEvent) => {
        event.persist();
        if(event.target.className === 'numberBuffer'){
            this.setState({
                numberBuffer: (event.target as any).value,
                memberInfo: {
                    ...this.state.memberInfo,
                    memberInfo:{
                        ...this.state.memberInfo,
                        gradeYear: Number((event.target as any).value)
                    }
                }
            })
        }else {
            this.setState({
                memberInfo: {
                    ...this.state.memberInfo,
                    [event.target.className]: (event.target as any).value
                }
            });
        }
    };

    radioChangeHandler = (event:React.ChangeEvent) => {
        let nB = Object.assign({}, this.state.memberInfo);
        nB.gender = (event.target as any).value;
        this.setState({
            memberInfo: nB
        });
    };

    dateChangeHandler = (event:any) => {
        let nB = Object.assign({}, this.state.memberInfo);
        let date = event.target.value;
        nB.birthday = date.substring(8,10)+date.substring(4,8)+date.substring(0,4);
        this.setState({
            memberInfo: nB,
            dateBuffer: date
        })
    };

    formSubmitHandler = async (event:any) => {
        event.preventDefault();
        let res = await this.props.createMember(this.state.memberInfo);
        if(res.status === 200){
            this.setState({
                memberInfo: new Member(defaultMember),
                numberBuffer: '',
                dateBuffer: ''
            })
        }
    };

    render(){
        return(
            <form className="InformationForm" onSubmit={this.formSubmitHandler}>
                <div className="PersonalDetails">
                    <label>Nom</label>
                    <input type="text" className='lastName' value={this.state.memberInfo.lastName} onChange={this.textChangeHandler} />

                    <label>Prénom</label>
                    <input type="text" className='firstName' value={this.state.memberInfo.firstName} onChange={this.textChangeHandler} />

                    <label>Genre</label>
                    <div className='genreSelection'>
                        <p>
                            <input type="radio" name="gender" value="M" onChange={this.radioChangeHandler}/><label>H</label>
                        </p>
                        <p>
                            <input type="radio" name="gender" value="F" onChange={this.radioChangeHandler}/><label>F</label>
                        </p>
                        <p>
                            <input type="radio" name="gender" value="Autre" onChange={this.radioChangeHandler}/><label>Autre</label>
                        </p>
                    </div>

                    <label>Date de Naissance</label>
                    <input type="date" name="bdaytime" value={this.state.dateBuffer} onChange={this.dateChangeHandler} />

                    <label>Telephone</label>
                    <input type="text" className='telephone' value={this.state.memberInfo.telephone} onChange={this.textChangeHandler} />

                    <label>Année d'obtention de diplôme</label>
                    <input type="text" className='numberBuffer' value={this.state.numberBuffer} onChange={this.textChangeHandler} />

                    <label>Facebook</label>
                    <input type="text" className='facebook' value={this.state.memberInfo.facebook} onChange={this.textChangeHandler}/>

                    <label>LinkedIn</label>
                    <input type="text" className='linkedin' value={this.state.memberInfo.linkedin} onChange={this.textChangeHandler}/>

                    <label>Email</label>
                    <input type="text" className='email' value={this.state.memberInfo.email} onChange={this.textChangeHandler} />
                </div>
                <input type="submit" className="registerbtn" value="Valider"/>
            </form>
        );
    }

}

export default InformationForm;