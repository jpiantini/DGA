import apiServiceCall from "../services/ApiServiceCall";
import wpCall from "../services/WpServerCall";

export const getContactDataFromWordpress = () => {
    return wpCall().get('/sucursales/v1/sucursales').then(({data}) => data);
}
export const sendMessage = (requestData) => {
    return apiServiceCall().post('/send/claim',requestData).then(({data}) => data);
}

