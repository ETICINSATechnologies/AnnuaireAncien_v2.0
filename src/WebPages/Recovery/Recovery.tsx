import React from "react";
import "./Recovery.css";
import Header from "../../Components/Header/Header";
import Nav from "../../Components/Nav/Nav";
import Auth from "../../Components/Auth/Auth";
import CopyContent from "../../Components/CopyContent/CopyContent";
import style from "../../style.json";

const Recovery = () => {
  let activeButton = Auth.addCorrectButton(["home"]);

  return (
    <React.Fragment>
      <Header logo={style["logo"]} />
      <Nav buttons={activeButton}> </Nav>
      <div className="Recovery">
        <section className="Recuperation_section">
          <div className="div1">
            Afin de récupérer vos identifiants, veuillez contacter par mail
            l'administrateur de ce site en utilisant l'adresse mail suivante :
          </div>
          <CopyContent className="contact" textToCopy="contact@etic-insa.com" />
        </section>
      </div>
    </React.Fragment>
  );
};

export default Recovery;
