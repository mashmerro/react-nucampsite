import React, { Component } from 'react';   // import react and component from React library
import { Navbar, NavbarBrand, Jumbotron } from 'reactstrap';    // import from  reactstrap

class Header extends Component {
    render() {
        return(     // React.Fragment   : since we're returning multiple elements, use this to wrap around it to return a single top level component
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
                <Navbar dark sticky="top">
                        <div className="container">
                            <NavbarBrand href="/">NuCamp</NavbarBrand>
                        </div>
                </Navbar>
            </React.Fragment>
        );
    }
}

export default Header;