export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT = "LOGOUT";


export const AuthLogin = (payload) => {
    return {
        type: LOGIN_SUCCESS,
        payload: payload
    }
}

export const AuthLogout = () => {
    return {
        type: LOGOUT,
    }
}