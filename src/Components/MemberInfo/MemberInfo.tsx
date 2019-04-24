import React, {Component} from 'react';

import './MemberInfo.css';
import defaultMan from '../../Images/default_man.svg'
import defaultWoman from '../../Images/default_woman.svg'
import facebook from '../../Images/facebook.png'
import linkedin from '../../Images/linkedin.png'

import {Member} from "../../Model/Member";
import { string } from 'prop-types';


interface MemberInfoProps {
    member?: Member
}

const MAIN_PROPERTIES = ["firstName", "lastName", "telephone"];

const LINKS = ["linkedin" , "facebook"];

const OTHER_PROPERTIES = {
    email: 'Email',
    latestYear: 'Dernière année à ETIC',
    latestPosition: 'Dernier poste à ETIC',
    birthday: 'Date de naissance',
};

const MemberInfo: React.SFC<MemberInfoProps> = (props: MemberInfoProps) => {

    const linkMaker = (link : string) : string => {
        let ret : string ='';
        link ? 
            ret = link.indexOf('http://')? 'http://'+link : link
            :
            ret = ''

        return ret;
    };

    if (props.member) {
        let member = props.member.read();

        let mainProperties = MAIN_PROPERTIES.map((property) =>
            <div key={property} className={property}>{member![property]}</div>
        );
        let linkProperties = LINKS.map((property, index) =>
                <a className= 'link' 
                    href={member![property] ? linkMaker(member![property]) : undefined}>
                    <img key={index} className='linkImg' 
                        src={property==='facebook'? facebook : linkedin} alt={property}/>
                </a>
    );


        let otherProperties = Object.keys(OTHER_PROPERTIES).map((property) => {
            if (member[property]){
                console.log(property);
                return (
                    <React.Fragment key={property}>
                        <div className={`inputLabel ${property}`}>{(OTHER_PROPERTIES as any)[property]}</div>
                        <input type="text" className={property} value={member[property]} disabled={true}/>
                    </React.Fragment>
                )}
        });

        return (
            <section className='MemberInfo'>
                <div className='infoTitle'>Info du membre</div>
                <div className='infoArea'>
                    <img className='memberPhoto' alt="default" title="http://www.onlinewebfonts.com/icon"
                         src={member.gender === 'F' ? defaultWoman : defaultMan}/>
                    {mainProperties}
                    <div className='linkContainer'>{linkProperties}</div>
                    {otherProperties}
                </div>
            </section>
        )
    }

    return <section className='MemberInfo'/>
};

export default MemberInfo;



