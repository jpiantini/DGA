import apiServiceCall from "../services/ApiServiceCall";

//TO DO ADD STATUS 
export const getRequestedServices = (citizenID, page, status, filters) => {
    if (filters.companyID !== '' || filters.requestID !== '') {
        return apiServiceCall().get(`/requests/extras/service/${citizenID}?page=${page}&name=${filters.requestID}&status=${status}&type=1`).then(({ data }) => data);
    }
    return apiServiceCall().get(`/requests/extras/user/${citizenID}?page=${page}&status=${status}&type=1`).then(({ data }) => data);
}
