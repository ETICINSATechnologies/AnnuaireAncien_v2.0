import React, {Component} from 'react';
import './ProfileForm.css';
import Auth from "../Auth/Auth";

class ProfileForm extends Component {
    constructor(props) {
        super(props);
        const propertiesName = {
            firstName: '',
            lastName: '',
            email: '',
            telephone: '',
            department: '',
            company: ''
        };
        this.state = {
            function: props.function,
            propertiesName: propertiesName,
            modifyEnabled: false,
            modified: false
        };
        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        if (this.state.modifyEnabled && this.newInfo.hasOwnProperty(event.target.className)) {
            this.newInfo[event.target.className]= event.target.value;
        }
        /*il faut appeler un setState pour forcer un re-render*/
        this.setState({
            modifyEnabled: this.state.modifyEnabled,
        })
    }


    getMemberInfo(propertiesName) {
        let newInfo = {};
        Object.keys(propertiesName).forEach((propertyName) => {
            if (this.props.info.hasOwnProperty(propertyName)) {
                newInfo[propertyName] = this.props.info[propertyName];
            } else {
                newInfo[propertyName] = '';
            }
        });

        return newInfo;
    }

    update(){
            fetch('api/v1/core/member/'+this.props.info.id, {
                headers: {
                    Authorization: Auth.getToken()
                }
            })
                .then(res => res.json())
                .then((result) => {
                    this.newInfo=result;
                });
    }

    modifyProfile() {
        let data;
        data = {
            username: this.props.info.username,
            firstName: this.newInfo.firstName,
            lastName: this.newInfo.lastName,
            genderId: this.props.info.gender.id,
            email: this.newInfo.email,
            birthday: this.props.info.birthday,
            telephone: this.newInfo.telephone,
            schoolYear: this.props.schoolYear,
            departmentId: 1, //need to change this to be editable
            address: {
                line1:  this.props.info.address.line1,
                line2:  this.props.info.address.line2,
                city: this.props.info.address.city ,
                postalCode: this.props.info.address.postalCode,
                countryId:this.props.info.address.country.id,
            }
        };
        data.positionIds=[1,3];


        fetch('api/v1/core/member/'+this.props.info.id, {
            method: 'PUT',
            headers: {
                'Authorization': Auth.getToken(),
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(data)
        })
            .then(res => {
                    if (res.status !== 200) {
                        this.update(); //remettre newInfo aux valeurs anciens
                    }
                    else {
                        res.json()
                            .then(result => {
                                this.newInfo=result;
                            })
                    }
                });
        this.setState({
            modified: true
        });
        //disable modifications
        if (this.state.modifyEnabled) this.modifyEnable();
    }

    modifyEnable() {
        this.setState({
            modifyEnabled: !this.state.modifyEnabled,
        });
    }

    renderSource(){
        if (this.state.modifyEnabled) {
        } else {
            if (!this.state.modified) this.newInfo=this.getMemberInfo(this.state.propertiesName);
        }
    }

    render() {
        this.renderSource();
        return (
            <form className="ProfileForm">
                <div className="info_area">
                    <p>Appuyer sur Sauvegarder pour enregistrer les modifications</p>
                </div>
                <div className="image"> </div>
                <p> Téléphone </p>
                <p className="right needed"> Nom </p>
                <input type="text" className="telephone" value={this.newInfo.telephone} onChange={this.onChange}/>
                <input type="text" className="lastName" value={this.newInfo.lastName} onChange={this.onChange}/>
                <p> Département </p>
                <p className="right p_info needed"> Prénom </p>
                <input type="text" className="department" value={this.newInfo.department.label} onChange={this.onChange}/>
                <input type="text" className="firstName" value={this.newInfo.firstName} onChange={this.onChange}/>
                <p className="needed"> Adresse mail </p>
                <p> Travaille chez </p>
                <input type="text" className="email" value={this.newInfo.email} onChange={this.onChange}/>
                <input type="text" className="company" value={this.newInfo.company} onChange={this.onChange}/>
                <div className="div_button">
                    <input className="input_button password" type="button" value="Changer mot de passe"/>
                </div>
                <div className="div_button">
                    <input className="input_button update" type="button" value="Sauvegarder" onClick={() => this.modifyProfile()}/>
                </div>
                <div className="div_button">
                    <input className="input_button enable_edit" type="button" value={this.state.modifyEnabled ? 'Réinitialiser' : 'Modifier'} onClick={() => this.modifyEnable()}/>
                </div>
            </form>
        );
    }
}

export default ProfileForm;
