// Creates a variable ADD_COMMENT and set its value to the string to export
export const ADD_COMMENT = 'ADD_COMMENT';  
// For when app is loading the campsites data and it hasn't received the data yet (made a request but waiting for a response):
export const CAMPSITES_LOADING = 'CAMPSITES_LOADING';
// If our server failed for some reason and we weren't able to load the data (lets redux store know so state can update to show error message):
export const CAMPSITES_FAILED = 'CAMPSITE_FAILED';
// Dispatches when campsites data successfully retrieves from the server and can safely add to the state
export const ADD_CAMPSITES = 'ADD_CAMPSITES';

export const ADD_COMMENTS = 'ADD_COMMENTS';
export const COMMENTS_FAILED = 'COMMENTS_FAILED';
export const PROMOTIONS_LOADING ='PROMOTIONS_LOADING';
export const ADD_PROMOTIONS = 'ADD_PROMOTIONS';
export const PROMOTIONS_FAILED = 'PROMOTIONS_FAILED';