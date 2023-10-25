import React from "react";

class Counter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 5,
    };
  }

  change = (change) => {
    this.setState((curState) => {
      return { count: curState.count + change };
    });
  };

  render() {
    return (
      <div>
        <button onClick={() => this.change(-1)}>-</button>
        <span>{this.state.count}</span>
        <button onClick={() => this.change(+1)}>+</button>
      </div>
    );
  }
}

export default Counter;
