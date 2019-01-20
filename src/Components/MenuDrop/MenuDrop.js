import React, {Component} from 'react';
import './MenuDrop.css';


class MenuDrop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            function: props.function,
            modifyEnabled: props.modifyEnabled,
            length: props.length,
            currentoption: props.currentoption,
            optionnames: props.optionnames,
            optionids: props.optionids,
        };
        this.onChange = this.onChange.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.setState({
                modifyEnabled: this.props.modifyEnabled,
                currentoption: this.props.currentoption
            });
        }
    }

    onChange(event) {
        event.persist();
        if (this.state.modifyEnabled) {
            this.setState({
                currentoption: event.target.value,
            });
        }

        let j;
        for (j=0; j<this.props.length; j++) {
            if (this.props.optionnames[j]===event.target.value) {
                this.state.function(this.props.optionids[j]);
            }
        }
    }

    populateMenu(){
        let OptionsList = this.props.optionnames.map(function(optionname){
                return (
                    <Option key={optionname} value={optionname} name={optionname} />
                )
        });
        return (
                this.state.modifyEnabled ? <select value={this.props.currentoption} onChange={this.onChange}>{OptionsList}</select> : <select value={this.props.currentoption} onChange={this.onChange} disabled>{OptionsList}</select>
        )
    }


    render() {
        return (
            <div>
                <div className="options_menu">
                        {this.populateMenu()}
                </div>
            </div>
        );
    }
}

function Option(props) {
    return (
        <option value={props.value}>{props.name}</option>
    );
}

export default MenuDrop;
