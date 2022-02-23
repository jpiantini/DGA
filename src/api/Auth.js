import apiCall from "../services/ApiServerCall";
import apiServiceCall from "../services/ApiServerCall";


export const registerLoggedUserInServiceBackend =  (requestData) => {
    return  apiServiceCall().post('/citizen',requestData).then(({data}) => data);
}

export const getUser =  () => {
    return  apiCall().get('/get/auth/user').then(({data}) => data);
}
