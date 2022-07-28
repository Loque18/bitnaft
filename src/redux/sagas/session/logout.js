import { put, takeEvery } from 'redux-saga/effects';
import cookieManager from 'src/utils/cookies';
import { log_out_success } from '../../actions';
import { LOG_OUT_REQUEST } from '../../constants';

function* logout() {
    cookieManager.delete('session');

    yield put(log_out_success());
}

export default function* saga() {
    yield takeEvery(LOG_OUT_REQUEST, logout);
}
