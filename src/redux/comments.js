import { COMMENTS } from '../shared/comments';
import * as ActionTypes from './ActionTypes';

export const Comments = (state = COMMENTS, action) => {
    switch (action.type) {
        case ActionTypes.ADD_COMMENT:       // if actiontypes is an add comment
            const comment = action.payload; // action.payload is an object 
            comment.id = state.length;      // add an id which will be the length of the comment's array
            comment.date = new Date(). toISOString();   // add the current date 
            return state.concat(comment);   // return the new state
            // .concat() lets us attach a new item to the end of an array without changing the original (creates new array)
        default:
            return state;
    }
};