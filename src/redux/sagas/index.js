import { all } from 'redux-saga/effects';

import http_hook_saga from './http_hook';

import login from './session/login';
import logout from './session/logout';

export default function* rootSaga() {
    yield all([http_hook_saga(), login(), logout()]);
}
