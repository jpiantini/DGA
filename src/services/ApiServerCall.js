import axios from 'axios';
import LocalStorageService from "./LocalStorageService";


export default function apiCall() {
    let Token = LocalStorageService.getItem('token');
    const axiosInstance = axios.create({
        baseURL: 'http://159.223.159.17/api',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'beater ' + Token,
        },
        timeout: 60000,
    });

    axiosInstance.interceptors.response.use(async (response) => {
        //refreshToken NEED TEST
        const originalRequest = response.config;
        if (response.data?.msg === 'El token ha expirado' && !originalRequest._retry) { //CHANGE CONDITION 401 FOR MESSAGE FROM BACKEND
            originalRequest._retry = true;
            const access_token = await refreshToken();
            axios.defaults.headers.common['Authorization'] = 'beater ' + access_token;
            return axiosInstance(originalRequest);
        }
        //Probably i need put a logOut here for my condition 
        //  console.log(response)
        return response //return response
    }, async function (error) {
        return Promise.reject(error);
    });
    return axiosInstance;
}

const refreshToken = async () => {
    let response =  await apiCall().get('/refresh/token');
    console.log('nuevo token',response.data?.payload.token);
    if(response.data.success){
        LocalStorageService.setItem('token',response.data.payload.token);
        return response.data?.payload.token;
    }else{
        //logout();
        return null;
    }
}

