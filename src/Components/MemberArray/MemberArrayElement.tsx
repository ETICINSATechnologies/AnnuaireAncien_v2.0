import React, {Component} from 'react';
import {MemberRead} from "../../Model/Member";

interface MemberArrayElementProps {
    key: number
    memberInfo: MemberRead

    selectMemberById(id: number): void
}


const MemberArrayElement = (props: MemberArrayElementProps) =>
    <tr onClick={() => props.selectMemberById((props.memberInfo as any).id)}>
        <td className="firstName">{props.memberInfo.firstName}</td>
        <td className="lastName">{props.memberInfo.lastName}</td>
        <td className="positionLabel">{props.memberInfo.latestPosition}</td>
        <td className="positionYear">{props.memberInfo.latestYear}</td>
    </tr>
;


export default MemberArrayElement;
