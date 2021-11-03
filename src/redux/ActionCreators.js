import * as ActionTypes from './ActionTypes';       // ActionTypes is a namespace
// * is a wildcard that lets us import all named exports from ActionTypes.js at once

import { baseUrl } from '../shared/baseUrl';
// import json server (where we're storing our database arrays)

// Action creator that is being thunked (intercepted because of server connection)
// Wehn 'fetchCampsites' gets dispatched, it also dispatches 'campsitesLoading'
export const fetchCampsites = () => dispatch => {   // 2 arrow functions = nested functions (since we enabled redux thunk, we can do this syntax)
    dispatch(campsitesLoading());   // use dispatch method to dispatch a different action (function below after this)

    return fetch(baseUrl + 'campsites')             // url + location of campsites folder (inside is campsites data)
        .then(response => {
                if (response.ok) {  // .ok is status code for success (200-299)
                    return response;
                } else {    // else, create an error object and throw to the catch block
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);    // '.status' and '.statusText' are built-in properties that fetches response object
                    error.response = response;
                    throw error;    // Output: "Error 404: Not Found"
                }
            },
            error => {  // another callback rejected promise that we didn't get a response from the server at all
                const errMess = new Error(error.message);       
                throw errMess;      // Output: "Failed to fetch"
            }
        )  // server could've returned a bad response (404) but this promise is considered resolved as long as it has a response that there's been an error
        .then(response => response.json())          // call to fetch returns a promise (converts response from json into javascript (which is the array of campsites))
        .then(campsites => dispatch(addCampsites(campsites)))      // chain another method. grab the successful fetch and dispatch with(addCampsites action creator)
        .catch(error => dispatch(campsitesFailed(error.message)));
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

/* COMMENTS */
export const fetchComments = () => dispatch => {
    return fetch(baseUrl + 'comments') 
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            }
        )
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)));
};

export const commentsFailed = errMess => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errMess
});

export const addComments = comments => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const addComment = comment => ({
    type: ActionTypes.ADD_COMMENT,  // 'ActionTypes' we imported, .ADD_COMMENT lets us access that export that we made from ActionTypes.js
    payload: comment
});

// Action creator using thunk and middleware to handle asynchronous calls
export const postComment = (campsiteId, rating, author, text) => dispatch => {  // pass the values needed to add a comment
    const newComment = {
        campsiteId: campsiteId,
        rating: rating,
        // or in ES6, you can pass the same property names and values by:
        author,
        text
    };
    newComment.date = new Date().toISOString();

    return fetch(baseUrl + 'comments', {
        method: "POST", // "GET" is the default if you don't specify the method
        body: JSON.stringify(newComment),   // JSON encoded version of the comment we created
        headers: {
            "Content-Type" : "application/json" // so the server knows to format body as json
        }
    })
    
    // Resolve & Reject
    .then(response => {
            if (response.ok) {
                return response;
            } else {
                const error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        },
        error => { throw error; }   // promise is rejected throws an error to next catch block
    )
    .then(response => response.json())   // if successful, convert json to js object
    .then(response => dispatch(addComment(response))) // then dispatch with addComment action creator so that the redux store can be updated
    .catch(error => {       // catch rejected or throws for error prompt
        console.log('post comment', error.message);
        alert('Your comment could not be posted\nError: ' + error.message);
    });
};

/* PROMOTIONS */
export const fetchPromotions = () => dispatch => {
    dispatch(promotionsLoading());

    return fetch(baseUrl + 'promotions')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            }
        )
        .then(response => response.json())
        .then(promotions => dispatch(addPromotions(promotions)))
        .catch(error => dispatch(promotionsFailed(error.message)));
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

/* PARTNERS */
export const fetchPartners = () => dispatch => {
    dispatch(partnersLoading());

    return fetch(baseUrl + 'partners')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            }
        )
        .then(response => response.json())
        .then(partners => dispatch(addPartners(partners)))
        .catch(error => dispatch(partnersFailed(error.message)));
}

export const addPartners = partners => ({
    type: ActionTypes.ADD_PARTNERS,
    payload: partners
});

export const partnersLoading = () => ({
    type: ActionTypes.PARTNERS_LOADING,
});

export const partnersFailed = errMess => ({
    type: ActionTypes.PARTNERS_FAILED,
    payload: errMess
});

export const postFeedback = (feedback) => dispatch => {  

    return fetch(baseUrl + 'feedback', {
        method: "POST",
        body: JSON.stringify(feedback),  
        headers: {
            "Content-Type" : "application/json" 
        }
    })
    
    .then(response => {
            if (response.ok) {
                return response;
            } else {
                const error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        },
        error => { throw error; }   
    )
    .then(response => response.json())   
    .then(response => {
            alert("Thank you for your feedback.\n" + JSON.stringify(response));
        }
    )
    .catch(error => {      
        console.log('post feedback', error.message);
        alert('Your feedback could not be posted\nError: ' + error.message);
    });
};

