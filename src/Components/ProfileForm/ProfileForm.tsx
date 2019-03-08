import React, {Component} from 'react';
import './ProfileForm.css';
import Auth from "../Auth/Auth";
import modifyIcon from "../../Images/edit.png";
import cancelIcon from "../../Images/cancel_icon.png";
import noPhotoIcon from "../../Images/no_photo.png";
import {Member} from "../../Model/Member";
import {Department} from "../../Model/Department";


interface ProfileFormProps {
    member: Member
    modifyEnabled: boolean
    update: boolean
    updateSucceed: boolean

    modifyMember(member: Member): void

    updateMember(): void

    enableModification(): void
}

interface ProfileFormState {
    departments: Department[]
    idMapping: object
}


export class ProfileForm extends Component<ProfileFormProps, ProfileFormState> {
    state = {
        departments: [],
        idMapping: []
    };

    componentDidMount() {
        fetch('api/v1/core/department', {
            headers: {
                Authorization: Auth.getToken()
            }
        })
            .then(res => res.json())
            .then((result) => {
                this.setState({
                    departments: result,
                    idMapping: result.reduce((currentMapping: object, department: Department, index: number) => {
                        return {
                            ...currentMapping,
                            [department.id]: index
                        }
                    }, {})
                });
            })
    }

    onChange = (event: React.ChangeEvent) => {
        event.persist();
        let property = event.target.className;
        let value = (event.target as any).value;
        let member = new Member(this.props.member);

        if (member.hasOwnProperty(property)) {
            if (property === "department")
                value = this.state.departments[this.getDepartmentIndexById(value)];

            member[property] = value;
        }

        this.props.modifyMember(member);
    };

    getDepartmentIndexById(id: number): number {
        return this.state.idMapping[id];
    }

    renderDepartments() {
        if (this.state.departments) {
            let departmentDropDown = this.state.departments.map((department: any, index: any) => {
                return <option key={index} value={department.id}>{department.label}</option>
            });

            return (
                <select className="department" value=
                    {!this.props.member.department ? 0 :
                        this.props.member.department.id}
                        onChange={this.onChange}
                        disabled={!this.props.modifyEnabled}>
                    <option value={0}> Choisir un departement</option>
                    {departmentDropDown}
                </select>
            )
        }
    }

    render() {
        return (
            <form className="ProfileForm">
                <div className="header_container">
                    {
                        this.props.update ?
                            this.props.updateSucceed ?
                                <h1>Les modifications ont bien été enregistrées</h1> :
                                <h1 className='error_info'>Une erreur est survenue lors de la sauvegarde</h1> :
                            this.props.modifyEnabled ?
                                <h1>Appuyer sur la croix pour annuler</h1> :
                                <h1>Appuyer sur le crayon pour modifier</h1>
                    }
                    <img className="profilePicture" src={noPhotoIcon} alt="Profile"/>
                    <img className="deleteCancelPicture"
                         src={this.props.modifyEnabled ? cancelIcon : modifyIcon}
                         onClick={() => this.props.enableModification()} alt="Modifier/Annuler"/>
                </div>
                <div className="field_container">
                    <p> Téléphone </p>
                    <p className="right needed"> Nom </p>
                    <input disabled={!this.props.modifyEnabled} type="text" className="telephone"
                           value={this.props.member.telephone} onChange={this.onChange}/>
                    <input disabled={!this.props.modifyEnabled} type="text" className="lastName"
                           value={this.props.member.lastName} onChange={this.onChange}/>
                    <p> Département </p>
                    <p className="right p_info needed"> Prénom </p>
                    {this.renderDepartments()}
                    <input disabled={!this.props.modifyEnabled} type="text" className="firstName"
                           value={this.props.member.firstName} onChange={this.onChange}/>
                    <p className="needed"> Adresse mail </p>
                    <p> Travaille chez </p>
                    <input disabled={!this.props.modifyEnabled} type="text" className="email"
                           value={this.props.member.email} onChange={this.onChange}/>
                    <input disabled={!this.props.modifyEnabled} type="text" className="company"
                           value={this.props.member.company} onChange={this.onChange}/>
                </div>
                <div className="button_container">
                    {
                        !this.props.modifyEnabled ? null :
                            <React.Fragment>
                                <input type="button" className="input_button password" value="Changer mot de passe"/>
                                <input type="button" className="input_button update" value="Sauvegarder"
                                       onClick={() => this.props.updateMember()}/>
                            </React.Fragment>
                    }
                </div>
            </form>
        );
    }
}

export default ProfileForm;