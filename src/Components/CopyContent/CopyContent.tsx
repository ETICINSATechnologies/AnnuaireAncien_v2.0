import {Component} from "react";
import React from "react";

interface CopyContentProps {
    className: string
    textToCopy: string
    textToDisplay?: string
}

interface CopyContentState {
    copied: boolean
    timeout?: any
}

class CopyContent extends Component<CopyContentProps, CopyContentState> {
    state = {
        copied: false,
        timeout: undefined
    };

    copyToClipBoard = (evt: React.MouseEvent) => {
        (navigator as any).clipboard.writeText(this.props.textToCopy)
            .then(() => {
                this.setState({
                    copied: true,
                    timeout: setTimeout(() => this.setState({copied: false}), 2000)
                });
            })
    };

    componentWillUnmount() {
        if (this.state.timeout)
            clearTimeout(this.state.timeout)
    }

    render() {
        return (
            <React.Fragment>
                <div className={this.props.className + ' toCopy'} onClick={this.copyToClipBoard}
                     title="Cliquer pour copier ">
                    {this.props.textToDisplay ? this.props.textToDisplay : this.props.textToCopy}
                </div>
                {this.state.copied ? <div className={this.props.className + ' copied'}>Copié!</div> : ''}
            </React.Fragment>
        )
    }
}

export default CopyContent