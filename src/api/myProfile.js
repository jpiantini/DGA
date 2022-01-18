import apiCall from "../services/ApiServerCall";

export const getAllCompanies = () => {
    return apiCall().get('/auth/get/getallcompany').then(({ data }) => data);
}

export const addNewCompany = ( data ) => {
    return apiCall().post('/auth/register/createnewcompany', data);
}

export const modifyCompany = ( data ) => {
    return apiCall().post('/auth/update/updatecompany', data);
}