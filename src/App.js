import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import WebSocket from 'reconnecting-websocket';
import moment from 'moment';
import Home from './components/HomeScreen/Home';
import Navigation from './components/HomeScreen/Navigation';
import RequestSection from './components/RequestSection/RequestSection';
import Socket from './socket';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trequests: [],
      subjects: []
    };
  }

  componentDidMount() {
    let ws = new WebSocket('wss://mygoapi.ngrok.io');
    let socket = this.socket = new Socket(ws);

    // Listening
    socket.on('connect', this.onConnect.bind(this));
    socket.on('trequest add', this.onAddTrequest.bind(this));
    socket.on('trequest edit', this.onCheckRequest.bind(this));
    socket.on('trequest remove', this.onRemoveCheckedTrequest.bind(this));

    // Checking every 3s => reconnect
    setInterval(() => {
      console.log(ws.readyState);
      if (ws.readyState === 3) {
        ws = new WebSocket('wss://mygoapi.ngrok.io');
        socket = this.socket = new Socket(ws);
        socket.on('connect', this.onConnect.bind(this));
        socket.on('trequest add', this.onAddTrequest.bind(this));
        socket.on('trequest edit', this.onCheckRequest.bind(this));
        socket.on('trequest remove', this.onRemoveCheckedTrequest.bind(this));
      }
    }, 3000);

    // Fetching subjects
    const { subjects } = this.state;
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'; // Bypassing CORS
    const targetUrl = 'https://mygoapi.ngrok.io/get-subjects';
    fetch(proxyUrl + targetUrl).then(response => response.json())
      .then((data) => {
        data.forEach((element) => {
          subjects.push(element);
        });
        subjects.sort((a, b) => (a.name > b.name) - (a.name < b.name)); // Sorting by subject's name
      }).then(() => this.setState({ subjects }))
      .catch(err => console.log(err));
  }

  onConnect() {
    console.log('connected');
    this.socket.emit('trequest subscribe');
  }

  onDisconnect() {
    console.log('disconnected');
  }

  onAddTrequest(trequest) {
    const { trequests } = this.state;
    if (!this.checkDuplicatedTrequest(trequests, trequest)) {
      trequests.push(trequest);
      trequests.sort((a, b) => moment(a.date, 'MMMM Do YYYY, h:mm:ss a').valueOf() - moment(b.date, 'MMMM Do YYYY, h:mm:ss a').valueOf());
      this.setState({ trequests });
    }
  }

  onRemoveCheckedTrequest() {
    const { trequests } = this.state;
    const uncheckedRequests = [];
    trequests.forEach((e) => {
      if (!e.checked) uncheckedRequests.push(e);
    });
    this.setState({ trequests: uncheckedRequests });
  }

  onCheckRequest(req) {
    const { trequests } = this.state;
    for (let i = 0; i < trequests.length; i++) {
      if (trequests[i].id === req.id) {
        trequests[i] = Object.assign(req);
      }
    }
    this.setState({ trequests });
  }

  checkDuplicatedTrequest(trequests, trequest) {
    for (let i = 0; i < trequests.length; i++) {
      if (trequests[i].id === trequest.id) {
        return true;
      }
    }
    return false;
  }

  addTrequest(name) {
    this.socket.emit('trequest add', name);
  }

  removeCheckedTrequest(reqID) {
    this.socket.emit('trequest remove', reqID);
  }

  render() {
    return (
      <Router>
        <div>
          <Navigation />
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <Home
                  addTrequest={this.addTrequest.bind(this)}
                  subjects={this.state.subjects}
                />
              )}
            />
            <Route
              path="/request"
              render={() => (
                <RequestSection
                  trequests={this.state.trequests}
                  removeCheckedTrequest={this.removeCheckedTrequest.bind(this)}
                />
              )}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}
