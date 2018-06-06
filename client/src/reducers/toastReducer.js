import * as types from '../actions/types';

const initialState = {
  show: false,
  message: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SHOW_TOAST:
      return {
        show: true,
        message: action.message
      };
    case types.KILL_TOAST:
      return {
        ...state,
        show: false
      };
    default:
      return state;
  }
};
