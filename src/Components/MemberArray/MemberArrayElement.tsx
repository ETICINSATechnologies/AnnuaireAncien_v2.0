import React from 'react';
import { MemberRead } from "../../Model/Member";
import Auth from "../Auth/Auth";

let deleteIcon = require("../../Images/delete_icon.png");

interface MemberArrayElementProps {
    key: number
    memberInfo: MemberRead
    selectMemberById(id: number): void
    deleteMember(id: number): void
}

const MemberArrayElement = (props: MemberArrayElementProps) =>{
    return (
        <tr onClick={() => props.selectMemberById((props.memberInfo as any).id)}>
            <td className="firstName">{props.memberInfo.firstName}</td>
            <td className="lastName">{props.memberInfo.lastName}</td>
            <td className="positionLabel">{props.memberInfo.latestPosition}</td>
            <td className="positionYear">{props.memberInfo.latestYear}</td>
            {Auth.isAdmin() ?
                <td className="deleteContainer">
                    <img className="deletePicture"
                         src={deleteIcon}
                         onClick={() => props.deleteMember(props.memberInfo.id)} alt="Supprimer"/>
                </td> : null
            }
        </tr>
    )
}



export default MemberArrayElement;
