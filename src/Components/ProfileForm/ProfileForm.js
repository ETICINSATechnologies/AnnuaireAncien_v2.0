import React, {Component} from 'react';
import './ProfileForm.css';
import Auth from "../Auth/Auth";
import modifyIcon from "../../images/edit.png";
import cancelIcon from "../../images/cancel_icon.png";
import noPhotoIcon from "../../images/no_photo.png";

class ProfileForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modifyEnabled: false,
            departments:[],
            info: {
                firstName: '',
                lastName: '',
                email: '',
                telephone: '',
                department: {
                    id:0,
                    label:'',
                    name:'',
                },
                company: '',
            }
        };
        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        event.persist();
        if (this.state.info.hasOwnProperty(event.target.className)) {
            if (event.target.className==='department'){
                this.setState(({
                    info: {
                        ...this.state.info,
                        department:{
                            ...this.state.info.department,
                            id: parseInt(event.target.value,10)
                        }
                    }
                }));
            } else {
                this.setState(({
                    info: {
                        ...this.state.info,
                        [event.target.className]: event.target.value
                    }
                }))
            }
        }
    }

    modifyProfile() {
        let data;
        data = {
            ...this.state.info,
            genderId: this.props.info.gender.id,
            departmentId: this.state.info.department.id,
            address: {
                ...this.state.info.address,
                countryId:this.props.info.address.country.id
            }

        };
        this.props.update(data);
    }

    modifyEnable() { //does both enable and disable
        this.props.setModify(!this.state.modifyEnabled);
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
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

    renderDepartments(){
        let departmentDropDown = this.state.departments.map((department,index) => {
            return <option key={index} value={department.id}>{department.label}</option>
        });
        return(
            <select className="department" value={this.state.info.department === null ? 0:this.state.info.department.id} onChange={this.onChange} disabled={!this.state.modifyEnabled} >
                <option value={0}>Choisir un departement</option>
                {departmentDropDown}
            </select>
        )
    }

    render() {
        return (
            <form className="ProfileForm">
                <div className="header_container">
                    <h1>Appuyer sur Modifier pour modifier le profil</h1>
                    <img className="image" src={noPhotoIcon} alt="Profile"/>
                    <img className="modifier" src={this.state.modifyEnabled ? cancelIcon:modifyIcon} onClick={() => {this.state.modifyEnabled ? this.props.resetFields(): this.modifyEnable()}} alt="Modifier/Annuler"/>
                </div>
                <div className="field_container">
                    <p> Téléphone </p>
                    <p className="right needed"> Nom </p>
                    <input disabled={!this.state.modifyEnabled} type="text" className="telephone" value={this.state.info.telephone} onChange={this.onChange}/>
                    <input disabled={!this.state.modifyEnabled} type="text" className="lastName" value={this.state.info.lastName} onChange={this.onChange}/>
                    <p> Département </p>
                    <p className="right p_info needed"> Prénom </p>
                    {this.renderDepartments()}
                    <input disabled={!this.state.modifyEnabled} type="text" className="firstName" value={this.state.info.firstName} onChange={this.onChange}/>
                    <p className="needed"> Adresse mail </p>
                    <p> Travaille chez </p>
                    <input disabled={!this.state.modifyEnabled} type="text" className="email" value={this.state.info.email} onChange={this.onChange}/>
                    <input disabled={!this.state.modifyEnabled} type="text" className="company" value='-' onChange={this.onChange}/>
                </div>
                <div className="button_container">
                    <div className="div_button">
                        { this.state.modifyEnabled ? <Button className="input_button password" value="Changer mot de passe"  /> : null }
                    </div>
                    <div className="div_button">
                        { this.state.modifyEnabled ? <Button className="input_button update" value="Sauvegarder" onClick={() => this.modifyProfile()} /> : null }
                    </div>
                </div>

            </form>
        );
    }
}

function Button(props) {
    return (
        <input className={props.className} type="button" value={props.value} onClick= {props.onClick}/>
    );
}

export default ProfileForm;
