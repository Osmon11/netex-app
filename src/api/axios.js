import axios from 'axios';
import config from './config';
import {store} from '../store';

let token = store.getState().appReducer.token;

export const appAxios = axios.create({
  baseURL: config.BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
  },
});
