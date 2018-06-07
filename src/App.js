import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import RequestSection from './components/requests/RequestSection';
import Socket from './socket';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trequests: [],
      users: [],
      messages: [],
      activeRequest: {},
      connected: false,
    };
  }
  componentDidMount() {
    const ws = new WebSocket('ws://192.168.1.5:4000');
    const socket = this.socket = new Socket(ws);
    socket.on('connect', this.onConnect.bind(this));
    socket.on('disconnect', this.onDisconnect.bind(this));
    socket.on('trequest add', this.onAddTrequest.bind(this));
  }

  onConnect() {
    this.setState({ connected: true });
    this.socket.emit('trequest subscribe');
  }

  onDisconnect() {
    this.setState({ connected: false });
  }

  onAddTrequest(trequest) {
    const { trequests } = this.state;
    trequests.push(trequest);
    this.setState({ trequests });
  }

  addTrequest(name) {
    this.socket.emit('trequest add', name);
  }

  render() {
    return (
      <Router>
        <div className="app">
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/request">Request</Link></li>
            </ul>
          </nav>
          <RequestSection
            {...this.state}
            addTrequest={this.addTrequest.bind(this)}
          />
        </div>
      </Router>

    );
  }
}
