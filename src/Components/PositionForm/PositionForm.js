import React, {Component} from 'react';
import './PositionForm.css';
import Auth from "../../Components/Auth/Auth";


class PositionForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modifyEnabled: this.props.modifyEnabled,
            currentpositions: {},
            positions: [],
            positionids: [],
        };
        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
    }

    updatePositions(){
        if (typeof (this.props.currentpositions) !== 'undefined'){
            let i;
            let posnIds=[];
            for (i=0; i<this.props.currentpositions.length; i++) {
                posnIds[i]=this.props.currentpositions[i].id;
            }
            this.setState({
                positionids: posnIds,
            });
        }

    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.setState({
                modifyEnabled: this.props.modifyEnabled,
                currentpositions:this.props.currentpositions
            });
            this.updatePositions();
        }

    }

    componentDidMount() {
        fetch('api/v1/core/position', {
            headers: {
                Authorization: Auth.getToken()
            }
        })
            .then(res => res.json())
            .then((result) => {
                this.setState({positions: result});
            })
    }

    updatePositionid (position) {
        let positionids=this.state.positionids;
        positionids[position.index] = position.id;
        this.setState({
            positionsids : positionids
        });
        this.props.updatePositionids(this.state.positionids);
    }



    renderPositions () {
        if (this.state.positions.length !== 0) {
            let updatePositionid=this.updatePositionid.bind(this);
            let positions=this.state.positions;
            let modifyEnabled=this.state.modifyEnabled;
            let PositionsList = this.state.positionids.map(function(positionid,index){
                return (
                    <Position
                        key={index} positions={positions} positionid={positionid} updatePositionid={updatePositionid} index={index} modifyEnabled={modifyEnabled}
                    />
                )
            });
            return (
                <div className="positions" onChange={this.onChange}>{PositionsList}</div>
            )
        }
    }

    render() {
        return (
            <div className="Positions">
                <div className="info_area">
                    <p>Postes occupés à ETIC</p>
                </div>

                <div className="positions">
                    {this.renderPositions()}
                </div>
            </div>
        );
    }
}

class Position extends Component {
    constructor(props) {
        super(props);
        this.state = {
            positionid: this.props.positionid,
            modifyEnabled: false
        };
        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        event.persist();
        this.setState({
            positionid: event.target.value,
        });
        let position={
            index : this.props.index,
            id : parseInt(event.target.value,10),
        };
        this.props.updatePositionid(position);
    }

    componentDidUpdate(prevProps) {
        if (this.props.modifyEnabled !== prevProps.modifyEnabled) {
            this.setState({
                modifyEnabled: this.props.modifyEnabled,
            });
        }

    }


    render() {
        let positionDropDown = this.props.positions.map((position,index) => {
            return <option key={index} value={position.id}>{position.label}</option>
        });
        return (
            this.state.modifyEnabled ?
                <div className="positions">
                    <p>Poste</p>
                    <select value={this.state.positionid} onChange={this.onChange}>
                        <option value={0}>Choisir un poste</option>
                        {positionDropDown}
                    </select>
                </div>
                :
                <div className="positions">
                    <p>Poste</p>
                    <select disabled value={this.state.positionid} onChange={this.onChange}>
                        <option value={0}>Choisir un poste</option>
                        {positionDropDown}
                    </select>
                </div>



        );
    }
}


export default PositionForm;
