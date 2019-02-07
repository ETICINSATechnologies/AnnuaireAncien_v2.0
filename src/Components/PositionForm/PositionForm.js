import React, {Component} from 'react';
import './PositionForm.css';
import Auth from "../../Components/Auth/Auth";
import deleteIcon from "../../images/delete_icon.png";


class PositionForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modifyEnabled: this.props.modifyEnabled,
            positions: [],
            positionids: [],
        };
        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {

    }


    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.setState({
                modifyEnabled: this.props.modifyEnabled,
                positionids: this.props.positionids,
            });
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

    deletePosition(index){
        let positionids=this.state.positionids;
        this.setState({
            positionsids : positionids.splice(index,1)
        });
        this.props.updatePositionids(this.state.positionids);
    }

    addPosition(){
        let positionids=this.state.positionids;
        this.setState({
            positionsids : positionids.unshift(0)
        });
        this.props.updatePositionids(this.state.positionids);
    }

    setYear(index,year){
        console.log('now editing year at '+index+' with '+year);
    }

    renderPositions () {
        if (this.state.positions.length !== 0) {
            let updatePositionid=this.updatePositionid.bind(this);
            let deletePosition=this.deletePosition.bind(this);
            let setYear=this.setYear.bind(this);
            let PositionsList = this.state.positionids.map(function(positionid,index){
                return (
                    <Position
                        key={index} year={null} positions={this.state.positions} positionid={positionid} updatePositionid={updatePositionid} index={index} modifyEnabled={this.state.modifyEnabled} deletePosition={deletePosition} setYear={setYear}
                    />
                )
            },this);
            return (
                <React.Fragment>
                    {PositionsList}
                </React.Fragment>
            )
        }
    }

    render() {
        return (
            <div className="position_form">
                <h1>Postes occupés à ETIC</h1>
                <div className="positions">
                    {
                        this.renderPositions()
                    }
                </div>
                <Button className={`input_button add_position ${this.state.modifyEnabled ? 'visible' : 'hidden'}`} value="Ajouter" onClick={() => this.addPosition()}/>
            </div>
        );
    }
}

class Position extends Component {
    constructor(props) {
        super(props);
        this.state = {
            positionid: this.props.positionid,
            modifyEnabled: false,
            year: 2000
        };
        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        if (event.target.className==="position dropdown") {
            event.persist();
            this.setState({
                positionid: event.target.value,
            });
            let position={
                index : this.props.index,
                id : parseInt(event.target.value,10),
            };
            this.props.updatePositionid(position);
        } else {
            this.props.setYear(this.props.index,event.target.value);
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.setState({
                modifyEnabled: this.props.modifyEnabled,
                positionid:this.props.positionid,
            });
        }

    }

    render() {
        let positionDropDown = this.props.positions.map((position,index) => {
            return <option key={index} value={position.id}>{position.label}</option>
        });
        return (
                <div className="position_container">
                    <p>Poste</p>
                    <p>Année</p>
                    <img className={`delete_position ${this.state.modifyEnabled ? "visible" : "hidden"}`} src={deleteIcon} onClick={() => this.props.deletePosition(this.props.index)} />
                    <select disabled={!this.state.modifyEnabled} className="position dropdown" value={this.state.positionid} onChange={this.onChange}>
                        <option value={0}>Choisir un poste</option>
                        {positionDropDown}
                    </select>
                    <input disabled={!this.state.modifyEnabled} type="text" className="year" value={this.props.year} onChange={this.onChange}/>
                </div>
        );
    }
}

function Button(props) {
    return (
        <input className={props.className} type="button" value={props.value} onClick= {props.onClick}/>
    );
}
export default PositionForm;
