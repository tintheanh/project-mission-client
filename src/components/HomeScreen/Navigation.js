import React, { Component } from 'react';
import {
  Navbar, Nav, NavItem, NavLink,
  Modal, ModalHeader, ModalBody, ModalFooter,
  Form, FormGroup, Label, Input,
  Button
} from 'reactstrap';
import { Link } from 'react-router-dom';
import firebase from 'firebase';

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: false,
      modal: false,
      email: ''
    };
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ auth: true });
      } else {
        this.setState({ auth: false });
      }
    });
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  handleSubmit() {
    firebase.auth().signInWithEmailAndPassword(`${this.state.email}@asc.com`, '123456')
      .then(() => {
        this.setState({
          email: ''
        });
        this.toggle();
        alert('Login successfully.');
      })
      .catch((err) => {
        alert(err);
      });
  }

  render() {
    return (
      <Navbar light expand style={styles.navStyle}>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink tag="span"><Link to="/">Home</Link></NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag="span"><Link to="/request">Request</Link></NavLink>
          </NavItem>
          { this.state.auth
            ? (
              <NavItem onClick={() => firebase.auth().signOut().then(alert('You have been logged out.'))}>
                <NavLink tag="span"><Link to="#">Logout</Link></NavLink>
              </NavItem>
            )
            : (
              <NavItem onClick={() => this.setState({ modal: true })}>
                <NavLink tag="span"><Link to="#">For Tutor</Link></NavLink>
              </NavItem>
            ) }
        </Nav>
        <Modal isOpen={this.state.modal} toggle={this.toggle.bind(this)}>
          <ModalHeader toggle={this.toggle.bind(this)}>Tutor Login</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label>Tutor ID</Label>
                <Input type="email" onChange={e => this.setState({ email: e.target.value })} value={this.state.email} />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.handleSubmit()}
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

export default Navigation;
