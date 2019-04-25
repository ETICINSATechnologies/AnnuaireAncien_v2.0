import React, { Component } from "react";
import "./Header.css";
import { Link, Redirect } from "react-router-dom";

interface Props {
  logo: string;
}
const Header = (props: Props) => {
  return (
    <header className="Header">
      <Link className="header_a" to="/">
        <img className="home_logo" src={require("../../" + props.logo)} />
        <h1 className="title"> Annuaire des Anciens </h1>
      </Link>
    </header>
  );
};

export default Header;
