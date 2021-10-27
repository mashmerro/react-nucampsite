import { createStore, combineReducers, applyMiddleware } from 'redux';   // combine your 4 reducers (redux/campsite.js, comments.js. promotions.js, partners.js)
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Campsites } from './campsites';
import { Comments } from './comments';
import { Partners } from './partners';
import { Promotions } from './promotions';

export const ConfigureStore = () => {
    const store = createStore (     // 'createStore' from redux library
        combineReducers({           // reducers as properties
            campsites: Campsites,
            comments: Comments, 
            partners: Partners,
            promotions: Promotions
        }),
        applyMiddleware(thunk, logger)  // enables use of thunk and logger
    );
    return store;
};