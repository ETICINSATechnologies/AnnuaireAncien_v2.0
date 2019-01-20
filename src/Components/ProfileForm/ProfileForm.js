import React, {Component} from 'react';
import './ProfileForm.css';
import Auth from "../Auth/Auth";
import MenuDrop from "../MenuDrop/MenuDrop"

class ProfileForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            function: props.function,
            modifyEnabled: false,
            departments:{},
            departmentnames:[],
            departmentids:[],
            info: {
                firstName: '',
                lastName: '',
                email: '',
                telephone: '',
                department: {
                    id:'',
                    label:'',
                    name:'',
                },
                company: ''
            }
        };
        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        event.persist();
        if (this.state.modifyEnabled && this.state.info.hasOwnProperty(event.target.className)) {
            this.setState(({
                info: {
                    ...this.state.info,
                    [event.target.className]: event.target.value
                }
            }))
        }
    }

    updateDepartment(newDeptId) {
        this.setState(({
            info: {
                ...this.state.info,
                department: this.state.departments[newDeptId-1]
            }
        }));
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
            departmentId: this.state.info.department.id,
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

    modifyEnable() { //does both enable and disable
        this.setState({
            modifyEnabled: !this.state.modifyEnabled,
        });
    }

    resetFields() {
        this.setState({
            info: this.props.info,
        });
        //disable modifications
        if (this.state.modifyEnabled) this.modifyEnable();
    }

    componentDidUpdate(prevProps) {
        if (this.props.info !== prevProps.info) {
            this.setState({
                info: this.props.info,
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
                this.fillDepartments(result);
            })
    }

    fillDepartments(deps) {

        this.setState({departments: deps});

        let i;
        let deptNames=[];
        let deptIds=[];

        for (i=0; i<this.state.departments.length; i++) {
            deptNames[i]=this.state.departments[i].name;
            deptIds[i]=this.state.departments[i].id;
        }
        console.log('i was called');
        this.setState({
            departmentnames: deptNames,
            departmentids:deptIds,

        });
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
                <MenuDrop modifyEnabled={this.state.modifyEnabled} optionnames={this.state.departmentnames} optionids={this.state.departmentids} length={this.state.departments.length} currentoption={this.state.info.department.name} function={this.updateDepartment.bind(this)}/>
                <p className="p_info needed"> Prénom </p>
                <input type="text" className="firstName" value={this.state.info.firstName} onChange={this.onChange}/>
                <p className="needed"> Adresse mail </p>
                <input type="text" className="email" value={this.state.info.email} onChange={this.onChange}/>
                <p> Travaille chez </p>
                <input type="text" className="company" value='-' onChange={this.onChange}/>
                <div className="div_button">
                    { this.state.modifyEnabled ? <Button className="input_button password" value="Changer mot de passe"  /> : null }
                </div>
                <div className="div_button">
                    { this.state.modifyEnabled ? <Button className="input_button update" value="Sauvegarder" onClick={() => this.modifyProfile()} /> : null }
                </div>
                <div className="div_button">
                    { this.state.modifyEnabled ? <Button className="input_button enable_edit" value="Annuler" onClick={() => this.resetFields()} /> : <Button className="input_button enable_edit" value="Modifier" onClick={() => this.modifyEnable()} /> }
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
