import React from 'react';

import './MemberInfo.css';
import defaultMan from '../../Images/default_man.svg'
import defaultWoman from '../../Images/default_woman.svg'

import {Member} from "../../Model/Member";


interface MemberInfoProps {
    member?: Member
}

const MAIN_PROPERTIES = ["firstName", "lastName", "telephone"];

const OTHER_PROPERTIES = {
    email: 'Email',
    company: 'Travaille chez',
    latestYear: 'Dernière année à ETIC',
    latestPosition: 'Dernier poste à ETIC',
    department: 'Département',
};

const MemberInfo: React.SFC<MemberInfoProps> = (props: MemberInfoProps) => {
    if (props.member) {
        let member = props.member.read();

        let mainProperties = MAIN_PROPERTIES.map((property) =>
            <div key={property} className={property}>{member![property]}</div>
        );

        let otherProperties = Object.keys(OTHER_PROPERTIES).map((property) => {
            if (member[property])
                return (
                    <React.Fragment key={property}>
                        <div className={`inputLabel ${property}`}>{(OTHER_PROPERTIES as any)[property]}</div>
                        <input type="text" className={property} value={member[property]} disabled={true}/>
                    </React.Fragment>
                )
            return null;
        });

        return (
            <section className='MemberInfo'>
                <div className='infoTitle'>Info du membre</div>
                <div className='infoArea'>
                    <img className='memberPhoto' alt="default" title="http://www.onlinewebfonts.com/icon"
                         src={member.gender === 'F' ? defaultWoman : defaultMan}/>
                    {mainProperties}
                    {otherProperties}
                </div>
            </section>
        )
    }

    return <section className='MemberInfo'/>
};

export default MemberInfo;



