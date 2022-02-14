import wpCall from "../services/WpServerCall";

export const getSlidersDataFromWordpress = () => {
    return wpCall().get('/sliders/v1/sliders').then(({data}) => data);
}

export const getMottoInformationDataFromWordpress = () => {
    return wpCall().get('/v1/mottoInformation').then(({data}) => data);
}
