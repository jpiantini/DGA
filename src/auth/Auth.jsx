import { useEffect, Fragment, useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from "react-redux";
import { AuthLogin } from '../redux/actions/AuthActions';
import { HideGlobalLoading, ShowGlobalLoading } from '../redux/actions/UiActions';
import LocalStorageService from '../services/LocalStorageService';
import { getUser } from '../api/Auth';

import { useQuery } from 'react-query';

function Auth({ children }) {

    const history = useHistory();
    const dispatch = useDispatch();

    const [isValidating, setIsValidating] = useState(true)

    useQuery(['userData'], async () => {
        const TOKEN = LocalStorageService.getItem('token');
        if (TOKEN == null) {
            // i write this 3 times because router cant be mounted before auth validation
            //    setIsValidating(false)
            throw Error;
        }
        try {
            //Test current token & refreshToken (apiCall internal refresh the token in case of server return token invalid)
            dispatch(ShowGlobalLoading());
            let response = await getUser();
            if (response.success) {
                setTimeout(() => {
                    dispatch(AuthLogin({
                        authenticated: true,
                        //     profileImg: "https://www.w3schools.com/howto/img_avatar.png" // data.data.payload?.profile_img //beato add this atrib in future
                    }))
                    dispatch(HideGlobalLoading());
                    //      setIsValidating(false)
                }, 1500);
            } else {
                dispatch(HideGlobalLoading());
                //     setIsValidating(false)
                history.push('/public');
            }
            return response;
        } catch (error) {
            //LOCAL ERRORS NETWORK ETC
            //   console.log('error', error);
            //   alert('error');
        }
    });

    useEffect(() => {
        /*    dispatch(ShowGlobalLoading());
            setTimeout(() => {
                dispatch(HideGlobalLoading());
            }, 6000);
            */
    }, []);


    return (
        <Fragment>
            {children}
            {/*isValidating ? null : children*/}
        </Fragment>
    );
}

export default Auth;
