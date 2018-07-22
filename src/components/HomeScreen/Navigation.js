import React, { Component } from 'react';
import {
  Navbar,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { loginUser, logoutUser } from '../redux/actions';

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.loggedIn !== prevState.loggedIn)
      return nextProps.loggedIn;
    return prevState;
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
          { this.state.loggedIn ?           
            <NavItem onClick={()=>this.props.logoutUser()}>
              <NavLink tag="span">Logout</NavLink>
            </NavItem>:
            <NavItem>
              <NavLink tag="span">Login</NavLink>
            </NavItem> }
        </Nav>
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
  const { loggedIn, ...rest } = state;
  return { loggedIn, rest };
}

export default connect(mapStateToProps, {loginUser, logoutUser})(Navigation);
