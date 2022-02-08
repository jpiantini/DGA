import wpCall from "../services/WpServerCall";

export const getConfoturGeneralInformationFromWordpress = () => {
    return wpCall().get('/sliders/v1/sliders').then(({data}) => data);
}
