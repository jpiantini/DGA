import apiServiceCall from "../services/ApiServiceCall";
  
//TO DO ADD STATUS 
export const getRequestedServices = (page,status) => {
    return apiServiceCall().get(`/requests/extras/user/40225994520?page=${page}&status=${status}&type=1`).then(({data}) => data);
}
