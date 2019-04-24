import React from "react";
import "./DropDown.css";

interface Props {
    options: {
        label: any,
        id: number
    }[],
    modifyEnabled : boolean,
    onChange : Function,
    currentOption : number,
    className : string,
}


function DropDown (props: Props) : any   {

    let optionList = () => props.options.map((option: any, index: any) => {
        return <option key={index} value={option.id}>{option.label}</option>
    });

    return (
        <div className='DropDown'>
            <select className={props.className} value={props.currentOption} disabled={!props.modifyEnabled}
                    onChange={(event: React.ChangeEvent) => {props.onChange(event)}}>
                <option value={0}> Choisir une option</option>
                {optionList()}
            </select>
        </div>
    )
}



export default DropDown;