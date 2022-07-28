import { call, put, takeLatest } from 'redux-saga/effects';
import api from 'src/api';

import cookieManager from 'src/utils/cookies';

import { LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE } from '../../constants';

function* login(action) {
    const { email, password } = action.payload;

    try {
        const res = yield call(api.post.login, { email, password });

        if (res.data.success) {
            const { token } = res.data;

            // save token to cookies
            cookieManager.set('session', JSON.stringify({ token }));

            yield put({ type: LOG_IN_SUCCESS, payload: { token } });
        } else {
            yield put({ type: LOG_IN_FAILURE });
        }
    } catch (err) {
        yield put({ type: LOG_IN_FAILURE });
    }
}

export default function* saga() {
    yield takeLatest(LOG_IN_REQUEST, login);
}
