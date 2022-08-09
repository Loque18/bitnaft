import { all } from 'redux-saga/effects';

import http_hook_saga from './http_hook';

export default function* rootSaga() {
    yield all([http_hook_saga()]);
}
