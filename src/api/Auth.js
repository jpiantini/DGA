import apiCall from "../services/ApiServerCall";


export const getUser =  () => {
    return  apiCall().get('/get/auth/user');

}
