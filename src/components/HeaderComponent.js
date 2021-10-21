import React, { Component } from 'react';   // import react and component from React library
import { Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem, Jumbotron,
    Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label } from 'reactstrap';    // import from  reactstrap
import { NavLink } from 'react-router-dom';

class Header extends Component {
    constructor(props) {
        super(props);        
        this.state = {  // initializes nav and modal to not open
            isNavOpen: false,
            isModalOpen: false
        };
        this.toggleNav = this.toggleNav.bind(this); // bind event handler to the component, when using 'this' inside a method
        this.toggleModal = this.toggleModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    // When the navbar toggler is clicked
    toggleNav() {               // When triggered,
        this.setState({         //  will change this.state (setState) to opposite of its current state
            isNavOpen: !this.state.isNavOpen    // 'isNavOpen' becomes true
        });
    }

    // When the modal is clicked
    toggleModal() {             // When triggered,
        this.setState({         //  will change this.state (setState) to opposite of its current state
            isModalOpen: !this.state.isModalOpen    // 'isModalOpen' becomes true
        });
    }

    handleLogin(event) {    // since we don't have a back-end to handle login data, this prints what the user input after logging in
        alert(`Username: ${this.username.value} Password: ${this.password.value} Remember: ${this.remember.checked}`);
        this.toggleModal();         // fire toggleModal method
        event.preventDefault();     // arg to prevent refreshing the page when form is submitted
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
                                <span className="navbar-text ml-auto">
                                    <Button outline onClick={this.toggleModal}>
                                        <i className="fa fa-sign-in fa-lg" /> Login
                                    </Button>
                                </span>
                            </Collapse>
                        </div>
                </Navbar>

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleLogin}>
                            <FormGroup>
                                <Label htmlFor="username">Username</Label>
                                <Input type="text" id="username" name="username" innerRef={input => this.username = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password" innerRef={input => this.password = input} />
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" name="remember" innerRef={input => this.remember = input} />
                                    Remember me
                                </Label>
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Login</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}

export default Header;

// <NavbarToggler> : creates a toggle button that will call the onClick event handler
// <Collapse>   : depending on the current state (true or false [toggled or not]) 
// <NavItem>    : list item on a nav
// <NavLink>    : indicates it's a link on the nav
// 'isOpen' attribute   : built-in React strap Modal attribute that checks if Modal is open or closed
// 'toggle' attribute   : Modal attribute for when it's toggled (can open or close Modal)