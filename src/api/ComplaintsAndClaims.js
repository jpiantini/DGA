import apiServiceCall from "../services/ApiServiceCall";

export const getClaimIssues = () => {
    return apiServiceCall().get('/issues').then(({ data }) => data);
}

export const sendClaim = (requestData) => {
    return apiServiceCall().post('/claims',requestData).then(({ data }) => data);
}

export const getRequestClaims = (requestCode) => {
    return apiServiceCall().get(`/claims/${requestCode}`).then(({ data }) => data);
}