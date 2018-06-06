import * as TYPES from './types';

export const fetchClips = () => ({
  type: TYPES.FETCH_CLIPS
});

export const fetchStreamers = () => ({
  type: TYPES.FETCH_STREAMERS
});

export const setSelectedClip = payload => ({
  type: TYPES.SET_SELECTED_CLIP,
  payload
});

export const fetchMatches = () => ({
  type: TYPES.FETCH_MATCHES
});

export const fetchMatch = match_id => ({
  type: TYPES.FETCH_MATCH,
  payload: match_id
});

export const showToast = message => ({
  type: TYPES.SHOW_TOAST,
  message
});

export const killToast = () => ({
  type: TYPES.KILL_TOAST
});

export const updateStreamURL = url => ({
  type: TYPES.UPDATE_STREAM_URL,
  url
});

export const selectMatch = match => ({
  type: TYPES.SELECT_MATCH,
  match
});
