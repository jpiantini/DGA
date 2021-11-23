import { TITLE_CHANGE } from "../actions/UiActions";

const initialState = {
  title: ''
}

 const UiReducer = (state = initialState, action) => {
    switch (action.type) {
      case TITLE_CHANGE:
        return {
          ...state,
          title: action.payload
        };
      default: return state;
    }
  };
  
  export default UiReducer;