import axios from "axios";

export const downloadFile = async (downloadUrl,fileType='application/pdf') => {
    const response = await axios({
        url: downloadUrl,
        method: 'GET',
        responseType: 'blob',
    });
    const file = new Blob(
        [response.data],
        { type: fileType });
    const fileURL = URL.createObjectURL(file);
    return fileURL;
}