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
            currentPositions: [],
        };
    }


    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.setState({
                modifyEnabled: this.props.modifyEnabled,
                currentPositions: this.props.currentPositions,
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

    updatePosition (position,index) {
        let positions=this.state.currentPositions;
        positions[index] = position;
        this.setState({
            currentPositions : positions
        });
        this.props.updatePositions(this.state.currentPositions);
    }

    deletePosition(index){
        this.state.currentPositions.splice(index,1);
        this.props.updatePositions(this.state.currentPositions);
    }

    addPosition(){
        let lastPosition  = Object.assign({}, this.state.currentPositions[this.state.currentPositions.length-1]);
        lastPosition.id=0;
        this.setState({
            currentPositions: [...this.state.currentPositions, lastPosition]
        });
        this.props.updatePositions([...this.state.currentPositions, lastPosition]);
    }


    renderPositions () {
        if (this.state.positions.length !== 0) {
            let updatePosition=this.updatePosition.bind(this);
            let deletePosition=this.deletePosition.bind(this);
            let PositionsList = this.state.currentPositions.map(function(position, index){
                return (
                    <Position
                        key={index}
                        year={''}
                        positions={this.state.positions}
                        position={position}
                        updatePosition={updatePosition}
                        index={index}
                        modifyEnabled={this.state.modifyEnabled}
                        deletePosition={deletePosition}
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
                <Button
                    className={`input_button add_position ${this.state.modifyEnabled ? 'visible' : 'hidden'}`}
                    value="Ajouter" onClick={() => this.addPosition()}
                />
            </div>
        );
    }
}

class Position extends Component {
    constructor(props) {
        super(props);
        this.state = {
            position: this.props.position,
            modifyEnabled: false,
        };
        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        event.persist();
        if (event.target.className==="position dropdown") {
            this.setState({
                position: {
                    ...this.state.position,
                    id : parseInt(event.target.value,10)
            }
            }, () => {
                this.props.updatePosition(this.state.position,this.props.index);
            });
        } else {
            this.setState({
                position: {
                    ...this.state.position,
                    year : parseInt(event.target.value,10)
                }
            }, () => {
                this.props.updatePosition(this.state.position,this.props.index);
            });
        }

    }


    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.setState({
                modifyEnabled: this.props.modifyEnabled,
                position:this.props.position,
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
                    <img className={`delete_position ${this.state.modifyEnabled ? "visible" : "hidden"}`}
                         src={deleteIcon} onClick={() => this.props.deletePosition(this.props.index)}
                         alt="Supprimer"/>
                    <select disabled={!this.state.modifyEnabled}
                            className="position dropdown"
                            value={this.state.position.id}
                            onChange={this.onChange}
                    >
                        <option value={0}>Choisir un poste</option>
                        {positionDropDown}
                    </select>
                    <input disabled={!this.state.modifyEnabled}
                           type="text"
                           className="year"
                           value={this.state.position.year}
                           onChange={this.onChange}
                    />
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
