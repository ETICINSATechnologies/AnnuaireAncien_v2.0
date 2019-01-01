import React, {Component} from 'react';
import './MemberInfo.css';

import defaultMan from '../../Images/default_man.svg'
import defaultWoman from '../../Images/default_woman.svg'
import edit from '../../Images/edit.png'


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
            edition: false,
            isBoard: false,
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
                           disabled={!this.state.edition}/>
                )
            }
        });

        let gender = 'M';
        if (this.props.info['gender'])
            gender = this.props.info['gender'].label;

        return (
            <section className='MemberInfo'>
                <div className='infoTitle'> Info du membre</div>
                {
                    Object.keys(newProperties).length !== 0 ?
                        <div className='infoArea'>
                            <img className='memberPhoto' alt='défaut' title="http://www.onlinewebfonts.com/icon"
                                 src={gender === 'F' ? defaultWoman : defaultMan}/>
                            {propertyDisplay}
                            {
                                this.props.editable ?
                                    <React.Fragment>
                                        <img className='editPhoto' src={edit} alt="modifier"
                                             style={this.state.edition ? {display: 'none'}: {}}
                                             onClick={() => {this.setState({edition: true})}}/>
                                        {
                                            this.state.edition ?
                                                <React.Fragment>
                                                    <input type="button" onClick={() => this.setState({edition: false})}
                                                           value="annuler" className='updateButton cancel'/>
                                                    <input type="button" onClick={() => this.setState({edition: false})}
                                                           value="enregistrer" className='updateButton save'/>
                                                </React.Fragment> :
                                                this.state.isBoard ?
                                                    <input type="button" className='boardButton deleteBoard'
                                                           value="Supprimer du CA"/> :
                                                    <input type="button" className='boardButton addBoard'
                                                           value="Ajouter au CA"/>
                                        }
                                    </React.Fragment> : ''
                            }
                        </div> :
                        ''
                }
            </section>
        );
    }
}

export default MemberInfo;



