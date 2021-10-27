import { createStore, combineReducers, applyMiddleware } from 'redux';   // combine your 4 reducers (redux/campsite.js, comments.js. promotions.js, partners.js)
import { createForms } from 'react-redux-form'; // makes it easy to setup reducers to update state when new form values are submitted
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Campsites } from './campsites';
import { Comments } from './comments';
import { Partners } from './partners';
import { Promotions } from './promotions';
import { InitialFeedback } from './forms';

export const ConfigureStore = () => {
    const store = createStore (     // 'createStore' from redux library
        combineReducers({           // reducers as properties
            campsites: Campsites,
            comments: Comments, 
            partners: Partners,
            promotions: Promotions,
            ...createForms({
                feedbackForm: InitialFeedback   // feedbackForm = model name with 'InitialFeedback' object as its value
            })
        }),
        applyMiddleware(thunk, logger)  // enables use of thunk and logger
    );
    return store;
};