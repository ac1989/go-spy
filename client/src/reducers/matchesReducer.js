import * as types from '../actions/types';
import 'core-js/fn/array/find-index';

const initialState = {
  isLoading: true,
  items: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_MATCHES:
      return { ...state, isLoading: true };
    case types.FETCH_MATCHES_SUCCESS:
      return { ...state, items: action.payload, isLoading: false };
    case types.FETCH_MATCH_SUCCESS:
      const { items } = state;
      const existing = items.findIndex(
        item => item.match_id === action.payload.match_id
      );
      return {
        ...state,
        items:
          existing > -1
            ? [
                ...items.slice(0, existing),
                action.payload,
                ...items.slice(existing + 1)
              ]
            : [...items, action.payload]
      };
    default:
      return state;
  }
};
