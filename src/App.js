import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import WebSocket from 'reconnecting-websocket';
import moment from 'moment';
import Home from './components/HomeScreen/Home';
import Navigation from './components/HomeScreen/Navigation';
import RequestSection from './components/RequestSection/RequestSection';
import Socket from './socket';
import hardcodedsubjects from './subjectData';

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

    // Connecting to WebSocket
    socket.on('connect', this.onConnect.bind(this));
    socket.on('trequest add', this.onAddTrequest.bind(this));
    socket.on('trequest edit', this.onCheckRequest.bind(this));
    socket.on('trequest remove', this.onRemoveCheckedTrequest.bind(this));

    // Checking every 3s => reconnecting
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
    const proxyUrl = 'https://cryptic-reaches-48126.herokuapp.com/'; // Bypassing CORS
    const targetUrl = 'https://mygoapi.ngrok.io/get-subjects';
    fetch(proxyUrl + targetUrl).then(response => response.json())
      .then((data) => {
        data.forEach((element) => {
          subjects.push(element);
        });
        subjects.sort((a, b) => (a.name > b.name) - (a.name < b.name)); // Sorting by subject's name
      }).then(() => console.log('Fetching done'))
      .then(() => this.setState({ subjects }))
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
      // Sorting by trequest's date
      trequests.sort((a, b) => moment(a.date, 'MMMM Do YYYY, h:mm:ss a').valueOf() - moment(b.date, 'MMMM Do YYYY, h:mm:ss a').valueOf());
      this.setState({ trequests });
    }
  }

  // Filtering unchecked trequests
  onRemoveCheckedTrequest() {
    const { trequests } = this.state;
    const uncheckedRequests = trequests.filter(e => !e.checked);
    this.setState({ trequests: uncheckedRequests });
  }

  // When checking a trequest, reassign it to a checked trequest
  onCheckRequest(req) {
    const { trequests } = this.state;
    for (let i = 0; i < trequests.length; i++) {
      if (trequests[i].id === req.id) {
        trequests[i] = Object.assign(req);
      }
    }
    this.setState({ trequests });
  }

  // Checking duplicated trequest b/c WS reconnecting causes duplicating trequest
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

  // Using hardcodedSubjects when fetching fail
  renderSubjects(subjects) {
    if (this.state.subjects.length === 0) {
      return hardcodedsubjects.sort((a, b) => (a.name > b.name) - (a.name < b.name));
    }
    return subjects;
  }

  render() {
    const { subjects } = this.state;
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
                  subjects={this.renderSubjects(subjects)}
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
