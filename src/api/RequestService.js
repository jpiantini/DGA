import apiServiceCall from "../services/ApiServiceCall";
import ApiServiceUploadCall from "../services/ApiServiceUploadCall";
                              
export const getForm = (serviceID,loggedUserCedula) => {
    return apiServiceCall().get(`/expertform/${serviceID}/get/${loggedUserCedula}`).then(({data}) => data);
}

export const registerForm = (requestData) => {
    return apiServiceCall().post('/requests',requestData).then(({data}) => data);
}

export const uploadFormDocuments = (documentsList) => {
    return ApiServiceUploadCall().post('/files',documentsList).then(({data}) => data);
}