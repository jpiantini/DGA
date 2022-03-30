import apiServiceCall from "../services/ApiServiceCall";
                                                      
export const sendRequiredAction = (requestData) => {
    return apiServiceCall().post('/requests/action/save',requestData).then(({data}) => data);
}

export const sendMessage = (requestData) => {
    return apiServiceCall().post('/comment',requestData).then(({data}) => data);
}

export const assingDocumentsForRequiredActionInSoftExpert = (requestData) => {
    return apiServiceCall().post('/assigndocumentsoftexpert',requestData).then(({data}) => data);
}
