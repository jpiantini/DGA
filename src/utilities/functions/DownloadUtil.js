import axios from "axios";

export const downloadPDF = async (downloadUrl) => {
    const response = await axios({
        url: downloadUrl,
        method: 'GET',
        responseType: 'blob',
    });
    const file = new Blob(
        [response.data],
        { type: 'application/pdf' });
    const fileURL = URL.createObjectURL(file);
    return fileURL;
}