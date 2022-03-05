import apiServiceCall from "../services/ApiServiceCall";

export const getInstitutionalDocuments = (citizenID,page=1) => {
    //0 personal documents - 1 institutional documents
    return apiServiceCall().get(`/citizens/documentsPage/${citizenID}/1?page=${page}`).then(({data}) => data);
}
