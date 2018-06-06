import * as types from '../actions/types';

const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_STREAM_URL:
      return action.url;

    default:
      return state;
  }
};
