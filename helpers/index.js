import * as _general from './general';
import * as _ui from './ui';
import * as _api from './api';
export const general = _general;
export const ui = _ui;
export const api = _api;
const helpers ={
    general,
    ui,
    api
};
export default helpers;
/**
 * @typedef {typeof helpers} Helpers
 */