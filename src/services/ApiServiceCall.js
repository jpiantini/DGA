import axios from 'axios';
import LocalStorageService from "./LocalStorageService";
import apiCall from './ApiServerCall';

const apiServiceCall = () => {
    let Token = LocalStorageService.getItem('token');
    let XToken = LocalStorageService.getItem('xToken');

    const axiosInstance = axios.create({
        baseURL: 'http://159.223.159.17:8000/api',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'beater ' + Token,
            'X-Authorization': XToken
        },
        timeout: 60000,
    });

    axiosInstance.interceptors.response.use(async (response) => {
        //refreshToken NEED TEST
        const originalRequest = response.config;
        if (response.data?.msg === 'El token ha expirado' && !originalRequest._retry) { //CHANGE CONDITION 401 FOR MESSAGE FROM BACKEND
            originalRequest._retry = true;
            const access_token = await refreshToken();
            axiosInstance.defaults.headers.common['Authorization'] = 'beater ' + access_token;
            return axiosInstance(originalRequest);
        }
        return response //return response
    }, async function (error) {
        return Promise.reject(error);
    });
    return axiosInstance;
}

const refreshToken = async () => {
    try {
        let response = await apiCall().get('/refresh/token');
        console.log('refrescando token')
        if (response.data?.success) {
            console.log('token refrescado')
            LocalStorageService.setItem('token', response.data.payload.token);
            return response.data?.payload.token;
        } else {
            //if token cant be refreshed logOut
            console.log('no se refresco el token')
            LocalStorageService.removeItem('token');
            LocalStorageService.removeItem('xToken');
            window.location.reload();
            return null;
        }
    } catch (error) {
        //if token cant be refreshed logOut
        console.log('no se refresco el token')
        LocalStorageService.removeItem('token');
        LocalStorageService.removeItem('xToken');
        window.location.reload();
        return null;
    }

}

export default apiServiceCall;