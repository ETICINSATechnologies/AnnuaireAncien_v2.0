import React, {Component} from 'react';
import './ProfileForm.css';
import Auth from "../Auth/Auth";

class ProfileForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            function: props.function,
            modifyEnabled: false,
            info: {
                firstName: '',
                lastName: '',
                email: '',
                telephone: '',
                department: '',
                company: ''
            }
        };
        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        event.persist();
        if (this.state.modifyEnabled && this.state.info.hasOwnProperty(event.target.className)) {
            this.setState(prevState => ({
                info: {
                    ...prevState.info,
                    [event.target.className]: event.target.value
                }
            }))
        }
        this.rerender();
    }



    rerender() {
        /*appeler un setState pour forcer un re-render*/
        this.setState({
            modifyEnabled: this.state.modifyEnabled,
        })
    }

    modifyProfile() {
        let data;
        data = {
            username: this.props.info.username,
            firstName: this.state.info.firstName,
            lastName: this.state.info.lastName,
            genderId: this.props.info.gender.id,
            email: this.state.info.email,
            birthday: this.props.info.birthday,
            telephone: this.state.info.telephone,
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

        //get positions
        let i;
        let positionIds=[];
        for (i=0; i<this.props.info.positions.length; i++) {
            positionIds[i]=this.props.info.positions[i].id;
        }
        data.positionIds=positionIds;

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

                    }
                    else {
                        res.json()
                            .then(result => {
                                this.setState({
                                    info: result
                                });
                            })
                    }
                this.props.function(); //recharger props
                });
        //disable modifications
        if (this.state.modifyEnabled) this.modifyEnable();
    }

    modifyEnable() {
        this.setState({
            modifyEnabled: !this.state.modifyEnabled,
        });
    }


    componentDidUpdate(prevProps) {
        if (this.props.info !== prevProps.info) {
            this.setState({
                info: this.props.info,
            });
        }
    }

    render() {
        return (
            <form className="ProfileForm">
                <div className="info_area">
                    <p>Appuyer sur Modifier pour modifier le profil</p>
                </div>
                <div className="image"> </div>
                <p> Téléphone </p>
                <input type="text" className="telephone" value={this.state.info.telephone} onChange={this.onChange}/>
                <p className="needed"> Nom </p>
                <input type="text" className="lastName" value={this.state.info.lastName} onChange={this.onChange}/>
                <p> Département </p>
                <input type="text" className="department.label" value={this.state.info.department.label} onChange={this.onChange}/>
                <p className="p_info needed"> Prénom </p>
                <input type="text" className="firstName" value={this.state.info.firstName} onChange={this.onChange}/>
                <p className="needed"> Adresse mail </p>
                <input type="text" className="email" value={this.state.info.email} onChange={this.onChange}/>
                <p> Travaille chez </p>
                <input type="text" className="company" value={this.state.info.company} onChange={this.onChange}/>
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
