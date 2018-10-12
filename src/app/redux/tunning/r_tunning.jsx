// import * as ApiEndpoints from '../const/rest_api.jsx';
import fetch from 'cross-fetch';

import appConfig from 'appConfig'; //this project's config: src/appConfig.json
import * as actions from 'redux/tunning/r_tunning_actions.jsx';

const defaultState = {
    fields: {},
    error: null,
}//defaultState


// "..." is a "spread operator". Source:
//https://medium.com/@thejasonfile/using-the-spread-operator-in-react-setstate-c8a14fc51be1

//Update Node Graph with a new state. Note, since by the laws of React, State is
//immutable, therefore - can't just add nodes and links. Thus, need to use "spread
//operator (...state)" to create a "new" state object, modify that, and return it.
const TunningReducer = (state = defaultState, action) => {
    switch (action.type) {

        case actions.SET_WEIGHT:
            return {
                ...state,
            }

        default:
            console.warn("Deafult GraphReducer state! This should not happened!");
            return state;

    }//switch
};


export default TunningReducer;