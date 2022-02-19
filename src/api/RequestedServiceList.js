import apiServiceCall from "../services/ApiServiceCall";
  
//TO DO ADD STATUS 
export const getRequestedServices = (citizenID,page,status) => {
    return apiServiceCall().get(`/requests/extras/user/${citizenID}?page=${page}&status=${status}&type=1`).then(({data}) => data);
}

export const getRequestedServicesWithFilter = (citizenID,page,status,name) => {
    return apiServiceCall().get(`/requests/extras/service/${citizenID}?page=${page}&name=${name}&status=${status}&type=1`).then(({data}) => data);
}
