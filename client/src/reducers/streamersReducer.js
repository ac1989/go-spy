import * as TYPES from '../actions/types';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case TYPES.FETCH_STREAMERS_SUCCESS:
      return action.payload;

    default:
      return state;
  }
};
