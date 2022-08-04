// import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import { log_in_success, log_in_failure, update_session } from 'src/redux/actions';
import { LOG_IN_REQUEST } from '../../constants';

function* login(action) {
    const { email, password } = action.payload;

    try {
        const res = yield call(axios, { method: 'post', url: '/api/login', data: { email, password } });

        if (res.data.status === 'success') {
            yield put(log_in_success());

            yield put(update_session({ session: res.data.data }));
        } else {
            throw new Error(res.data.data.message);
        }
    } catch (err) {
        yield put(log_in_failure({ errorMessage: err.message }));
    }
}

export default function* saga() {
    yield takeLatest(LOG_IN_REQUEST, login);
}
