import { UPDATE_SESSION, CLEAR_SESSION } from '../constants';

export const update_session = ({ session }) => ({ type: UPDATE_SESSION, payload: session });
export const clear_session = () => ({ type: CLEAR_SESSION });
