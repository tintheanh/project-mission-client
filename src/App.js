import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import createBrowserHistory from 'history/createBrowserHistory';
import WebSocket from 'reconnecting-websocket';
import Home from './components/HomeScreen/Home';
import Navigation from './components/HomeScreen/Navigation';
import RequestSection from './components/RequestSection/RequestSection';
import Socket from './socket';
// import subjects from './subjectData';

// const history = createBrowserHistory();

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trequests: [],
      subjects: []
    };
  }

  componentDidMount() {
    // const options = { connectionTimeout: 1000 };
    let ws = new WebSocket('wss://mygoapi.ngrok.io');
    // console.log(ws.readyState);
    // if (ws.readyState === ws.OPEN || ws.readyState === ws.CLOSING) {
    //   console.log('open');
    // }
    // ws.timeoutInterval = 5400;
    let socket = this.socket = new Socket(ws);

    // Listening
    socket.on('connect', this.onConnect.bind(this));
    socket.on('trequest add', this.onAddTrequest.bind(this));
    socket.on('trequest edit', this.onCheckRequest.bind(this));
    socket.on('trequest remove', this.onRemoveCheckedTrequest.bind(this));
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

    // setTimeout(() => socket.on('connect', this.onConnect.bind(this)), 1000);
    // socket.on('disconnect', this.onDisconnect.bind(this));

    // fetch subjects
    const { subjects } = this.state;

    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const targetUrl = 'https://mygoapi.ngrok.io/get-subjects';
    fetch(proxyUrl + targetUrl).then(response => response.json())
      .then((data) => {
        data.forEach((element) => {
          subjects.push(element);
        });
      }).then(() => this.setState({ subjects }))
      .catch(err => console.log(err));
  }

  onConnect() {
    this.socket.emit('trequest subscribe');
  }

  onDisconnect() {
    console.log('disconnected');
  }

  onAddTrequest(trequest) {
    const { trequests } = this.state;
    if (!this.checkDuplicatedTrequest(trequests, trequest)) {
      trequests.push(trequest);
      this.setState({ trequests }, () => console.log(this.state.trequests));
    }
  }

  onRemoveCheckedTrequest() {
    const { trequests } = this.state;
    const uncheckedRequests = [];
    trequests.forEach((e) => {
      if (e.checked === false) uncheckedRequests.push(e);
    });
    this.setState({ trequests: uncheckedRequests });
  }

  onCheckRequest(req) {
    const { trequests } = this.state;
    for (let index = 0; index < trequests.length; index++) {
      if (trequests[index].id === req.id) {
        trequests[index] = Object.assign(req);
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
