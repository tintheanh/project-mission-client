import React, { Component } from 'react';
import fire from 'firebase';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import moment from 'moment';
import Home from './components/HomeScreen/Home';
import Navigation from './components/HomeScreen/Navigation';
import RequestSection from './components/RequestSection/RequestSection';
import hardcodedsubjects from './subjectData';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trequests: [],
      subjects: []
    };
  }

  componentWillMount() {
    fire.database().ref('trequests').on('value', (snapshot) => {
      const trequestObj = snapshot.val();
      const trequests = [];
      if (trequestObj) {
        Object.keys(trequestObj).forEach((e) => {
          const trequest = {
            byTutor: trequestObj[e].byTutor,
            date: trequestObj[e].date,
            group: trequestObj[e].group,
            name: trequestObj[e].name,
            status: trequestObj[e].status,
            subject: trequestObj[e].subject,
            id: e
          };
          trequests.push(trequest);
        });
        this.setState({ trequests }, () => console.log(this.state.trequests));
      }
    }).bind(this);
  }

  // Using hardcoded subjects when fetching fail
  renderSubjects() {
    const { subjects } = this.state;
    if (subjects.length === 0) {
      return hardcodedsubjects.sort((a, b) => (a.name > b.name) - (a.name < b.name));
    }
    return subjects;
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
                  subjects={this.renderSubjects()}
                />
              )}
            />
            <Route
              path="/request"
              render={() => (
                <RequestSection
                  trequests={this.state.trequests}
                />
              )}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}
