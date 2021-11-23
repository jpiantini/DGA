import { LOGIN_SUCCESS,LOGOUT } from "../actions/AuthActions";

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
        case LOGOUT:
        return {
          ...state,
          authenticated: action.payload
        };
      default: return state;
    }
  };
  
  export default AuthReducer;