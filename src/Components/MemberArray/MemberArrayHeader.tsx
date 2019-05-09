import React from 'react';
import Auth from "../../Components/Auth/Auth";

const MemberArrayHeader = () => {
    return (
        <tr>
            <th className="firstName">Prénom</th>
            <th className="lastName">Nom</th>
            <th className="positionLabel">Poste</th>
            <th className="positionYear">Année</th>
            {Auth.isAdmin() ? <th className="supprimer">Supprimer</th> : null}
        </tr>
    )
}

export default MemberArrayHeader;