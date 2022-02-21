import apiServiceCall from "../services/ApiServiceCall";
  
//TO DO ADD STATUS 
export const getRequestDetail = (id,citizenID) => {
    return apiServiceCall().get(`/requests/${id}?citizenId=${citizenID}`).then(({data}) => data);
}
