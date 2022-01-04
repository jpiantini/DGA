import { TITLE_CHANGE, SHOW_GLOBAL_LOADING, HIDE_GLOBAL_LOADING } from "../actions/UiActions";

const initialState = {
  title: '',
  showGlobalLoading: false,
  globalLoadingMessage: ''
}

const UiReducer = (state = initialState, action) => {
  switch (action.type) {
    case TITLE_CHANGE:
      return {
        ...state,
        title: action.payload
      };
    case SHOW_GLOBAL_LOADING:
      return {
        ...state,
        showGlobalLoading: true,
        globalLoadingMessage: action.payload
      };
    case HIDE_GLOBAL_LOADING:
      return {
        ...state,
        showGlobalLoading: false,
        globalLoadingMessage: ''
      };

    default: return state;
  }
};

export default UiReducer;