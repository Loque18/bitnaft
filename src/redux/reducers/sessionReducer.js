/* eslint-disable default-param-last */
import { LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE, LOG_OUT_REQUEST, LOG_OUT_SUCCESS } from '../constants';

const defaultState = {
    session: {},
    isLoggedIn: false,
    loading: false,
    failure: false,
    success: false,
    errorMessage: false,
};

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case LOG_IN_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case LOG_IN_SUCCESS:
            return {
                ...defaultState,
                isLoggedIn: true,
                success: true,
                session: action.payload,
            };

        case LOG_IN_FAILURE:
            return {
                ...defaultState,
                failure: true,
                errorMessage: action.payload,
            };

        case LOG_OUT_SUCCESS:
            return {
                ...defaultState,
            };

        case LOG_OUT_REQUEST:
        default:
            return state;
    }
};

export default reducer;
