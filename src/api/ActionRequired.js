import apiServiceCall from "../services/ApiServiceCall";
                                                      
export const sendRequiredAction = (requestData) => {
    return apiServiceCall().post('/requests/action/save',requestData).then(({data}) => data);
}
