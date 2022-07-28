import {
    TRY_RECOVERING_SESSION,
    RECOVER_SESSION_SUCCESS,
    RECOVER_SESSION_FAILURE,
    LOG_IN_REQUEST,
    LOG_IN_SUCCESS,
    LOG_IN_FAILURE,
    LOG_OUT_REQUEST,
} from '../constants';

export const try_recovering_session = () => ({ type: TRY_RECOVERING_SESSION });
export const recover_session_success = ({ sessionData }) => ({ type: RECOVER_SESSION_SUCCESS, payload: sessionData });
export const recover_session_failure = () => ({ type: RECOVER_SESSION_FAILURE });
export const log_in_request = ({ email, password }) => ({ type: LOG_IN_REQUEST, payload: { email, password } });
export const log_in_success = ({ sessionData }) => ({ type: LOG_IN_SUCCESS, payload: sessionData });
export const log_in_failure = () => ({ type: LOG_IN_FAILURE });
export const log_out_request = () => ({ type: LOG_OUT_REQUEST });
