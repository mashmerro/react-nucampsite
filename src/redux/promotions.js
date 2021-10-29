import * as ActionTypes from './ActionTypes';

export const Promotions = (state = { isLoading: true, errMess: null, promotions: [] }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_PROMOTIONS:
            return {...state, isLoading: false, errMess: null, promotions: action.payload}; 
            // return previous state with updated isLoading (will not load), errMess (no error message), and promotions array (payload)
        case ActionTypes.PROMOTIONS_LOADING:
            return{...state, isLoading: true, errMess: null, promotions: []}    
            // return previous state with updated isLoading (will load), errMess (no error message), and no promotions array
        case ActionTypes.PROMOTIONS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};
             // return previous state with updated isLoading (will not load), errMess (no error message), and errMess payload
        default:
            return state;
    }
};