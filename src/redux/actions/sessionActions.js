import { LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE, LOG_OUT_REQUEST, LOG_OUT_SUCCESS } from '../constants';

export const log_in_request = ({ email, password }) => ({ type: LOG_IN_REQUEST, payload: { email, password } });
export const log_in_success = ({ sessionData }) => ({ type: LOG_IN_SUCCESS, payload: sessionData });
export const log_in_failure = ({ errorMessage }) => ({ type: LOG_IN_FAILURE, payload: errorMessage });
export const log_out_request = () => ({ type: LOG_OUT_REQUEST });
export const log_out_success = () => ({ type: LOG_OUT_SUCCESS });
