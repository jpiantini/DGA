import wpCall from "../services/WpServerCall";

export const getContactDataFromWordpress = () => {
    return wpCall().get('/sucursales/v1/sucursales').then(({data}) => data);
}
