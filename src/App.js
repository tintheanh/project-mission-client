import React, { Component } from 'react';
import './App.css';

const ws = new WebSocket('ws://localhost:4000');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: {
        name: '',
        data: {
          name: '',
        },
      },
    };
  }

  sendRequest() {
    const msg = {
      name: 'Need tutor!!!',
      data: {
        name: 'Students request',
      },
    };

    this.setState({ msg }, ws.onopen = () => {
      ws.send(JSON.stringify(this.state.msg));
    });
  }

  render() {
    return (
      <div className="App">
        <h1>Hello</h1>
        <button onClick={() => this.sendRequest()}>Send</button>
      </div>
    );
  }
}

export default App;
