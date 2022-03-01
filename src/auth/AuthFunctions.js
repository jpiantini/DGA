import LocalStorageService from "../services/LocalStorageService";


export const removeLocalStorageSessionData = () => {
    LocalStorageService.removeItem('profile_img');
    LocalStorageService.removeItem('token');
}