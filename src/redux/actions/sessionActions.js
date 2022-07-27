import { TRY_RECOVER_SESSION, LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE, LOG_OUT_REQUEST } from '../constants';

export const try_recover_session = () => ({ type: TRY_RECOVER_SESSION });
export const log_in_request = ({ email, password }) => ({ type: LOG_IN_REQUEST, payload: { email, password } });
export const log_in_success = ({ sessionData }) => ({ type: LOG_IN_SUCCESS, payload: sessionData });
export const log_in_failure = () => ({ type: LOG_IN_FAILURE });
export const log_out_request = () => ({ type: LOG_OUT_REQUEST });
