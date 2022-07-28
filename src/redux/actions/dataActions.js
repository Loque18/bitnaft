import { FETCH_DATA_LOADING, FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE } from '../constants';

export const fetch_data_loading = ({ key }) => ({ type: FETCH_DATA_LOADING, payload: { key } });
export const fetch_data_success = ({ key, data }) => ({ type: FETCH_DATA_SUCCESS, payload: { key, data } });
export const fetch_data_error = ({ key, error }) => ({ type: FETCH_DATA_FAILURE, payload: { key, error } });
