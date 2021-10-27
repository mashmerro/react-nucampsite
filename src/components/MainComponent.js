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
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';  
// React redux component we downloaded
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import { addComment, fetchCampsites } from '../redux/ActionCreators';   // for dispatching

// All the state is now stored in /src/redux/reducer.js so pass it in
const mapStateToProps = state => {
    return {
        campsites: state.campsites,
        comments: state.comments,
        partners: state.partners,
        promotions: state.promotions
    }
};  // then add this object in the export connect()

// For dispatching, can set it up as a function or an object (recommentded)
const mapDispatchToProps = {
    addComment: (campsiteId, rating, author, text) => (addComment(campsiteId, rating, author, text)), 
    fetchCampsites: () => (fetchCampsites()),
    // (function parameters) => (returns action creator(for each parameters))
    resetFeedbackForm: () => (actions.reset('feedbackForm'))    // from configureStore.js
};  // then add this object in the export connect()

class Main extends Component {
    
    // fetch the campsites data as soon as we render the main components to the DOM
    componentDidMount() {   // built-in react lifecycle method when there are certain points that it gets created/ updated to or gets removed from the DOM 
        this.props.fetchCampsites();
    }

    render() {  
        const HomePage = () => {
            return(
                <Home 
                    // Before: this.props.campsites was holding campsites array[...]
                    // Now: this.props.campsites is holding {isLoading: false, errMess: null, campsites array[...]}
                    campsite={this.props.campsites.campsites.filter(campsite => campsite.featured)[0]}
                    campsitesLoading={this.props.campsites.isLoading}
                    campsitesErrMess={this.props.campsites.errMess}
                    promotion={this.props.promotions.filter(promotion => promotion.featured)[0]}
                    partner={this.props.partners.filter(partner => partner.featured)[0]}
                />
            );
        }   //  locally scope, only accessible inside the Main component
        // 3 components, each item that we want to feature on the homepage (featured campsites, featured promotions, featured partners)

        const CampsiteWithId = ({match}) => {
            return (
                <CampsiteInfo 
                    campsite={this.props.campsites.campsites.filter(campsite => campsite.id === +match.params.campsiteId)[0]} 
                    isLoading={this.props.campsites.isLoading}
                    errMess={this.props.campsites.errMess}
                    comments={this.props.comments.filter(comment => comment.campsiteId === +match.params.campsiteId)}
                    addComment={this.props.addComment}  // pass addComment object (from mapDispatchToProps) as a prop
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
                        campsites={this.props.campsites} />} /> 
                    <Route path='/directory/:campsiteId' component={CampsiteWithId} /> 
                    <Route exact path='/aboutus' render={() => <About 
                        partners={this.props.partners} />} /> 
                    <Route exact path='/contactus' render={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />} />
                    <Redirect to='/home' />
                </Switch>
                <Footer />
            </div>  // pass the array down as 'props' to DirectoryComponent
            // <Route> are similar to case in a switch statement
            // <Route path='/home' component={HomePage} />  
            //          : any traffic that tries to go to the path '/home' to the HomePage component
            // <Route exact path='/directory' render={() => <Directory campsites={this.props.campsites} />} />  
            //          : match exact path, returns Directory component
            //          : if you need to pass state data as props that you're routing to, USE RENDER()
            // <Route path='/directory/:campsiteId' component={CampsiteWithId} />
            //          : the colon in '/directory/:campsiteId' indicates that campsiteId is a parameter
            // <Redirect to='/home' />
            //          : acts as a default statement in a switch statement, if no paths, goes straight here
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));  
// withRouter: so that React Router still works 
//      (connect: the state object that's stored in the Redux store (mapStateToProps, 
//          mapDispatchToProps) made the addComment Action creator function available inside (Main component as a prop))