import React, {Component} from 'react';
import './InformationForm.css';

import {defaultMember, Member} from "../../Model/Member";

interface InformationFormState{
    memberInfo: Member,
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

    textChangeHandler = (event:any) => {
        let nB = Object.assign({}, this.state.memberInfo);
        switch(Number(event.target.id)){
            case 1:
                nB.lastName = event.target.value;
                break;
            case 2:
                nB.firstName = event.target.value;
                break;
            case 3:
                nB.telephone = event.target.value;
                break;
            case 4:
                this.state.numberBuffer = event.target.value;
                nB.gradeYear = Number(event.target.value);
                break;
            case 5:
                nB.facebook = event.target.value;
                break;
            case 6:
                nB.linkedin = event.target.value;
                break;
            case 7:
                nB.email = event.target.value;
                break;
            default:
                break;
        }
        this.setState({
            memberInfo: nB,
        });
    };

    radioChangeHandler = (event:any) => {
        let nB = Object.assign({}, this.state.memberInfo);
        nB.gender = event.target.value;
        this.setState({
            memberInfo: nB
        });
        console.log(nB);
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
                    <input type="text" id="1" value={this.state.memberInfo.lastName} onChange={this.textChangeHandler} />

                    <label>Prénom</label>
                    <input type="text" id="2" value={this.state.memberInfo.firstName} onChange={this.textChangeHandler} />

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
                    <input type="text" id="3" value={this.state.memberInfo.telephone} onChange={this.textChangeHandler} />

                    <label>Année d'obtention de diplôme</label>
                    <input type="text" id="4" value={this.state.numberBuffer} onChange={this.textChangeHandler} />

                    <label>Facebook</label>
                    <input type="text" id="5" value={this.state.memberInfo.facebook} onChange={this.textChangeHandler}/>

                    <label>LinkedIn</label>
                    <input type="text" id="6" value={this.state.memberInfo.linkedin} onChange={this.textChangeHandler}/>

                    <label>Email</label>
                    <input type="text" id="7" className='email' value={this.state.memberInfo.email} onChange={this.textChangeHandler} />
                </div>
                <input type="submit" className="registerbtn" value="Valider"/>
            </form>
        );
    }

}

export default InformationForm;