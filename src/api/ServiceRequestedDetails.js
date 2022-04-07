import apiServiceCall from "../services/ApiServiceCall";
  
export const getRequestDetail = (id,citizenID) => {
    return apiServiceCall().get(`/requests/${id}?citizenId=${citizenID}`).then(({data}) => data);
}

export const sendQualificationAndRating = (requestData) => {
    return apiServiceCall().post(`/services/extras/rating`,requestData).then(({data}) => data);
}
