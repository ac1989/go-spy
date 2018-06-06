import delay from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import * as TYPES from '../actions/types';
import { OPTS } from './helpers';

function* fetchStreamers() {
  for (let i = 0; i < 5; i++) {
    try {
      const res = yield call(axios, '/api/players?stream=live', OPTS);
      yield put({ type: TYPES.FETCH_STREAMERS_SUCCESS, payload: res.data });
      return;
    } catch (err) {
      if (i < 4) {
        delay(1000);
      } else {
        yield put({ type: TYPES.FETCH_STREAMERS_FAILED });
        yield put({
          type: TYPES.SHOW_TOAST,
          message: 'Failed to retrieve streamers.'
        });
      }
    }
  }
}

export function* watchFetchStreamers() {
  yield takeLatest(TYPES.FETCH_STREAMERS, fetchStreamers);
}
