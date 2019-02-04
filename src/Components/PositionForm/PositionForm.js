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



    renderPositions () {
        if (this.state.positions.length !== 0) {
            let posns=this.state.positions;
            let PositionsList = this.state.positionids.map(function(positionid){
                console.log('map:', posns);
                return (
                    <Position
                        key={positionid} positions={posns} positionid={positionid}
                    />
                )
            });
            return (
                <div className="positions" onChange={this.onChange}>{PositionsList}</div>
            )
        }
    }


    render() {
        console.log("#", this.state.positions);
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
        };
        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        let newposition
        event.persist();
        if (this.state.modifyEnabled) {
            this.setState({
                currentposition: event.target.value,
            });
        }
    }


    render() {
        console.log(this.props);
        let positionDropDown = this.props.positions.map((position) => {
            return <option value={position.id}>{position.label}</option>
        });
        return (
            <div className="thisPos">
                <p>Poste</p>
                <select value={this.props.positionid} onChange={this.onChange}>
                    <option value={0}>Choisir un poste</option>
                    {positionDropDown}
                </select>
            </div>

        );
    }
}


export default PositionForm;
