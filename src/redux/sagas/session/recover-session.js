import { takeLatest, put } from 'redux-saga/effects';

import cookieManager from 'src/utils/cookies';

import { TRY_RECOVERING_SESSION, RECOVER_SESSION_SUCCESS, RECOVER_SESSION_FAILURE } from '../../constants';

function* try_recovering_session() {
    // load token from cookies

    const session = JSON.parse(cookieManager.get('session'));

    if (!session) {
        yield put({ type: RECOVER_SESSION_FAILURE });
    } else {
        yield put({ type: RECOVER_SESSION_SUCCESS, payload: session });
    }
}

export default function* saga() {
    yield takeLatest(TRY_RECOVERING_SESSION, try_recovering_session);
}
