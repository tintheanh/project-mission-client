import React, { Component } from 'react';
import Request from './Request';

class RequestList extends Component {
  render() {
    return (
      <div>
        <ul style={{ float: 'left' }}>{
        this.props.trequests.map((req) => {
          if (req.subject === 'Math 3A') {
            return (<Request
              trequest={req}
              key={req.id}
              {...this.props}
            />);
          }
        })
      }
        </ul>
        <ul style={{float: 'right'}}>{
        this.props.trequests.map((req) => {
          if (req.subject === 'Physics 4A') {
            return (<Request
              trequest={req}
              key={req.id}
              {...this.props}
            />);
          }
        })
      }
        </ul>
      </div>
    );
  }
}

export default RequestList;
