import { useEffect, Fragment } from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from "react-redux";
import { AuthLogin } from '../redux/actions/AuthActions';
import { HideGlobalLoading, ShowGlobalLoading } from '../redux/actions/UiActions';
import LocalStorageService from '../services/LocalStorageService';
import { getUser } from '../api/Auth';

function Auth({ children }) {

    const history = useHistory();
    const dispatch = useDispatch();

 /*   
    useQuery(['userData'], async () => {
        console.log(authenticated)

        if (authenticated) {
            //    history.push('/public');
            throw new Error('user is Auth')
        }
        const TOKEN = LocalStorageService.getItem('token');
        if (TOKEN == null) {
            //    history.push('/public');
            throw new Error('Not finded a previous token')
        }
        dispatch(ShowGlobalLoading('Restaurando sesión'));
        const response = await getUser(); //Test current token & refreshToken (apiCall internal refresh the token in case of server return token invalid)
        if (response.data?.success) {
            setTimeout(() => {
                dispatch(AuthLogin({
                    authenticated: true,
                    profileImg: "https://www.w3schools.com/howto/img_avatar.png" // response.data.payload?.profile_img //beato add this atrib in future
                }))
                history.push('/app/myDesk');
                dispatch(HideGlobalLoading());
            }, 1500);
            return response;
        } else {
            history.push('/public');
            throw new Error('Token cant be restored');
        }
    })

*/
       const restoreSession = async () => {
           const TOKEN = LocalStorageService.getItem('token');
           if (TOKEN == null) {
        //       history.push('/public');
               return;
           }
           try {
               //Test current token & refreshToken (apiCall internal refresh the token in case of server return token invalid)
               dispatch(ShowGlobalLoading('Restaurando sesión'));
               let response = await getUser();
               if (response.data.success) {
                   setTimeout(() => {
                       dispatch(AuthLogin({
                           authenticated: true,
                           profileImg: "https://www.w3schools.com/howto/img_avatar.png" // data.data.payload?.profile_img //beato add this atrib in future
                       }))
                       history.push('/app/myDesk');
                       dispatch(HideGlobalLoading());
                   }, 1500);
               } else {
                   //delete token and cache
                   history.push('/public');
                   dispatch(HideGlobalLoading());
               }
           } catch (error) {
               //LOCAL ERRORS NETWORK ETC
               //   console.log('error', error);
               //   alert('error');
           }
       }
   
       useEffect(() => {
           restoreSession();
       }, []);

    return (
        <Fragment>
            {children}
        </Fragment>
    );
}

export default Auth;
