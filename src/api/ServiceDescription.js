import apiServiceCall from "../services/ApiServiceCall";

export const getServiceDescription = (serviceID) => {
    return apiServiceCall().get(`/services/${serviceID}`).then(({data}) => data);
}

export const getServiceCommentsAndRating = (serviceID,page=1) => {
    return apiServiceCall().get(`/services/extras/${serviceID}/rating?page=${page}`).then(({data}) => data);
}

