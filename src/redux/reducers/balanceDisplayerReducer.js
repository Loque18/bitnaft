import { CHANGE_BALANCE_VISIBILITY } from '../constants';

const defaultState = {
    balanceVisibility: true,
};

// eslint-disable-next-line default-param-last
const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case CHANGE_BALANCE_VISIBILITY:
            return {
                ...state,
                balanceVisibility: !state.balanceVisibility,
            };

        default:
            return state;
    }
};

export default reducer;
