import React from "react";

export default class Outclick extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      newChildren: this.genNewChild(),
    };
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside, true);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside, true);
  }

  elements: any = [];

  componentDidUpdate(prevProps: any) {
    if (prevProps !== this.props)
      this.setState({ ...this.state, newChildren: this.genNewChild() });
  }

  genNewChild = () => {
    this.elements = [];
    return React.Children.toArray(this.props.children).map((child: any) => {
      const elementRef = React.createRef();
      let component = React.cloneElement(child, { ref: elementRef });
      this.elements.push(elementRef);
      return component;
    });
  };

  handleClickOutside = (event: any) => {
    let outClickElements = 0;
    this.elements.forEach((element: any) => {
      if (!element?.current?.contains(event.target)) outClickElements++;
    });

    if (
      event.offsetX > event.target.clientWidth ||
      event.offsetY > event.target.clientHeight
    ) {
      return;
    }

    if (this.elements.length <= outClickElements && this.props.callback) {
      this.props.callback();
    }
  };

  render() {
    return <>{this.state.newChildren}</>;
  }
}
