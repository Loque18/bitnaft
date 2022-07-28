import { all } from 'redux-saga/effects';

import recoverSession from './session/recover-session';
import login from './session/login';

export default function* rootSaga() {
    yield all([recoverSession(), login()]);
}
