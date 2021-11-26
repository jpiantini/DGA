import axios  from 'axios';
import sessionStorageService from "./SessionStorageService";


export default  function apiCall() {
    let Token = sessionStorageService.getItem('token');
    console.log('llamada hecha con el token',Token);
    const axiosInstance = axios.create({
        //baseURL: 'http://localhost:4000',
        baseURL: 'http://159.223.159.17/api',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'beater ' + Token,
        },
        timeout: 60000,
    });

    axiosInstance.interceptors.response.use((response) => {
        return response
      }, async function (error) {
    //    const originalRequest = error.config;
        if (error.response.status === 401 /*&& !originalRequest._retry*/) {
         /* originalRequest._retry = true;
          const access_token = await refreshToken();            
         axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
          return axiosInstance(originalRequest);*/
          
         //TOKEN EXPIRED LOGOUT();
        }
        return Promise.reject(error);
      });
    return axiosInstance;
}

/*const refreshToken = async () => {
    let Token = sessionStorageService.getItem('token');
    let response =  await apiCall().post('/refreshToken',{
        token : Token
    });
    console.log('nuevo token',response);
    return response;
}*/

  