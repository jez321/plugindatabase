

import api from '../api/api';
import {
  REQUEST_DEALS,
  RECEIVE_DEALS,
  ADD_WANTED_PLUGIN,
  REMOVE_WANTED_PLUGIN,
  ADD_OWNED_PLUGIN,
  REMOVE_OWNED_PLUGIN,
} from './actionTypes';


export function addWantedPlugin(pluginId) {
  return {
    type: ADD_WANTED_PLUGIN,
    pluginId,
  };
}
export function removeWantedPlugin(pluginId) {
  return {
    type: REMOVE_WANTED_PLUGIN,
    pluginId,
  };
}
export function addOwnedPlugin(pluginId) {
  return {
    type: ADD_OWNED_PLUGIN,
    pluginId,
  };
}
export function removeOwnedPlugin(pluginId) {
  return {
    type: REMOVE_OWNED_PLUGIN,
    pluginId,
  };
}
export function requestDeals(searchTerm, sortCol, sortDir) {
  return {
    type: REQUEST_DEALS,
    searchTerm,
    sortCol,
    sortDir,
  };
}

export function receiveDeals(deals) {
  return {
    type: RECEIVE_DEALS,
    deals,
  };
}

export function fetchDeals(searchTerm, sortCol, sortDir, source) {
  return function fetch(dispatch) {
    dispatch(requestDeals(searchTerm, sortCol, sortDir));
    return api.get(`deals?search=${searchTerm}&sortdir=${sortDir}&sortby=${sortCol}`, {
      cancelToken: source.token,
    }).then((response) => {
      dispatch(receiveDeals(response.data));
    }).catch((reason) => {
      console.log('An error occurred.', reason);
    });
  };
}
