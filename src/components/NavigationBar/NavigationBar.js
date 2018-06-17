import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, NavItem, Nav, MenuItem, NavDropdown } from 'react-bootstrap';

export class NavigationBar extends Component {
    constructor(props){
        super(props);
        this.state={
            numLinks: 2,
            linkStyles: [],
            activeIndex: 0,
            oldActiveIndex: 0
        };
    }

    componentWillMount() {
        var linkStylesArr = [];
        for (var i = 0; i < this.state.numLink; i++) {
            linkStylesArr.push(this.styles.inactiveLinkStyle);
        }
        linkStylesArr[this.state.activeIndex] = styles.activeLinkStyle;
        this.setState({linkStyles: linkStylesArr});
    }

    setActiveLink(index) {
        if (index >= 0 && index !== null) {
            var linkStylesArr = this.state.linkStyles;
            var { oldActiveIndex, activeIndex } = this.state;

            linkStylesArr[activeIndex] = styles.inactiveLinkStyle;
            linkStylesArr[index] = styles.activeLinkStyle;
            this.setState({
                linkStyles: linkStylesArr,
                oldActiveIndex: activeIndex,
                activeIndex: index,
            });
        }
    }

    render() {
        return(
            <Navbar style={{marginBottom:'10vh'}}>
                <Nav style={{flex: 1, flexDirection:'row'}}>
                    <NavItem 
                        style={this.state.linkStyles[0]}
                        onClick={() => this.setActiveLink(0)}
                        className='col-md-5 offset-md-1 text-center'
                    >
                        <Link style={{textDecoration:'none', color:'rgb(0,106,114)'}} to='/'><h3>Home</h3></Link>
                    </NavItem>
                    <NavItem
                        style={this.state.linkStyles[1]}
                        onClick={() => this.setActiveLink(1)}
                        className='col-md-5 offset-md-1 text-center'
                    >
                        <Link style={{textDecoration:'none', color:'rgb(0,106,114)'}} to='/requests'><h3>Requests</h3></Link>
                    </NavItem>
                </Nav>
            </Navbar>
        );
    }
}

const styles = {
    activeLinkStyle: {
        borderBottom: 'solid 5px rgb(0,106,114)'
    },
    inactiveLinkStyle: {
        borderBottom: 'none'
    }
}