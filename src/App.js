import React, { Component } from 'react';
import firebase from 'firebase';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import { db } from './index';
import Home from './components/HomeScreen/Home';
import Navigation from './components/HomeScreen/Navigation';
import RequestSection from './components/RequestSection/RequestSection';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subjects: []
    };
  }

  componentDidMount() {
    // db.collection('trequest').get().then((snapshot) => {
    //   console.log('Document data:', snapshot.docs);
    //   snapshot.docs.forEach(doc => console.log(doc.data()));
    // }).catch((error) => {
    //   console.log('Error getting document:', error);
    // });
    firebase.database().ref('subjects').on('value', (snapshot) => {
      const subjectObj = snapshot.val();
      const subjects = [];
      if (subjectObj) {
        Object.keys(subjectObj).forEach((e) => {
          const subject = {
            group: subjectObj[e].group,
            name: subjectObj[e].name,
            id: e
          };
          subjects.push(subject);
        });
        this.setState({ subjects });
      }
    }).bind(this);
  }

  renderSubjects() {
    const { subjects } = this.state;
    if (subjects.length !== 0) {
      return subjects.sort((a, b) => (a.name > b.name) - (a.name < b.name));
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
                <RequestSection />
              )}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}
