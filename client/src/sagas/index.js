import { all } from 'redux-saga/effects';
import { watchFetchClips } from './fetchClips';
import { watchFetchStreamers } from './fetchStreamers';
import { watchFetchMatch } from './fetchMatch';
import { watchFetchMatches } from './fetchMatches';

export default function* rootSaga() {
  yield all([
    watchFetchClips(),
    watchFetchStreamers(),
    watchFetchMatches(),
    watchFetchMatch()
  ]);
}
