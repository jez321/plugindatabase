

import axios from 'axios';
import api from '../api/api';
import {
  REQUEST_DEALS,
  RECEIVE_DEALS,
} from './actionTypes';

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

export function fetchDeals(searchTerm, sortCol, sortDir) {
  return function fetch(dispatch) {
    dispatch(requestDeals(searchTerm, sortCol, sortDir));
    const source = axios.CancelToken.source();
    api.get(`deals?search=${searchTerm}&sortdir=${sortDir}&sortby=${sortCol}`, {
      cancelToken: source.token,
    }).then((response) => {
      dispatch(receiveDeals(response.data));
    }).catch((reason) => {
      console.log('An error occurred.', reason);
    });
    /* return () => {
      source.cancel('Cancelling axios request in Deals cleanup');
    };
    */
  };
}
