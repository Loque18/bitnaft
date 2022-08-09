/* eslint-disable import/prefer-default-export */
import { HTTP_REQUEST } from '../constants';

export const http_request = ({ key, api_method, params }) => ({
    type: HTTP_REQUEST,
    payload: { key, api_method, params },
});
