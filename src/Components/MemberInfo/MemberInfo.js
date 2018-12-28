import React, {Component} from 'react';
import './MemberInfo.css';

import defaultImage from '../../images/no_photo.png'
import edit from '../../images/edit.png'

class MemberInfo extends Component {
    constructor(props) {
        super(props);
        this.propertiesName = {
            firstName: null,
            lastName: null,
            telephone: null,
            email: 'email',
            company: 'travaille chez',
            year: 'dernière année à ETIC',
            position: 'dernier poste à ETIC',
            department: 'département'
        };
        this.state = {
            edit: false,
            isCAMember: false,
            properties: null,
        };
    }

    getNewProperty() {
        let newProperties = {};
        Object.keys(this.propertiesName).forEach((property) => {
            if (this.props.info.hasOwnProperty(property)) {
                if (property === 'department')
                    newProperties[property] = this.props.info[property].name;
                else
                    newProperties[property] = this.props.info[property];
            }
        });
        if (this.props.info['positions']) {
            newProperties['position'] = this.props.info['positions'][0].label;
            newProperties['year'] = '2018';
        }

        return newProperties;
    }

    render() {
        let newProperties = this.getNewProperty();
        let propertyDisplay = [];
        Object.keys(newProperties).forEach((property) => {
            if (property === 'firstName' || property === 'lastName' || property === 'telephone') {
                propertyDisplay.push(
                    <div key={property} className={property}>
                        {newProperties[property]}
                    </div>
                )
            }
            else {
                propertyDisplay.push(
                    <div key={`label ${property}`} className={`inputLabel ${property}`}>
                        {this.propertiesName[property]}
                    </div>);
                propertyDisplay.push(
                    <input key={`input ${property}`} type="text" className={property} value={newProperties[property]}
                           disabled={!this.state.edit}/>
                )
            }
        });

        return (
            <section className='MemberInfo'>
                <div className='infoTitle'> Info du membre</div>
                {
                    Object.keys(newProperties).length !== 0
                        ? <div className='infoArea'>
                            <img className='editPhoto' src={edit} alt="modifier"/>
                            <img className='memberPhoto' src={defaultImage} alt='défaut'/>
                            {propertyDisplay}
                            {
                                this.state.edit
                                    ?
                                    <React.Fragment>
                                        <input type="button" className='updateButton red cancel' value="annuler"
                                               onClick={() => this.setState({edit: false})}/>
                                        <input type="button" className='updateButton green save' value="enregistrer"
                                               onClick={() => this.setState({edit: false})}/>
                                    </React.Fragment>
                                    :
                                    this.state.isCAMember
                                        ? <input type="button" className='boardButton red deleteBoard'
                                                 value="supprimer du CA"/>
                                        :
                                        <input type="button" className='boardButton green addBoard' value="ajouter au CA"/>
                            }
                        </div>
                        : ''
                }
            </section>
        );
    }
}

export default MemberInfo;



