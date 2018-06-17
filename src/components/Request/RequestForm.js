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
      <section className='text-center'>
        <h1>Welcome to MC Tutoring Center</h1>
        <h5>Please enter your name and subject that you need help with</h5>
        <form className='container' onSubmit={this.onSubmit.bind(this)}>
          <div className="form-group">
            <input
              style={{margin:5}}
              className="form-control"
              placeholder="Enter name"
              type="text"
              onChange={e => this.setState({ ninput: e.target.value })}
              ref="name"
            />
            <input
              style={{margin:5}}
              className="form-control"
              placeholder="Enter subject"
              type="text"
              onChange={e => this.setState({ tinput: e.target.value })}
              ref="trequest"
            />
            <input className='btn btn-primary' type='submit' value='Submit'/>
          </div>
        </form>
      </section>
    );
  }
}

export default RequestForm;
