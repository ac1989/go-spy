import { delay } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';
import * as TYPES from '../actions/types';
import axios from 'axios';
import { OPTS, flattenMatches } from './helpers';

function* fetchMatches() {
  for (let i = 0; i < 5; i++) {
    try {
      const res = yield call(axios, '/api/matches?status=ongoing', OPTS);
      yield put({
        type: TYPES.FETCH_MATCHES_SUCCESS,
        payload: flattenMatches(res.data)
      });
      return;
    } catch (err) {
      if (i < 4) {
        delay(1000);
      } else {
        yield put({ type: TYPES.FETCH_MATCHES_FAILED });
        yield put({
          type: TYPES.SHOW_TOAST,
          message: 'Failed to retrieve matches.'
        });
      }
    }
  }
}

export function* watchFetchMatches() {
  yield takeLatest(TYPES.FETCH_MATCHES, fetchMatches);
}
