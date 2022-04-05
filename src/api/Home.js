import apiServiceCall from "../services/ApiServiceCall";
import wpCall from "../services/WpServerCall";

export const getHomeDataFromWordpress = () => {
    return wpCall().get('/web/v1/homeImage').then(({data}) => data);
}

export const getVideoDataFromWordpress = () => {
    return wpCall().get('/v1/homeVideo').then(({data}) => data);
}

export const getHomeMetricsData = () => {
    //TO DO CHANGE ENDPOINT
    return apiServiceCall().get('/statistics').then(({data}) => data);
}