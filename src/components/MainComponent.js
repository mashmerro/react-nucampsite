import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap'; 
import Directory from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import { CAMPSITES } from '../shared/campsites';     // { CAMPSITES }: what we named our Component to use, from src/shared/campsites.js

class Main extends Component {
    constructor(props) {                 // // 'props' : keyword in React | constructor is not always required  |   use the array from campsites.js to set the local state
        super(props);                    // 'this.props' is already in the 'Component' parent class so use 'super()'
        this.state =   {                  // 'state' : property in React that always holds an object. 'campsites' is its property with diff arr
            campsites: CAMPSITES,
            selectedCampsite: null       // this will keep track of what campsite the user last selected (null for nothing selected yet)
        };
    }

    // Method whenever the campsite is clicked
    onCampsiteSelect(campsiteId) {        
        // DON'T CHANGE THE STATE BY REASSIGNING:   
        //  > this.state.selectedCampsite = campsite;
        // The constructor is the only place to assign properties to the state directly
        // ALWAYS use setState outside of constructor
        this.setState({selectedCampsite: campsiteId});    // change the selectedCampsite's property to the campsite id ONLY
    }

    render() {
        return (
            <div>
                <Navbar dark color="primary">
                <div className="container">
                    <NavbarBrand href="/">NuCamp</NavbarBrand>
                </div>
                </Navbar>
                <Directory campsites={this.state.campsites} onClick={campsiteId => this.onCampsiteSelect(campsiteId)} />  
                <CampsiteInfo campsite={this.state.campsites.filter(campsite => campsite.id === this.state.selectedCampsite)[0]}></CampsiteInfo>   
            </div>  // pass the array down as 'props' to DirectoryComponent
            // CampsiteInfo is returning an object. Extract with [0] index number and will send 1 campsite object
        );
    };
}

export default Main;
