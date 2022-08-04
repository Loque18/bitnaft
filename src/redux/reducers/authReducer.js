import { LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE } from '../constants';

const defaultState = {
    loading: false,
    success: false,
    failure: false,
    errorMessage: '',
};

// eslint-disable-next-line default-param-last
const reducer = (state = defaultState, { type, payload }) => {
    switch (type) {
        case LOG_IN_REQUEST:
            return {
                ...defaultState,
                loading: true,
            };

        case LOG_IN_SUCCESS:
            return {
                ...defaultState,
                success: true,
            };

        case LOG_IN_FAILURE:
            return {
                ...defaultState,
                failure: true,
                errorMessage: payload,
            };

        default:
            return state;
    }
};

export default reducer;
