import { combineReducers } from "redux";
import UiReducer from "./UiReducer";
import AuthReducer from "./AuthReducer";

const RootReducer = combineReducers({
    uiReducer:UiReducer,
    authReducer:AuthReducer

})

export default RootReducer;