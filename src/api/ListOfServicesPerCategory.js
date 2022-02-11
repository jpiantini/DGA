import wpCall from "../services/WpServerCall";

export const getConfoturGeneralInformationFromWordpress = () => {
    return wpCall().get('/v1/descriptionGeneralInformations').then(({data}) => data);
}
