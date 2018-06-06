import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import RequestForm from './RequestForm';
import RequestList from './RequestList';

class RequestSection extends Component {
  render() {
    return (
      <div className="support panel panel-primary">
        
        <Switch>
          <Route exact path="/" render={() => <RequestForm {...this.props} />} />
          <Route path="/request" render={() => <RequestList {...this.props} />} />
        </Switch>
        {/* <RequestList {...this.props} /> */}
        {/* <RequestForm {...this.props} /> */}
      </div>

    );
  }
}

export default RequestSection;
