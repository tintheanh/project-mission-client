import React, { Component } from 'react';
import {
  Navbar,Nav,NavItem, NavLink,
  Modal, ModalHeader, ModalBody, ModalFooter,
  Form, FormGroup, Label, Input,
  Button
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import firebase from 'firebase';

import { loginUser, logoutUser, setLoggedIn } from '../redux/actions';

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      modal: false,
      email: '',
      password: '',
      loggedIn: false
    };

    this.unsubscribeAuthListener = null;
  }

  componentDidMount() {
    this.unsubscribeAuthListener = firebase.auth().onAuthStateChanged(user => {
      if (user) 
        this.props.setLoggedIn(true);
      else
        this.props.setLoggedIn(false);
    })
  }

  componentWillUnmount() {
    this.unsubscribeAuthListener();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.user !== prevState.user)
      return ({ 
        ...prevState,
        user: nextProps.user,
        loggedIn: nextProps.loggedIn
      });
    return prevState;
  }

  toggle() {
    this.setState({ modal: !this.state.modal });
  }

  render() {
    return(
      <Navbar light expand style={styles.navStyle}>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink tag="span"><Link to="/">Home</Link></NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag="span"><Link to="/request">Request</Link></NavLink>
          </NavItem>
          { this.state.user ?           
            <NavItem onClick={()=>this.props.logoutUser()}>
              <NavLink tag="span"><Link to ="#">Logout</Link></NavLink>
            </NavItem>:
            <NavItem onClick={()=>this.setState({ modal: true })}>
              <NavLink tag="span"><Link to="#">Login</Link></NavLink>
            </NavItem> }
        </Nav>
          <Modal isOpen={this.state.modal} toggle={this.toggle.bind(this)}>
            <ModalHeader toggle={this.toggle.bind(this)}>Tutor Login</ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup>
                  <Label>Email</Label>
                  <Input type='email' placeholder='username@gmail.com' onChange={e => this.setState({email: e.target.value})} value={this.state.email}/>
                </FormGroup>
                <FormGroup>
                  <Label>Password</Label>
                  <Input type='password' onChange={e => this.setState({password: e.target.value})} value={this.state.password}/>
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" 
                onClick={() => {
                  this.props.loginUser(this.state.email, this.state.password);
                  this.toggle();
                }}
              >
                Login
              </Button>
            </ModalFooter>
          </Modal>
      </Navbar>
    );
  }
}

const styles = {
  navStyle: {
    backgroundColor: '#1A3B2B',
    opacity: '0.62'
  }
};

const mapStateToProps = state => {
  return { user: state.auth.user };
}

export default connect(mapStateToProps, {loginUser, logoutUser, setLoggedIn})(Navigation);
