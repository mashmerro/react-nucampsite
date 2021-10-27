// Receive campsites data from ActionTypes.js
import * as ActionTypes from './ActionTypes';

// Reducer
export const Campsites = (state = {
        isLoading: true,
        errMess: null,
        campsites: []
    }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_CAMPSITES:
            return {...state, isLoading: false, errMess: null, campsites: action.payload};
            // returns new state {get the old state, update the values to no longer loading, 
            //                      there's no error message, and campsites array will be populated by payload }
        case ActionTypes.CAMPSITES_LOADING:
            return {...state, isLoading: true, errMess: null, campsites: []};
            // returns new state {get the old state, update the values to loading, 
            //                      there's no error message, and campsites array will be empty because it hasn't finished loading the data yet }
        case ActionTypes.CAMPSITES_FAILED:
            return {...state, isLoading: false, errMess: action.payload};
        default:
            return state;
    }
};
// 1st arg (state) : takes the previous state in Redux store that's going to be changed by the reducer
// the first time reducer is called, 'state' does not exist so initialize it with 'CAMPSITES' imported data
// 2nd arg (action)
