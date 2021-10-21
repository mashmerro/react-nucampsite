import { createStore } from 'redux';
import { Reducer, initialState } from './reducer';      // custom file made

export const ConfigureStore = () => {
    const store = createStore (     // 'createStore' from redux library
    // Takes 2 args (which are both functions) from reducer.js
        Reducer,
        initialState
    );
    return store;
};