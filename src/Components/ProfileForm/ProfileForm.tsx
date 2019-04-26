import React, {Component} from 'react';
import './ProfileForm.css';
import Auth from "../Auth/Auth";
import modifyIcon from "../../Images/edit.png";
import cancelIcon from "../../Images/cancel_icon.png";
import manIcon from "../../Images/default_man.svg";
import womanIcon from "../../Images/default_woman.svg";
import {Mdp} from "../../Model/Mdp";
import {Member} from "../../Model/Member";
import {Link} from "react-router-dom";
import Modal from "../Modal/Modal";
import DropDown from "../DropDown/DropDown";
import ProfilePicture from "../ProfilePicture/ProfilePicture";


interface ProfileFormProps {
    member: Member
    modifyEnabled: boolean
    update: boolean
    updateSucceed: boolean

    resetFields(): void

    modifyMember(member: Member): void

    updateMember(): void

    updateMemberPassword(pass: string): void

    enableModification(): void
}

interface ProfileFormState {
    idMapping: object
    show: boolean
    editImageShow: boolean
    mdp: Mdp
    img: any
    downloadedImg: boolean
}

const genders = [
    {id: 1, label: 'Autre'}, {id: 2, label: 'M'}, {id: 3, label: 'F'}
];


export class ProfileForm extends Component<ProfileFormProps, ProfileFormState> {
    state = {
        idMapping: [],
        show: false,
        editImageShow: false,
        mdp: {
            mdpancien: '',
            mdpnouveau: '',
            mdpnouveau2: '',
            mdpstate: 'Compléter les champs et appuyer sur valider',
            mdpstatetype: 'neutral',
        },
        downloadedImg: false,
        img: womanIcon
    };

    getMemberImage = () => {
        fetch('member/me/image', {
            headers: {
                'Authorization': Auth.getToken(),
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (res.status === 200) {
                    res.blob()
                        .then(image => {
                            this.setState({
                                img: URL.createObjectURL(image),
                                downloadedImg: true
                            })
                        })
                } else {
                    this.setState({downloadedImg: false});
                }
                this.updateImage();
            })
    };

    componentDidMount() {
        this.getMemberImage()
    }

    updateImage = (member?: Member) => {
        if (!member) member = this.props.member;
        if (!this.state.downloadedImg && member) {
            if (member['gender'] === 'F')
                this.setState({img: womanIcon});
            else
                this.setState({img: manIcon});
        }
    };

    onChange = (event: React.ChangeEvent) => {
        event.persist();
        let property = event.target.className;
        let value = (event.target as any).value;
        let member = new Member(this.props.member);

        if (member.hasOwnProperty(property)) {
            property === 'gender' ?
                member[property] = this.getGenderLabel(value) : member[property] = value;
        }
        this.updateImage(member);

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
        if (this.state.mdp.mdpnouveau.length < 8) {
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
        if (this.state.mdp.mdpnouveau !== this.state.mdp.mdpnouveau2) {
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
            username: this.props.member.username,
            password: this.state.mdp.mdpancien
        };

        // check old pass
        fetch('login', {
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

    showModal = () => {
        this.setState({
            ...this.state,
            show: !this.state.show,
            mdp: {
                ...this.state.mdp,
                mdpstate: 'Compléter les champs et appuyer sur valider',
                mdpstatetype: 'neutral'
            }
        })
    };

    getGenderId(gender: string): number {
        switch (gender) {
            case 'M':
                return 2;
            case 'F':
                return 3;
            default:
                return 1;
        }
    }

    getGenderLabel(id: string): string {
        switch (id) {
            case '2':
                return 'M';
            case '3':
                return 'F';
            default:
                return 'Autre';
        }
    }

    displayEditImage = (display: boolean) => {
        if (!display)
            this.getMemberImage();
        this.setState({
            editImageShow: display
        })
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
                    <img className="profilePicture" src={this.state.img} alt="Profile"
                         onClick={() => this.displayEditImage(true)}/>
                    <ProfilePicture show={this.state.editImageShow} onClose={this.displayEditImage}/>
                    <img className="deleteCancelPicture"
                         src={this.props.modifyEnabled ? cancelIcon : modifyIcon}
                         onClick={() => this.props.enableModification()} alt="Modifier/Annuler"/>
                </div>
                <div className="field_container">
                    <div className="name_label_container">
                        <p className="needed"> Genre </p>
                        <p className="needed"> Prénom </p>
                        <p className="needed"> Nom </p>
                    </div>
                    <div className="name_field_container">
                        <DropDown className='gender' onChange={this.onChange} modifyEnabled={this.props.modifyEnabled}
                                  options={genders} currentOption={this.getGenderId(this.props.member.gender)}/>
                        <input disabled={!this.props.modifyEnabled} type="text" className="firstName"
                               value={this.props.member.firstName} onChange={this.onChange}/>
                        <input disabled={!this.props.modifyEnabled} type="text" className="lastName"
                               value={this.props.member.lastName} onChange={this.onChange}/>
                    </div>
                    <p> Téléphone </p>
                    <p className="needed"> Adresse mail </p>
                    <input disabled={!this.props.modifyEnabled} type="text" className="telephone"
                           value={this.props.member.telephone} onChange={this.onChange}/>
                    <input disabled={!this.props.modifyEnabled} type="text" className="email"
                           value={this.props.member.email} onChange={this.onChange}/>
                    <p className="needed"> Année de sortie </p>
                    <p className="needed"> Date de naissance </p>
                    <input disabled={!this.props.modifyEnabled} type="text" className="gradeYear"
                           value={this.props.member.gradeYear} onChange={this.onChange}/>
                    <input type="date" disabled={!this.props.modifyEnabled} className="birthday"
                           value={this.props.member.birthday} onChange={this.onChange}/>
                    <p className="needed"> LinkedIn </p>
                    <p className="needed"> Facebook </p>
                    <input disabled={!this.props.modifyEnabled} type="text" className="linkedin"
                           value={this.props.member.linkedin} onChange={this.onChange}/>
                    <input disabled={!this.props.modifyEnabled} type="text" className="facebook"
                           value={this.props.member.facebook} onChange={this.onChange}/>
                </div>
                <div className="button_container">
                    {
                        !this.props.modifyEnabled ? null :
                            <React.Fragment>
                                <input type="button" className="input_button password" value="Changer mot de passe"
                                       onClick={() => this.showModal()}/>
                                <input type="button" className="input_button update" value="Sauvegarder"
                                       onClick={() => this.props.updateMember()}/>
                            </React.Fragment>
                    }
                </div>
                <div className="modal">
                    <Modal show={this.state.show} onClose={this.showModal}>
                        <div className="content">
                            <p className={"message " + this.state.mdp.mdpstatetype}> {this.state.mdp.mdpstate} </p>
                            <p> Ancien mot de passe </p>
                            <input type="password" name="password" className="mdpancien"
                                   onChange={this.onChangeMdp.bind(this)}/>
                            <p> Nouveau mot de passe </p>
                            <input type="password" name="password" className="mdpnouveau"
                                   onChange={this.onChangeMdp.bind(this)}/>
                            <p> Nouveau mot de passe </p>
                            <input type="password" name="password" className="mdpnouveau2"
                                   onChange={this.onChangeMdp.bind(this)}/>
                            <Link to="/recovery"> Mot de passe oublié ?</Link>
                            <input type="button" className="input_button" value="Valider"
                                   onClick={this.updateMdp.bind(this)}/>
                        </div>
                    </Modal>
                </div>
            </form>
        );
    }

}

export default ProfileForm;