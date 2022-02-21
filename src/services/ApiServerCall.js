import axios from 'axios';
import LocalStorageService from "./LocalStorageService";


const apiCall = () => {
    const axiosInstance = axios.create();

    axiosInstance.interceptors.request.use(
        async config => {
            let Token = LocalStorageService.getItem('token');
            config.baseURL = 'http://159.223.159.17/api';
            config.headers = {
                'Authorization': `beater ${Token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
            config.timeout=60000;
            return config;
        },
        error => {
            Promise.reject(error)
        });

    axiosInstance.interceptors.response.use(async (response) => {
        //refreshToken NEED TEST
        const originalRequest = response.config;
        if (response.data?.msg === 'El token ha expirado' && !originalRequest._retry) {
            originalRequest._retry = true;
            const access_token = await refreshToken();
            axiosInstance.defaults.headers.common['Authorization'] = 'beater ' + access_token;
            return axiosInstance(originalRequest);
        }
        //return response
        return response 
    }, async function (error) {
        return Promise.reject(error);
    });
    return axiosInstance;
}

const refreshToken = async () => {
    try {
        let response = await apiCall().get('/refresh/token');
        console.log('refrescando token')
        if (response.data.success) {
            console.log('token refrescado')
            LocalStorageService.setItem('token', response.data.payload.token);
            return response.data.payload.token;
        } else {
            //if token cant be refreshed logOut
            console.log('no se refresco el token')
            LocalStorageService.removeItem('token');
            window.location.reload();
            return null;
        }
    } catch (error) {
        //if token cant be refreshed logOut
        console.log('no se refresco el token')
        LocalStorageService.removeItem('token');
        window.location.reload();
        return null;
    }

}

export default apiCall;