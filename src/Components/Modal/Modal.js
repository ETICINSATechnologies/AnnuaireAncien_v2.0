import React from "react";
import './Modal.css';
import cancelIcon from "../../Images/cancel_icon.png";


export default class Modal extends React.Component{
    onClose = (e)=> {
        this.props.onClose && this.props.onClose(e);
    };

    render () {
        if (!this.props.show){
            return null;
        }
        return (
            <div className="Modal">
                <div className="content">
                    {this.props.children}
                    <div className="header">
                        <img className="annuler"
                             src={cancelIcon}
                             onClick={(e) => {this.onClose(e)}} alt="Annuler"
                        />
                    </div>
                </div>
            </div>
        );
    }
}