import * as ActionTypes from './ActionTypes';       // ActionTypes is a namespace
// * is a wildcard that lets us import all named exports from ActionTypes.js at once

import { CAMPSITES } from '../shared/campsites';
// temp to use for our server simulation (since we don't have it connected to the server)

// Action creator to return an object with 'type' property
export const addComment = (campsiteId, rating, author, text) => ({  // pass the values needed to add a comment
    type: ActionTypes.ADD_COMMENT,  // 'ActionTypes' we imported, .ADD_COMMENT lets us access that export that we made from ActionTypes.js
    payload: {
        campsiteId: campsiteId,
        rating: rating,
        // or in ES6, you can pass the same property names and values by:
        author,
        text
    }
});

// Action creator that is being thunked (intercepted because of server connection)
// Wehn 'fetchCampsites' gets dispatched, it also dispatches 'campsitesLoading'
export const fetchCampsites = () => dispatch => {   // 2 arrow functions = nested functions (since we enabled redux thunk, we can do this syntax)
    dispatch(campsitesLoading());   // use dispatch method to dispatch a different action (function below after this)

    setTimeout(() => {      // setTimeout((function), 2000ms) : will return a delay of 2 seconds then dispatches another action along with data from campsites array
        dispatch(addCampsites(CAMPSITES));
    }, 2000);
};

// Standard action creator to return object and goes straight to reducer
export const campsitesLoading = () => ({    // dispatched from 'fetchCampsites' (function above before this)
    type: ActionTypes.CAMPSITES_LOADING
});

// Action creator for when campsites failed that passes error message
export const campsitesFailed = errMess => ({
    type: ActionTypes.CAMPSITES_FAILED,
    payload: errMess
});

// Standard action creator to return object and goes straight to reducer
export const addCampsites = campsites => ({
    type: ActionTypes.ADD_CAMPSITES,
    payload: campsites
});