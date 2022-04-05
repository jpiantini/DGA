import apiCall from "../services/ApiServerCall";

export const restorePassword =  (requestData) => {
    return  apiCall().post('/users/forgot/password',requestData).then(({data}) => data);
}
