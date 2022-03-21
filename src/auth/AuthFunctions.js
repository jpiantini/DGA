import LocalStorageService from "../services/LocalStorageService";


export const removeLocalStorageSessionData = () => {
    LocalStorageService.removeItem('profile_img');
    LocalStorageService.removeItem('token');
    LocalStorageService.removeItem('user_cedula');
    LocalStorageService.removeItem('user_primary_email');
}