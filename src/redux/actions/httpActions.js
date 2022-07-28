/* eslint-disable import/prefer-default-export */
import { HTTP_REQUEST } from '../constants';

export const http_request = ({ key, apiCall, params }) => ({ type: HTTP_REQUEST, payload: { key, apiCall, params } });
