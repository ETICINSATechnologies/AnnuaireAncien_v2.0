import React, {Component} from 'react';
import './Header.css';


class Button extends Component {
    render() {
        return (
            <a className="button" href={this.props.ref}> {this.props.value} </a>
        );
    }
}

export default Button;
