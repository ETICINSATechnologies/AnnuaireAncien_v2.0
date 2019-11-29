import React from 'react';
import './Help.css';
import Header from "../../Components/Header/Header";
import Nav from "../../Components/Nav/Nav";
import Auth from "../../Components/Auth/Auth";
import CopyContent from "../../Components/CopyContent/CopyContent";
import TWITTER from "../../Images/logoTWITTER.png";
import FB from "../../Images/logoFB.png";
import LINKEDIN from "../../Images/logoIN.png";
import INSTA from "../../Images/logoINSTA.png";
import ETIC from"../../Images/logo.jpg";


const Help: React.SFC<{}> = () => {
    let activeButton = ['home'];
    if (Auth.isConnected()) {
        activeButton.push('search');
        activeButton.push('profile');
    }
    activeButton = Auth.addCorrectButton(activeButton);

    return (
        <React.Fragment>
            <Header/>
            <Nav buttons={activeButton}> </Nav>
            <div className="Help">
                <section className="help_section">
                    <div className="byetic">
                        Cette application a été développée par
                    </div>
                    <a className="etic" href="http://etic-insa.com/"> <img className="logoETIC" src={ETIC} alt={'ETIC'} />
                     </a>
                    <div className="actu" >
                        Suivez nos actualités !
                    </div>
                    <div className="social">
                    <   a href="https://www.facebook.com/etic.insa/?ref=br_rs">
                            <img className="logoFB" src={FB} alt={'Facebook'}/>
                        </a> 
                        <a href="https://twitter.com/etic_insa" >
                            <img className="logoTWITTER" src={TWITTER} alt={'Twitter'}/>
                        </a>
                        <a href="https://www.instagram.com/etic.insa/">
                            <img className="logoINSTA" src={INSTA} alt={'Instragram'}/>
                        </a>
                        <a href="https://www.linkedin.com/company/etic-insa-technologies/?originalSubdomain=fr">
                            <img className="logoLINKEDIN" src={LINKEDIN} alt={'LinkedIn'}/>
                        </a>

                    </div>
                    <div className="explications">
                        Elle permet de rechercher les anciens membres de la Junior en fonction de divers critères
                        comme leur nom, prénom, entreprise pour laquelle ils travaillent ou encore leur année de
                        mandat.
                        Si vous avez des remarques ou suggestions, merci d'en faire par à 
                        <CopyContent className="contact" textToCopy="contact@etic-insa.com"/>
                    </div>
                </section>
            </div>
        </React.Fragment>
    );
};


export default Help;
