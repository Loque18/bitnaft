import { call, put, takeEvery } from 'redux-saga/effects';

import { fetch_data_loading, fetch_data_success, fetch_data_error } from '../../actions';
import { HTTP_REQUEST } from '../../constants';

function* http_request_hook(action) {
    const { key, api_method, params } = action.payload;

    yield put(fetch_data_loading({ key }));

    try {
        const response = yield call(api_method, params);

        if (!response.data.success) {
            throw new Error(response.data.message);
        } else {
            const data = { ...response.data };
            delete data.success;
            yield put(fetch_data_success({ key, data }));
        }
    } catch (err) {
        yield put(fetch_data_error({ key, error: err.message }));
    }
}

export default function* saga() {
    yield takeEvery(HTTP_REQUEST, http_request_hook);
}
