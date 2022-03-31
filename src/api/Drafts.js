import apiServiceCall from "../services/ApiServiceCall";

export const getDraftsList = (citizenID) => {
    return apiServiceCall().get(`/drafts/${citizenID}`).then(({data}) => data);
}

export const saveDraft = (requestData) => {
    return apiServiceCall().post(`/drafts`,requestData).then(({data}) => data);
}