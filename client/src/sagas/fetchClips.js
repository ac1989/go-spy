import { delay } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import * as TYPES from '../actions/types';
import { OPTS } from './helpers';

function* fetchClips() {
  for (let i = 0; i < 5; i++) {
    try {
      let res = yield call(axios, '/api/clips', OPTS);
      yield put({ type: TYPES.FETCH_CLIPS_SUCCESS, payload: res.data });
      return;
    } catch (err) {
      if (i < 4) delay(1000);
    }
  }
  yield put({ type: TYPES.FETCH_CLIPS_FAILED });
  yield put({ type: TYPES.SHOW_TOAST, message: 'Failed to fetch clips.' });
}

export function* watchFetchClips() {
  yield takeLatest(TYPES.FETCH_CLIPS, fetchClips);
}
