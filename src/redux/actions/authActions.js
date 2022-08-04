import { LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE } from '../constants';

export const log_in_request = ({ email, password }) => ({ type: LOG_IN_REQUEST, payload: { email, password } });
export const log_in_success = () => ({ type: LOG_IN_SUCCESS });
export const log_in_failure = ({ errorMessage }) => ({ type: LOG_IN_FAILURE, payload: errorMessage });
