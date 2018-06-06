import React, { Component } from 'react';

class Request extends Component {
  onClick(e) {
    e.preventDefault();
    const { trequest } = this.props;
  }
  render() {
    const { trequest } = this.props;
    return (
      <li>
        {trequest.name}
      </li>
    );
  }
}

export default Request;

