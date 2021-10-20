/** TASK 1: **/ 
// Use react and its components from the React library
import React, { Component } from 'react';
// Custom components we made
import Directory from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import About from './AboutComponent'
import Contact from './ContactComponent';
// React router dom components we downloaded
import { Switch, Route, Redirect } from 'react-router-dom';  
// js in shared folder containing all objects  
import { CAMPSITES } from '../shared/campsites';     
import { COMMENTS } from '../shared/comments';
import { PARTNERS } from '../shared/partners';
import { PROMOTIONS } from '../shared/promotions';

class Main extends Component {
    constructor(props) {                 // // 'props' : keyword in React | constructor is not always required  |   use the array from campsites.js to set the local state
        super(props);                    // 'this.props' is already in the 'Component' parent class so use 'super()'
        this.state =   {                  // 'state' : property in React that always holds an object. 'campsites' is its property with diff arr
            campsites: CAMPSITES,
            comments: COMMENTS,
            partners: PARTNERS,
            promotions: PROMOTIONS
        };
    }

    render() {  
        const HomePage = () => {
            return(
                <Home 
                    campsite={this.state.campsites.filter(campsite => campsite.featured)[0]}
                    promotion={this.state.promotions.filter(promotion => promotion.featured)[0]}
                    partner={this.state.partners.filter(partner => partner.featured)[0]}
                />
            );
        }   //  locally scope, only accessible inside the Main component
        // 3 components, each item that we want to feature on the homepage (featured campsites, featured promotions, featured partners)

        const CampsiteWithId = ({match}) => {
            return (
                <CampsiteInfo 
                    campsite={this.state.campsites.filter(campsite => campsite.id === +match.params.campsiteId)[0]} 
                    comments={this.state.comments.filter(comment => comment.campsiteId === +match.params.campsiteId)}
                />
            );
        }   // take the campsite id and since it is stored as a string, convert it to a number with '+match.params.campsiteId'
            // since filter returns an array and we only want the campsite object, use [0]

        return (
            <div>
                <Header />
                <Switch>
                    <Route path='/home' component={HomePage} />
                    <Route exact path='/directory' render={() => <Directory 
                        campsites={this.state.campsites} />} /> 
                    <Route path='/directory/:campsiteId' component={CampsiteWithId} /> 
                    <Route exact path='/aboutus' render={() => <About 
                        partners={this.state.partners} />} /> 
                    <Route exact path='/contactus' component={Contact} />
                    <Redirect to='/home' />
                </Switch>
                <Footer />
            </div>  // pass the array down as 'props' to DirectoryComponent
            // <Route> are similar to case in a switch statement
            // <Route path='/home' component={HomePage} />  
            //          : any traffic that tries to go to the path '/home' to the HomePage component
            // <Route exact path='/directory' render={() => <Directory campsites={this.state.campsites} />} />  
            //          : match exact path, returns Directory component
            //          : if you need to pass state data as props that you're routing to, USE RENDER()
            // <Route path='/directory/:campsiteId' component={CampsiteWithId} />
            //          : the colon in '/directory/:campsiteId' indicates that campsiteId is a parameter
            // <Redirect to='/home' />
            //          : acts as a default statement in a switch statement, if no paths, goes straight here
        );
    };
}

export default Main;