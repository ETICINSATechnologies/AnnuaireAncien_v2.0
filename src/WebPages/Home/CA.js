import React, {Component} from 'react';
import defaultMan from '../../Images/default_man.svg'
import defaultWoman from '../../Images/default_woman.svg'

class CA extends Component {
    constructor(props) {
        super(props);
        this.state = {
            divHeight: 0
        };
        this.setDivHeight = this.setDivHeight.bind(this);
    }

    setDivHeight() {
        if (this.DOMBoard) {
            let divHeight = window.innerHeight - this.DOMBoard.getBoundingClientRect().y;
            this.setState({divHeight: divHeight});
        }
    }

    componentDidMount() {
        this.setDivHeight();
        window.addEventListener('resize', this.setDivHeight)
    }

    render() {
        const rowsNb = Math.max(this.props.members.length, 5);
        const rowSize = Math.min(this.state.divHeight / rowsNb, 250);

        let columnHeight;
        let boardStyle;

        if (window.innerHeight < window.innerWidth) {
            columnHeight = `${1.2 * rowSize}px`;
            boardStyle = {
                gridTemplateRows: `repeat(${rowsNb}, ${rowSize}px)`
            }
        }
        else {
            columnHeight = '12vw';
            boardStyle = {
                gridTemplateRows: `repeat(${rowsNb}, 12vw`
            }
        }

        document.documentElement.style.setProperty(`--board-${this.props.position}-width`, columnHeight);

        return (
            <div ref={(DOMBoard) => this.DOMBoard = DOMBoard} className={"CA " + this.props.position}
                 style={boardStyle}>
                {
                    this.props.members.map((member, index) => {
                        let photo;
                        try {
                            photo = require(`../../Tools/profilePicture/${member.photo}`);
                        } catch (e) {
                            photo = member.gender.label === 'F' ? defaultWoman : defaultMan;
                        }

                        return <div key={index} id={member.id}>
                            <img src={photo} alt=""/>
                            <p>
                                {member.firstName} {member.lastName}<br/>
                                {member.positions[0].label}
                            </p>
                        </div>
                    })
                }
            </div>
        );
    }
}

export default CA;
