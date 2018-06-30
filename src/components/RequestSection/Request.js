import React, { Component } from 'react';
import moment from 'moment';

class Request extends Component {
  render() {
    const { trequest } = this.props;
    return (
      <li>
        {trequest.checked ? 'true' : 'false'}
        {moment(trequest.date, 'MMMM Do YYYY, h:mm:ss a').valueOf()}
      </li>
    );
  }
}

export default Request;

