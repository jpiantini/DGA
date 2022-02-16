import apiServiceCall from "../services/ApiServiceCall";
                                                      
export const getForm = (serviceID,loggedUserCedula) => {
    return apiServiceCall().get(`/expertform/${serviceID}/get/${loggedUserCedula}`).then(({data}) => data);
}
