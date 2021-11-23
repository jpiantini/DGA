export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT = "LOGIN_FAIL";


export const AuthLogin = (authenticated) => {
    return {
        type: "LOGIN_SUCCESS",
        payload: authenticated
    }
}

export const AuthLogout = () => {
    return {
        type: "LOGIN_SUCCESS",
        payload: false
    }
}