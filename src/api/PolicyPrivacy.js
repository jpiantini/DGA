import wpCall from "../services/WpServerCall";

export const getPolicyAndPrivacyDataFromWordpress = () => {
    return wpCall().get('/pages/v1/page/politica-privacidad').then(({data}) => data);
}

