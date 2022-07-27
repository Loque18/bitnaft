/* eslint-disable default-param-last */
import { TRY_RECOVER_SESSION, LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE, LOG_OUT_REQUEST } from '../constants';

const defaultState = {
    sessionData: {},
    isLoggedIn: false,
    loading: false,
    success: false,
    error: false,
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
                sessionData: action.payload,
            };

        case LOG_IN_FAILURE:
            return {
                ...defaultState,
                error: true,
            };

        case LOG_OUT_REQUEST:
        case TRY_RECOVER_SESSION:
        default:
            return state;
    }
};

export default reducer;
