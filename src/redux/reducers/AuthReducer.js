import { LOGIN_SUCCESS,LOGIN_FAIL } from "../actions/AuthActions";

const initialState = {
  authenticated: false
}

 const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOGIN_SUCCESS:
        return {
          ...state,
          authenticated: action.payload
        };
        case LOGIN_FAIL:
        return {
          ...state,
          authenticated: action.payload
        };
      default: return state;
    }
  };
  
  export default AuthReducer;