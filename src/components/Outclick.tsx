import React from "react";
import ReactDOM from "react-dom";

type Props = {
    Callback: () => void;
    children: React.ReactNode;
}

export default class Outclick extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside, true);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside, true);
    }

    handleClickOutside = (event: any) => {
        const domNode = ReactDOM.findDOMNode(this);

        if (!domNode || !domNode.contains(event.target)) {
            this.props.Callback();
        }
    }

    render() {
        return (
            <>{this.props.children}</>
        )
    }
}

