import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, NavItem, Nav, MenuItem, NavDropdown } from 'react-bootstrap';

export class NavigationBar extends Component {
    render() {
        return(
            <Navbar style={{marginBottom:'3vh'}}>
                <Nav style={{flex: 1, flexDirection:'row'}}>
                    <NavItem className='col-md-5 offset-md-1 text-center' eventKey={1} href="#">
                        <Link to='/'> Home </Link>
                    </NavItem>
                    <NavItem className='col-md-5 offset-md-1 text-center' eventKey={2} href="#">
                        <Link to='/requests'> Requests </Link>
                    </NavItem>
                </Nav>
            </Navbar>
        );
    }
}