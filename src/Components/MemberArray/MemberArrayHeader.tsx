import React, {Component} from 'react';

const MemberArrayHeader = () =>
    <tr>
        <th className="firstName">Prénom</th>
        <th className="lastName">Nom</th>
        <th className="positionLabel">Poste</th>
        <th className="positionYear">Année</th>
    </tr>
;

export default MemberArrayHeader;