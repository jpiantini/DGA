import { LOGIN_SUCCESS,LOGOUT } from "../actions/AuthActions";

const initialState = {
  authenticated: false,
  profileImg:null
}

 const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOGIN_SUCCESS:
        return {
          ...state,
          authenticated: action.payload.authenticated,
          profileImg: action.payload.profileImg,
        };
        case LOGOUT:
        return {
          ...state,
          authenticated: false,
          profileImg: null,
        };
      default: return state;
    }
  };
  
  export default AuthReducer;