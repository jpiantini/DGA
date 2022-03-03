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

export const linkingDocumentsToRequestInSoftExperted = (request) => {
    return ApiServiceUploadCall().post('/uploadsoftexpert',request).then(({data}) => data);
}

export const linkingDocumentsToRequestInBackOffice = (filesList,requestID) => {
    return apiServiceCall().post(`/assigndocument/${requestID}`,filesList).then(({data}) => data);
}