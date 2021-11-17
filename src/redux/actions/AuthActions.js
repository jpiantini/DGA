export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";


export const AuthLogin = (authenticated) => {
    return {
        type: "LOGIN_SUCCESS",
        payload: authenticated
    }
}