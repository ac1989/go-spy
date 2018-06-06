import delay from 'redux-saga';
import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';
import * as TYPES from '../actions/types';
import { OPTS, flattenMatches } from './helpers';

function* fetchMatch(action) {
  const match_id = action.payload;
  for (let i = 0; i < 5; i++) {
    try {
      const res = yield call(
        axios.get,
        `/api/matches?match_id=${match_id}`,
        OPTS
      );
      let flattenedMatch = flattenMatches(res.data)[0];
      yield put({
        type: TYPES.FETCH_MATCH_SUCCESS,
        payload: flattenedMatch
      });
      return;
    } catch (err) {
      if (i < 4) {
        delay(1000);
      } else {
        yield put({ type: TYPES.FETCH_MATCH_FAILED });
        yield put({
          type: TYPES.SHOW_TOAST,
          message: 'Failed to fetch match.'
        });
      }
    }
  }
}

export function* watchFetchMatch() {
  yield takeLatest(TYPES.FETCH_MATCH, fetchMatch);
}
