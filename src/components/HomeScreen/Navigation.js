import React from 'react';
import {
  Navbar,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import { Link } from 'react-router-dom';

const Navigation = () => (
  <Navbar light expand="md" style={styles.navStyle}>
    <Nav className="ml-auto" navbar>
      <NavItem>
        <NavLink tag="span"><Link to="/">Home</Link></NavLink>
      </NavItem>
      <NavItem>
        <NavLink tag="span"><Link to="/request">Request</Link></NavLink>
      </NavItem>
    </Nav>
  </Navbar>
);

const styles = {
  navStyle: {
    backgroundColor: '#1A3B2B',
    opacity: '0.62'
  }
};

export default Navigation;
