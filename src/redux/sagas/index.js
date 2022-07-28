import { all } from 'redux-saga/effects';

import http_hook_saga from './http_hook';

import recoverSession from './session/recover-session';
import login from './session/login';
import logout from './session/logout';

export default function* rootSaga() {
    yield all([http_hook_saga(), recoverSession(), login(), logout()]);
}
