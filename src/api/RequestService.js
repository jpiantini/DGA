import apiServiceCall from "../services/ApiServiceCall";
                                                      
export const getForm = (serviceID,loggedUserCedula) => {
    return apiServiceCall().get(`/expertform/${serviceID}/get/${loggedUserCedula}`).then(({data}) => data);
}

export const registerForm = (requestData) => {
    return apiServiceCall().post('/requests',requestData).then(({data}) => data);
}

