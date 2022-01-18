import apiCall from "../services/ApiServerCall";


export const modifyPassword = (data) => {
    return apiCall().post('citizen/change/password?=&=.', data);
}

export const modifyEmail = (data) => {
    return apiCall().post('/citizen/change/email', data);
}

export const modifyUserData = (data) => {
    //TO DO ADD ModifyUserData endpoint
    //return apiCall().post('/citizen/change/email', data);
    throw new Error('error')
}