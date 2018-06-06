import React, { Component } from 'react';

class RequestForm extends Component {
  state = {tinput: '', ninput: ''}
  onSubmit(e) {
    e.preventDefault();
    const node1 = this.refs.trequest;
    const node2 = this.refs.name;
    const trequestName = this.state.tinput;
    const name = this.state.ninput;

    const data = {
      name: this.state.ninput,
      subject: this.state.tinput
    }
    this.props.addTrequest(data);
    // console.log(name);
    node1.value = '';
    node2.value = '';
  }
  render() {
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <div className="form-group">
          <input
            className="form-control"
            placeholder="Enter name"
            type="text"
            onChange={e => this.setState({ ninput: e.target.value })}
            ref="name"
          />
          <input
            className="form-control"
            placeholder="Enter subject"
            type="text"
            onChange={e => this.setState({ tinput: e.target.value })}
            ref="trequest"
          />
          <input type="submit" value="Submit" />
        </div>

      </form>
    );
  }
}

export default RequestForm;
