import * as TYPES from '../actions/types';

const initialState = {
  isLoading: false,
  clips: [],
  selectedClip: {
    embed_url: null
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TYPES.FETCH_CLIPS:
      return { ...state, isLoading: true };
    case TYPES.FETCH_CLIPS_SUCCESS:
      return {
        ...state,
        clips: action.payload,
        selectedClip: action.payload[0],
        isLoading: false
      };
    case TYPES.FETCH_CLIPS_FAILED:
      return { ...state, isLoading: false };
    case TYPES.SET_SELECTED_CLIP:
      return { ...state, selectedClip: action.payload };
    default:
      return state;
  }
};
