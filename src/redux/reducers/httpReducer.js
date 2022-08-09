import api_data_keys from 'src/static/api_data_keys';

import { FETCH_DATA_LOADING, FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE } from '../constants';

const defaultState = {};

const initialStructure = {
    loading: false,
    success: false,
    failure: false,
    data: null,
    error: null,
};

Object.keys(api_data_keys).forEach(key => {
    defaultState[key] = {
        ...initialStructure,
    };
});

// eslint-disable-next-line default-param-last
const dataReducer = (state = defaultState, { type, payload }) => {
    switch (type) {
        case FETCH_DATA_LOADING:
            return {
                [payload.key]: {
                    ...initialStructure,
                    loading: true,
                },
            };

        case FETCH_DATA_SUCCESS:
            return {
                [payload.key]: {
                    ...initialStructure,
                    success: true,
                    data: payload.data,
                },
            };

        case FETCH_DATA_FAILURE:
            return {
                [payload.key]: {
                    ...initialStructure,
                    failure: true,
                    error: payload.error,
                },
            };

        default:
            return state;
    }
};

export default dataReducer;
