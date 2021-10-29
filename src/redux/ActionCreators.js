import * as ActionTypes from './ActionTypes';       // ActionTypes is a namespace
// * is a wildcard that lets us import all named exports from ActionTypes.js at once

import { baseUrl } from '../shared/baseUrl';
// import json server (where we're storing our database arrays)

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

    return fetch(baseUrl + 'campsites')             // url + location of campsites folder (inside is campsites data)
        .then(response => response.json())          // call to fetch returns a promise (converts response from json into javascript (which is the array of campsites))
        .then(campsites => dispatch(addCampsites(campsites)));      // chain another method. grab the successful fetch and dispatch with(addCampsites action creator)
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

export const fetchComments = () => dispatch => {
    return fetch(baseUrl + 'comments') 
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)));
};

export const commentsFailed = errMess => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errMess
});

export const addComments = comments => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const fetchPromotions = () => dispatch => {
    dispatch(promotionsLoading());

    return fetch(baseUrl + 'promotions')
        .then(response => response.json())
        .then(promotions => dispatch(addPromotions(promotions)));
}

export const promotionsLoading = () => ({
    type: ActionTypes.PROMOTIONS_LOADING
})

export const promotionsFailed = errMess => ({
    type: ActionTypes.PROMOTIONS_FAILED,
    payload: errMess
});

export const addPromotions = promotions => ({
    type: ActionTypes.ADD_PROMOTIONS,
    payload: promotions
});