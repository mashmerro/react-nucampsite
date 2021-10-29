import * as ActionTypes from './ActionTypes';

export const Comments = (state = { errMess: null, comments: []}, action) => {   // state will now contain an object {initialized}, and action
    switch (action.type) {
        case ActionTypes.ADD_COMMENTS:
            return {...state, errMess: null, comments: action.payload};
        case ActionTypes.COMMENTS_FAILED:
            return {...state, errMess: action.payload};
        case ActionTypes.ADD_COMMENT:       // if actiontypes is an add comment
            const comment = action.payload; // action.payload is an object 
            return {...state, comments: state.comments.concat(comment)};   // return the new state with the newly updated comments property
            // .concat() lets us attach a new item to the end of an array without changing the original (creates new array)
        default:
            return state;
    }
};