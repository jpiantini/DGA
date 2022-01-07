import {  useEffect, Fragment } from 'react';
import { useHistory } from 'react-router';
import { useDispatch,  } from "react-redux";
import { AuthLogin } from '../redux/actions/AuthActions';
import { HideGlobalLoading, ShowGlobalLoading } from '../redux/actions/UiActions';
import apiCall from '../services/ApiServerCall';
import LocalStorageService from '../services/LocalStorageService';

function Auth({children}) {

    const history = useHistory();
    const dispatch = useDispatch();

    const restoreSession = async () => {
        const TOKEN = LocalStorageService.getItem('token');
        if (TOKEN == null) {
            history.push('/public');
        }
        try {
            //Test current token & refreshToken (apiCall internal refresh the token in case of server return token invalid)
            let response = await apiCall().get('/get/auth/user');
            if (response.data?.success) {
                dispatch(ShowGlobalLoading('Restaurando sesión'));
                setTimeout(() => {
                    dispatch(AuthLogin({
                        authenticated: true,
                        profileImg: response.data.payload?.profile_img //beato add this atrib in future
                    }))
                    history.push('/app/myDesk');
                    dispatch(HideGlobalLoading());
                }, 1500);
            } else {
                history.push('/public');
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
