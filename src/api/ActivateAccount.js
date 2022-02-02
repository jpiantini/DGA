import apiCall from "../services/ApiServerCall";


export const confirmAccount = (token) => {
    return  apiCall().get(`/users/activate/${token}`).then(({data}) => data);

}
