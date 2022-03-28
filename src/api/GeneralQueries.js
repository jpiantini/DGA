import wpCall from "../services/WpServerCall";

export const getMapsDataFromWordpress = () => {
    return wpCall().get('/web/v1/generalQueriesMaps').then(({data}) => data);
}
