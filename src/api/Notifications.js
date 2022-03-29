import apiServiceCall from "../services/ApiServiceCall";

export const getNotifications = (citizenID) => {
    return apiServiceCall().get(`/notification/${citizenID}`).then(({data}) => data);
}

export const removeNotification = ({citizenID,requestData}) => {
    return apiServiceCall().post(`/notification/${citizenID}`,requestData).then(({data}) => data);
}