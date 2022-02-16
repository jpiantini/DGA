import apiServiceCall from "../services/ApiServiceCall";

export const getServiceDescription = (serviceID) => {
    return apiServiceCall().get(`/services/${serviceID}`).then(({data}) => data);
}
