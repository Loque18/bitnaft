import { call, put, takeLatest } from 'redux-saga/effects';
import api from 'src/api';

import cookieManager from 'src/utils/cookies';

import { log_in_success, log_in_failure } from 'src/redux/actions';
import { LOG_IN_REQUEST } from '../../constants';

function* login(action) {
    const { email, password } = action.payload;

    try {
        const res = yield call(api.post.login, { email, password });

        if (res.data.success) {
            const { token } = res.data;

            const sessionData = { email, token };

            // save token to cookies
            cookieManager.set('session', JSON.stringify(sessionData));

            yield put(log_in_success({ sessionData }));
        } else {
            throw new Error(res.data.message);
        }
    } catch (err) {
        yield put(log_in_failure({ errorMessage: err.message }));
    }
}

export default function* saga() {
    yield takeLatest(LOG_IN_REQUEST, login);
}
