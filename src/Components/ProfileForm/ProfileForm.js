import React, {Component} from 'react';
import './ProfileForm.css';
import Auth from "../Auth/Auth";
import Modal from '../Modal/Modal';
import modifyIcon from "../../Images/edit.png";
import cancelIcon from "../../Images/cancel_icon.png";
import noPhotoIcon from "../../Images/no_photo.png";

class ProfileForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modifyEnabled: false,
            departments: [],
            show: false,
            mdp: {
                mdpancien: '',
                mdpnouveau: '',
                mdpnouveau2: '',
                mdpstate: 'Compléter les champs et appuyer sur valider',
            },
            info: {
                firstName: '',
                lastName: '',
                email: '',
                telephone: '',
                department: {
                    id: 0,
                    label: '',
                    name: '',
                },
                company: '',
            }
        };
        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        event.persist();
        if (this.state.info.hasOwnProperty(event.target.className)) {
            if (event.target.className === 'department') {
                this.setState(({
                    info: {
                        ...this.state.info,
                        department: {
                            ...this.state.info.department,
                            id: parseInt(event.target.value, 10)
                        }
                    }
                }));
            }
            else {
                this.setState(({
                    info: {
                        ...this.state.info,
                        [event.target.className]: event.target.value
                    }
                }));
            }
        }
    }

    onChangeMdp(event) {
        event.persist();
        this.setState(({
            mdp: {
                ...this.state.mdp,
                [event.target.className]: event.target.value
            }
        }));
    }

    showModal = () => {
        this.setState({
            ...this.state,
            show: !this.state.show,
            mdp: {
                mdpstate:'Compléter les champs et appuyer sur valider',
            }
        })
    };

    modifyProfile() {
        let data;
        data = {
            ...this.state.info,
            genderId: this.props.info.gender.id,
            address: {
                ...this.state.info.address,
                countryId: this.props.info.address.country.id
            }

        };

        if (this.state.info.department === null) {
            data.departmentId = null;
        }
        else {
            data.departmentId = this.state.info.department.id;
        }

        this.props.update(data);
    }

    modifyEnable() { //does both enable and disable
        this.props.setModify(!this.state.modifyEnabled);
    }

    componentDidUpdate(prevProps) {
        if (this.props.info !== prevProps.info || this.props.modifyEnabled !== prevProps.modifyEnabled) {
            this.setState({
                info: this.props.info,
                modifyEnabled: this.props.modifyEnabled,
            });
        }
    }

    componentDidMount() {
        fetch('api/v1/core/department', {
            headers: {
                Authorization: Auth.getToken()
            }
        })
            .then(res => res.json())
            .then((result) => {
                this.setState({departments: result});
            })
    }

    updateMdp() {
        // check if new pass is at least 8 char
        if (this.state.mdp.mdpnouveau.length<8){
            this.setState({
                mdp: {
                    ...this.state.mdp,
                    mdpstate: 'Ce mot de passe est trop court'
                }
            });
            return 0;
        }


        // check if two new passwords match
        if (this.state.mdp.mdpnouveau!==this.state.mdp.mdpnouveau2) {
            this.setState({
                mdp: {
                    ...this.state.mdp,
                    mdpstate: 'Les mots de passe ne corrrespondent pas'
                }
            });
            return 0;
        }

        // make username + mdp pair
        let pair = {
            username : this.props.info.username,
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
                    let data;
                    data = {
                        ...this.props.info,
                        genderId: this.props.info.gender.id,
                        address: {
                            ...this.props.info.address,
                            countryId: this.props.info.address.country.id
                        },
                        password: this.state.mdp.mdpnouveau,
                    };

                    if (this.props.info.department === null) {
                        data.departmentId = null;
                    }
                    else {
                        data.departmentId = this.props.info.department.id;
                    }
                    this.props.resetFields();
                    this.props.update(data);
                    this.setState({
                        mdp: {
                            ...this.state.mdp,
                            mdpstate: 'Le mot de passe a bien été modifié'
                        }
                    });
                }
                else {
                    this.setState({
                        mdp: {
                            ...this.state.mdp,
                            mdpstate: 'L\'ancien mot de passe n\'est pas valide'
                        }
                    });
                    return 0;
                }
            })



    }

    renderDepartments() {
        let departmentDropDown = null;
        if (typeof(this.state.departments) === 'undefined' || this.state.departments === []){
        } else {
            departmentDropDown = this.state.departments.map((department, index) => {
                return <option key={index} value={department.id}>{department.label}</option>
            });
        }
        return (
            <select className="department"
                    value={this.state.info.department === null || typeof(this.state.info.department) === 'undefined' ?
                        0 :
                        this.state.info.department.id}
                    onChange={this.onChange}
                    disabled={!this.state.modifyEnabled}>
                <option value={0}> Choisir un departement</option>
                {departmentDropDown}
            </select>
        )
    }

    render() {
        return (
            <form className="ProfileForm">
                <div className="header_container">
                    <h1>
                        {
                            this.state.modifyEnabled ?
                                "Appuyer sur la croix pour annuler" :
                                "Appuyer sur le crayon pour modifier"
                        }
                    </h1>
                    <img className="image" src={noPhotoIcon} alt="Profile"/>
                    <img className="modifier"
                         src={this.state.modifyEnabled ? cancelIcon : modifyIcon}
                         onClick={() => {
                             this.state.modifyEnabled ? this.props.resetFields() : this.modifyEnable()
                         }} alt="Modifier/Annuler"
                    />
                </div>
                <div className="field_container">
                    <p> Téléphone </p>
                    <p className="right needed"> Nom </p>
                    <input disabled={!this.state.modifyEnabled} type="text" className="telephone"
                           value={this.state.info.telephone} onChange={this.onChange}/>
                    <input disabled={!this.state.modifyEnabled} type="text" className="lastName"
                           value={this.state.info.lastName} onChange={this.onChange}/>
                    <p> Département </p>
                    <p className="right p_info needed"> Prénom </p>
                    {this.renderDepartments()}
                    <input disabled={!this.state.modifyEnabled} type="text" className="firstName"
                           value={this.state.info.firstName} onChange={this.onChange}/>
                    <p className="needed"> Adresse mail </p>
                    <p> Travaille chez </p>
                    <input disabled={!this.state.modifyEnabled} type="text" className="email"
                           value={this.state.info.email} onChange={this.onChange}/>
                    <input disabled={!this.state.modifyEnabled} type="text" className="company"
                           value={this.state.info.company || ''} onChange={this.onChange}/>
                </div>
                <div className="button_container">
                    {
                        this.state.modifyEnabled ?
                            <React.Fragment>
                                <Button className="input_button password" value="Changer mot de passe"
                                        onClick={this.showModal}/>
                                <Button className="input_button update" value="Sauvegarder"
                                        onClick={() => this.modifyProfile()}/>
                            </React.Fragment> :
                            null
                    }
                </div>
                <div className="modal" >
                    <Modal show={this.state.show} onClose={this.showModal}>
                        <div className="content" >
                            <p> Ancien mot de passe </p>
                            <input type="password" name="password" className="mdpancien" onChange={this.onChangeMdp.bind(this)}/>
                            <p> Nouveau mot de passe </p>
                            <input type="password" name="password"  className="mdpnouveau" onChange={this.onChangeMdp.bind(this)}/>
                            <p> Nouveau mot de passe </p>
                            <input type="password" name="password"  className="mdpnouveau2" onChange={this.onChangeMdp.bind(this)}/>
                            <p className="message"> {this.state.mdp.mdpstate} </p>
                            <Button className="input_button" value="Valider" onClick={this.updateMdp.bind(this)}/>
                        </div>
                    </Modal>
                </div>
            </form>
        );
    }
}

function Button(props) {
    return (
        <input className={props.className} type="button" value={props.value} onClick={props.onClick}/>
    );
}

export default ProfileForm;
