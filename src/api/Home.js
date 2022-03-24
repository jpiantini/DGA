import wpCall from "../services/WpServerCall";

export const getHomeDataFromWordpress = () => {
    return wpCall().get('/web/v1/homeImage').then(({data}) => data);
}

export const getVideoDataFromWordpress = () => {
    return wpCall().get('/v1/homeVideo').then(({data}) => data);
}
