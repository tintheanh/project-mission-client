import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/HomeScreen/Home';
import Navigation from './components/HomeScreen/Navigation';
import RequestSection from './components/RequestSection/RequestSection';
import Socket from './socket';
import subjects from './subjectData';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trequests: [],
      subjects: []
    };
  }

  componentDidMount() {
    const ws = new WebSocket('ws://localhost:4000');
    const socket = this.socket = new Socket(ws);

    // Listening
    socket.on('connect', this.onConnect.bind(this));
    socket.on('trequest add', this.onAddTrequest.bind(this));
    socket.on('trequest edit', this.onCheckRequest.bind(this));
    socket.on('trequest remove', this.onRemoveCheckedTrequest.bind(this));
    socket.on('disconnect', this.onDisconnect.bind(this));

    // fetch subjects
    // const { subjects } = this.state;
    // fetch('https://api.jsonbin.io/b/5b37321defaed72daeed8cfd').then(response => response.json())
    //   .then((data) => {
    //     data.forEach((element) => {
    //       subjects.push(element);
    //     });
    //   }).then(() => this.setState({ subjects }))
    //   .catch(err => console.log(err));
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
    trequests.push(trequest);
    this.setState({ trequests });
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
                  subjects={subjects}
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
