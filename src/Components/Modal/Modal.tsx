import React from "react";
import './Modal.css';

let cancelIcon = require("../../Images/cancel_icon.png");

interface Props {
    children: any;
    onClose: Function;
    show: boolean;
}

function Modal(props: Props){
    return (
        !props.show? null :
            <div className="Modal">
                <div className="content">
                    {props.children}
                    <div className="header">
                        <img className="annuler"
                             src={cancelIcon}
                             onClick={()=> props.onClose()} alt="Annuler"
                        />
                    </div>
                </div>
            </div>
    );
}

export default Modal;