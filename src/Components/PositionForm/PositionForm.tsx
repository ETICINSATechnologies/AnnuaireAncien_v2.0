import React, {Component} from 'react';
import './PositionForm.css';
import Auth from "../../Components/Auth/Auth";
import deleteIcon from "../../Images/delete_icon.png";

import {MemberPosition} from "../../Model/MemberPosition";
import {Position} from "../../Model/Position";

interface PositionFormProps {
    modifyEnabled: boolean
    memberPositions: MemberPosition[]

    updateMemberPositions(mPositions: MemberPosition[]): void
}

interface PositionFormState {
    positions: Position[]
    idMapping: object
}


class PositionForm extends Component<PositionFormProps, PositionFormState> {
    state = {
        positions: [],
        idMapping: {}
    };

    componentDidMount() {
        fetch('api/v1/core/position', {
            headers: {
                Authorization: Auth.getToken()
            }
        })
            .then(res => res.json())
            .then((result) => {
                this.setState({
                    positions: result,
                    idMapping: result.reduce((currentMapping: object, position: Position, index: number) => {
                        return {
                            ...currentMapping,
                            [position.id]: index
                        }
                    }, {})
                });
            })
    }

    onChange = (event: React.ChangeEvent, index: number) => {
        let mPositions = this.props.memberPositions;
        let property = event.target.className;
        let value = (event.target as any).value;

        if (property === "position") {
            // get the position of the selected option
            let newPosition = this.state.positions[this.getMPositionIndexById(value)];
            // Update the position of the member position mPositions[index]
            Object.assign(mPositions[index], newPosition);
        }
        if (mPositions[index].hasOwnProperty(property)) {
            if (property === "year" && value.match(/^(\d?){4}$/))
                mPositions[index][property] = value;
        }

        this.props.updateMemberPositions(mPositions);
    };

    getMPositionIndexById(id: number): number {
        return (this.state.idMapping as any)[id]
    }

    deletePosition = (index: number) => {
        this.props.memberPositions.splice(index, 1);
        this.props.updateMemberPositions(this.props.memberPositions);
    };

    addPosition() {
        let mPositionNb = this.props.memberPositions.length;
        if (mPositionNb < 4) {
            let lastPosition = {
                id: 0,
                isBoard: false,
                year: new Date().getFullYear().toString(),
                label: '',
                pole: {}
            } as MemberPosition;
            this.props.updateMemberPositions([...this.props.memberPositions, lastPosition]);
        }
    }

    renderPositions() {
        if (typeof(this.props.memberPositions)!== 'undefined' &&this.props.memberPositions.length !== 0) {
            return (
                this.props.memberPositions.map((mPosition, index) => {
                    return (
                        <MemberPositionRender
                            key={index} index={index} mPosition={mPosition}
                            positionList={this.state.positions} modifyEnabled={this.props.modifyEnabled}
                            deletePosition={this.deletePosition} onChange={this.onChange}/>
                    )
                }, this)
            )
        }
    }

    render() {
        return (
            <div className="position_form">
                <h1>Postes occupés à ETIC</h1>
                <div className="positions"> {this.renderPositions()} </div>
                <input type='button' value="Ajouter" onClick={() => this.addPosition()}
                       className={`input_button add_position ${this.props.modifyEnabled ? 'visible' : 'hidden'}`}/>
            </div>
        );
    }
}

interface PositionProps {
    key: number
    index: number
    mPosition: MemberPosition
    positionList: Position[]
    modifyEnabled: boolean

    deletePosition(id: number): void

    onChange(evt: React.ChangeEvent, id: number): void
}

const MemberPositionRender = (props: PositionProps) => {
    let positionDropDown = props.positionList.map((position, index) => {
        return <option key={index} value={position.id}>{position.label}</option>
    });

    return (
        <div className="position_container">
            <p>Poste</p>
            <p>Année</p>
            <img className={`delete_position ${props.modifyEnabled ? "visible" : "hidden"}`}
                 src={deleteIcon} alt="Supprimer" onClick={() => props.deletePosition(props.index)}/>
            <select className="position" disabled={!props.modifyEnabled} value={props.mPosition.id}
                    onChange={(evt) => props.onChange(evt, props.index)}>
                {positionDropDown}
            </select>
            <input className="year" type="text" disabled={!props.modifyEnabled} value={props.mPosition.year}
                   onChange={(evt) => props.onChange(evt, props.index)}/>
        </div>
    );
};

export default PositionForm;
