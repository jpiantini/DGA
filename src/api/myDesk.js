import apiServiceCall from "../services/ApiServiceCall";

export const getMetricsData = (citizenID) => {
    return apiServiceCall().get(`/statistics/${citizenID}`).then(({ data }) => data);
}
