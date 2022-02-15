import wpCall from "../services/WpServerCall";
import apiServiceCall from "../services/ApiServiceCall";

export const getGeneralInformationsFromWordpress = () => {
    return wpCall().get('/v1/descriptionGeneralInformations').then(({data}) => data);
}

export const getAllServices = () => {
    return apiServiceCall().get('/services').then(({data}) => data);
}
