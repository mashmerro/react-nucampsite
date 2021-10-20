import React, { Component } from 'react';   // import react and component from React library
import { Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem, Jumbotron } from 'reactstrap';    // import from  reactstrap
import { NavLink } from 'react-router-dom';

class Header extends Component {
    constructor(props) {
        super(props);
        this.toggleNav = this.toggleNav.bind(this); // bind event handler to the component, when toggle nav is called, refers to the correct component
        this.state = {
            isNavOpen: false
        };
    }

    // When the navbar toggler is clicked
    toggleNav() {               // When triggered,
        this.setState({         //  will change this.state (setState) to opposite of its current state
            isNavOpen: !this.state.isNavOpen    // 'isNavOpen' becomes true
        });
    }
    render() {
        return(     // <React.Fragment>   : since we're returning multiple elements, use this to wrap around it to return a single top level component
            <React.Fragment>    
                <Jumbotron fluid>
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <h1>NuCamp</h1>
                                <h2>a better way to camp</h2>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
                <Navbar dark sticky="top" expand="md">  
                        <div className="container">
                            <NavbarBrand className="mr-auto" href="/"><img src="/assets/images/logo.png" 
                                height="30" width="30" alt="NuCamp Logo" /></NavbarBrand>
                            <NavbarToggler onClick={this.toggleNav} />
                            <Collapse isOpen={this.state.isNavOpen} navbar>
                                <Nav navbar>
                                    <NavItem>
                                        <NavLink className="nav-link" to="/home">
                                            <i className="fa fa-home fa-lg" /> Home
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className="nav-link" to="/directory">
                                            <i className="fa fa-list fa-lg" /> Directory
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className="nav-link" to="/aboutus">
                                            <i className="fa fa-info fa-lg" /> About
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className="nav-link" to="/contactus">
                                            <i className="fa fa-address-card fa-lg" /> Contact Us
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                            </Collapse>
                        </div>
                </Navbar>
            </React.Fragment>
        );
    }
}
// <NavbarToggler> : creates a toggle button that will call the onClick event handler
// <Collapse>   : depending on the current state (true or false [toggled or not]) 
// <NavItem>    : list item on a nav
// <NavLink>    : indicates it's a link on the nav
export default Header;