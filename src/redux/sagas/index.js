import { all } from 'redux-saga/effects';

import recoverSession from './session/recover-session';
import login from './session/login';
import http_hook_saga from './http_hook';

export default function* rootSaga() {
    yield all([http_hook_saga(), recoverSession(), login()]);
}
