import apiServiceCall from "../services/ApiServiceCall";

export const getServiceDescription = (serviceID,citizenID) => {
    return apiServiceCall().get(`/services/${serviceID}?citizen_id=${citizenID}`).then(({data}) => data);
}
