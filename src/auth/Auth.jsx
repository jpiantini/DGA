import { useEffect, Fragment, useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from "react-redux";
import { AuthLogin } from '../redux/actions/AuthActions';
import { HideGlobalLoading, ShowGlobalLoading } from '../redux/actions/UiActions';
import LocalStorageService from '../services/LocalStorageService';
import { getUser } from '../api/Auth';
import apiCall from '../services/ApiServerCall';
import axios from 'axios';

function Auth({ children }) {

    const history = useHistory();
    const dispatch = useDispatch();

    const [isValidating, setIsValidating] = useState(true)

    const restoreSession = async () => {
        const TOKEN = LocalStorageService.getItem('token');
        if (TOKEN == null) {
            setIsValidating(false) // i write this 3 times because router cant be mounted before auth validation
            return;
        }
        try {
            //Test current token & refreshToken (apiCall internal refresh the token in case of server return token invalid)
            dispatch(ShowGlobalLoading('Restaurando sesión'));
            let response = await getUser();
            if (response.success) {
                setTimeout(() => {
                    LocalStorageService.setItem('xToken',"XiS9cuDMlRP0YtMsXPNepZFti5jqeoQdm0LbnZh8IMvZmF118LqCNSSj6CDVnYPv")
                    dispatch(AuthLogin({
                        authenticated: true,
                        profileImg: "https://www.w3schools.com/howto/img_avatar.png" // data.data.payload?.profile_img //beato add this atrib in future
                    }))
                    dispatch(HideGlobalLoading());
                    setIsValidating(false)
                }, 1500);
            } else {
                //delete token and cache
                dispatch(HideGlobalLoading());
                setIsValidating(false)
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
            {isValidating ? null : children}
        </Fragment>
    );
}

export default Auth;
