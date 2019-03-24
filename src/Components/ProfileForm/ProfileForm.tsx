import React, {Component} from 'react';
import './ProfileForm.css';
import Auth from "../Auth/Auth";
import modifyIcon from "../../Images/edit.png";
import cancelIcon from "../../Images/cancel_icon.png";
import noPhotoIcon from "../../Images/no_photo.png";
import {Mdp} from "../../Model/Mdp";
import {Member} from "../../Model/Member";
import {Department} from "../../Model/Department";
import {Link} from "react-router-dom";
import Modal from "../Modal/Modal";
import {ChangePhoto} from "../../Model/ChangePhoto";


interface ProfileFormProps {
    member: Member
    modifyEnabled: boolean
    update: boolean
    updateSucceed: boolean

    resetFields(): void

    modifyMember(member: Member): void

    updateMember(): void

    updateMemberPassword(pass : string): void

    enableModification(): void
}

interface ProfileFormState {
    departments: Department[]
    idMapping: object
    changePhoto : ChangePhoto
    mdp: Mdp
}


export class ProfileForm extends Component<ProfileFormProps, ProfileFormState> {
    state = {
        departments: [],
        idMapping: [],
        
        changePhoto:{
            changePhotoState:'',
            show: false,
        },

        mdp: {
            show: false,
            mdpancien: '',
            mdpnouveau: '',
            mdpnouveau2: '',
            mdpstate: 'Compléter les champs et appuyer sur valider',
            mdpstatetype: 'neutral',
        },
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

    onChangeMdp = (event: React.ChangeEvent) => {
        event.persist();
        this.setState(({
            mdp: {
                ...this.state.mdp,
                [event.target.className]: (event.target as any).value
            }
        }));
    };


    updateMdp = () => {
        // check if new pass is at least 8 char
        if (this.state.mdp.mdpnouveau.length<8){
            this.setState({
                mdp: {
                    ...this.state.mdp,
                    mdpstate: 'Ce mot de passe est trop court',
                    mdpstatetype: 'error'
                }
            });
            return 0;
        }


        // check if two new passwords match
        if (this.state.mdp.mdpnouveau!==this.state.mdp.mdpnouveau2) {
            this.setState({
                mdp: {
                    ...this.state.mdp,
                    mdpstate: 'Les mots de passe ne corrrespondent pas',
                    mdpstatetype: 'error'
                }
            });
            return 0;
        }

        // make username + mdp pair
        let pair = {
            username : this.props.member.username,
            password : this.state.mdp.mdpancien
        };

        // check old pass
        fetch('api/v1/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pair)
        })
            .then(res => {
                if (res.status === 200) {
                    this.props.updateMemberPassword(this.state.mdp.mdpnouveau);
                    this.setState({
                        mdp: {
                            ...this.state.mdp,
                            mdpstate: 'Le mot de passe a bien été modifié',
                            mdpstatetype: 'success'
                        }
                    });
                }
                else {
                    this.setState({
                        mdp: {
                            ...this.state.mdp,
                            mdpstate: "L'ancien mot de passe n'est pas valide",
                            mdpstatetype: 'error'
                        }
                    });
                    return 0;
                }
            })



    };


    showModalChangePassword = () => {
        this.setState({
            ...this.state,
            // show: !this.state.show,
            mdp: {
                ...this.state.mdp,
                show: !this.state.mdp.show,
                mdpstate:'Compléter les champs et appuyer sur valider',
                mdpstatetype: 'neutral'
            }
        })
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

    showModalChangePhoto = () => {
        this.setState(
            {
                ...this.state,
                changePhoto: {
                    changePhotoState:'Pas de fichier sélectionné.',
                    show:!this.state.changePhoto.show,

                }
            }
        )
    };

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
                    <img className="profilePicture"
                         src={noPhotoIcon}
                         alt="Profile"
                         onClick={() => this.showModalChangePhoto()} />
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
                                <input type="button" className="input_button password" value="Changer mot de passe"
                                        onClick={() => this.showModalChangePassword()}/>
                                <input type="button" className="input_button update" value="Sauvegarder"
                                        onClick={() => this.props.updateMember()}/>
                            </React.Fragment>
                    }
                </div>
                <div className="modal" >
                    <Modal show={this.state.mdp.show} onClose={this.showModalChangePassword}>
                        <div className="content" >
                            <p className={"message " + this.state.mdp.mdpstatetype}> {this.state.mdp.mdpstate} </p>
                            <p> Ancien mot de passe </p>
                            <input type="password" name="password" className="mdpancien" onChange={this.onChangeMdp.bind(this)}/>
                            <p> Nouveau mot de passe </p>
                            <input type="password" name="password"  className="mdpnouveau" onChange={this.onChangeMdp.bind(this)}/>
                            <p> Nouveau mot de passe </p>
                            <input type="password" name="password"  className="mdpnouveau2" onChange={this.onChangeMdp.bind(this)}/>
                            <Link to="/recovery"> Mot de passe oublié ?</Link>
                            <input type="button" className="input_button" value="Valider" onClick={this.updateMdp.bind(this)}/>
                        </div>
                    </Modal>
                </div>

                <div className="modalChangePhoto" >
                    <Modal show={this.state.changePhoto.show} onClose={this.showModalChangePhoto}>
                        <div className="content" >
                            <input value="null" type="file" className="inputPhoto" accept="image/jpeg, image/png"/>
                            <div className="button_container_changePhoto">
                                <button className = "btn_Annuler">Annuler</button>
                                <button className = "btn_Valider">Valider</button>
                            </div>
                        </div>
                    </Modal>
                </div>
            </form>
        );
    }

}

export default ProfileForm;