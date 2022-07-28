/* eslint-disable default-param-last */
import {
    TRY_RECOVERING_SESSION,
    RECOVER_SESSION_SUCCESS,
    RECOVER_SESSION_FAILURE,
    LOG_IN_REQUEST,
    LOG_IN_SUCCESS,
    LOG_IN_FAILURE,
    LOG_OUT_REQUEST,
    LOG_OUT_SUCCESS,
} from '../constants';

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
        case RECOVER_SESSION_SUCCESS:
            return {
                ...state,
                session: action.payload,
                isLoggedIn: true,
            };

        case RECOVER_SESSION_FAILURE:
            return {
                ...defaultState,
            };

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
                sessionData: action.payload,
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
        case TRY_RECOVERING_SESSION:
        default:
            return state;
    }
};

export default reducer;
