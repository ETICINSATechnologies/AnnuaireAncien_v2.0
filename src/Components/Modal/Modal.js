import React from "react";
import './Modal.css';
import cancelIcon from "../../Images/cancel_icon.png";


function Modal(props){

        if (!props.show){
            return null;
            // might have warning because name of function starts with a capital -- not an issue
        } else {
            return (
                <div className="Modal">
                    <div className="content">
                        {props.children}
                        <div className="header">
                            <img className="annuler"
                                 src={cancelIcon}
                                 onClick={props.onClose} alt="Annuler"
                            />
                        </div>
                    </div>
                </div>
            );
        }
}

export default Modal;