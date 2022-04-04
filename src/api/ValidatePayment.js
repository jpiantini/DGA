import apiServiceCall from "../services/ApiServiceCall";

export const paymentValidation = (requestData) => {
    return apiServiceCall().post('requests/extras/updatePaymentInfo',requestData).then(({ data }) => data);
}
