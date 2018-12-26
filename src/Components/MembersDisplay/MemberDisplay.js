import React, {Component} from 'react';
import './MemberDisplay.css';

class MemberDisplay extends Component {
    constructor(props) {
        super(props);
        let propertiesName = {
            id: null,
            lastName: 'nom',
            firstName: 'prénom',
            positionLabel: 'poste',
            positionYear: 'année'
        };
        this.state = {
            header: this.props.header || false,
            propertiesName: propertiesName,
            properties: this.getMemberProperties(propertiesName)
        };
    }

    getPositionLabel() {
        try {
            if (this.props.info.positions[0].label)
                return this.props.info.positions[0].label;
        } catch (e) {
            if (e instanceof TypeError) return null;
        }
    }

    getPositionYear() {
        try {
            if (this.props.info.positions) {
                if (this.props.info.positions[0].year)
                    return this.props.info.positions[0].year;
                return 2018;
            }
        } catch (e) {
            if (e instanceof TypeError) return 2018;
        }
    }

    getMemberProperties(propertiesName) {
        let newProperties = {};
        Object.keys(propertiesName).forEach((propertyName) => {
            if (this.props.info.hasOwnProperty(propertyName)) {
                newProperties[propertyName] = this.props.info[propertyName];
            }
        });
        newProperties.positionLabel = this.getPositionLabel();
        newProperties.positionYear = this.getPositionYear();

        return newProperties;
    }

    render() {
        return (
            <tr className={`MemberDisplay ${this.state.properties.id}`} onClick={() => this.props.onClick(this.state.properties.id)}>
                {this.state.header
                    ?
                    <React.Fragment>
                        <th className='firstName'>{this.state.propertiesName.firstName}</th>
                        <th className='lastName'>{this.state.propertiesName.lastName}</th>
                        <th className='positionLabel'>{this.state.propertiesName.positionLabel}</th>
                        <th className='positionYear'>{this.state.propertiesName.positionYear}</th>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <td className='firstName'>{this.state.properties.firstName}</td>
                        <td className='lastName'>{this.state.properties.lastName}</td>
                        <td className='positionLabel'>{this.state.properties.positionLabel}</td>
                        <td className='positionYear'>{this.state.properties.positionYear}</td>
                    </React.Fragment>
                }
            </tr>
        );
    }
}

export default MemberDisplay;
