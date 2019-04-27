import React, {Component} from 'react';

import './MemberInfo.css';
import facebook from '../../Images/facebook.png'
import linkedin from '../../Images/linkedin.png'

import {Member} from "../../Model/Member";


interface MemberInfoProps {
    member?: Member
    image: string
}

const MAIN_PROPERTIES = ["firstName", "lastName", "telephone"];

const LINKS = ["linkedin", "facebook"];

const OTHER_PROPERTIES = {
    email: 'Email',
    latestYear: 'Dernière année à ETIC',
    latestPosition: 'Dernier poste à ETIC',
    birthday: 'Date de naissance',
};

class MemberInfo extends React.Component<MemberInfoProps> {
    render() {
        const linkMaker = (link: string): string => {
            let ret: string = '';
            link ?
                ret = link.indexOf('http://') ? 'http://' + link : link :
                ret = '';

            return ret;
        };

        if (this.props.member) {
            let member = this.props.member.read();

            let mainProperties = MAIN_PROPERTIES.map((property) =>
                <div key={property} className={property} title={member![property]}>{member![property]}</div>
            );
            let linkProperties = LINKS.map((property, index) => {
                    if (member[property])
                        return (
                            <a key={index} className='link' href={member![property]}>
                                <img className='linkImg'
                                     src={property === 'facebook' ? facebook : linkedin} alt={property}/>
                            </a>
                        )
                }
            );

            let otherProperties = Object.keys(OTHER_PROPERTIES).map((property) => {
                if (member[property]) {
                    return (
                        <React.Fragment key={property}>
                            <div className={`inputLabel ${property}`}>{(OTHER_PROPERTIES as any)[property]}</div>
                            <input type="text" className={property} value={member[property]} disabled={true}/>
                        </React.Fragment>
                    )
                }
            });

            return (
                <section className='MemberInfo'>
                    <div className='infoTitle'>Info du membre</div>
                    <div className='infoArea'>
                        <img className='memberPhoto' alt="default" title="http://www.onlinewebfonts.com/icon"
                             src={this.props.image}/>
                        {mainProperties}
                        <div className='linkContainer'>{linkProperties}</div>
                        {otherProperties}
                    </div>
                </section>
            )
        }

        return <section className='MemberInfo'/>
    }
}

export default MemberInfo;



