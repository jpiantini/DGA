import wpCall from "../services/WpServerCall";

export const getGeneralInformationsFromWordpress = () => {
    return wpCall().get('/v1/descriptionGeneralInformations').then(({data}) => data);
}
