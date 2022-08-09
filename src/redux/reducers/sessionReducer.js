/* eslint-disable default-param-last */
import { UPDATE_SESSION, CLEAR_SESSION } from '../constants';

const defaultState = {
    session: {},
};

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case UPDATE_SESSION:
            return {
                ...state,
                session: action.payload,
            };

        case CLEAR_SESSION:
            return {
                ...defaultState,
            };

        default:
            return state;
    }
};

export default reducer;
