import { useEffect, Fragment, useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from "react-redux";
import { AuthLogin } from '../redux/actions/AuthActions';
import { HideGlobalLoading, ShowGlobalLoading } from '../redux/actions/UiActions';
import LocalStorageService from '../services/LocalStorageService';
import { getUser } from '../api/Auth';

import { useQuery } from 'react-query';

function Auth({ children }) {

    const history = useHistory();
    const dispatch = useDispatch();
    const { authenticated } = useSelector((state) => state.authReducer);

    const [isValidating, setIsValidating] = useState(true)

    useQuery(['userData'], async () => {
        const TOKEN = LocalStorageService.getItem('token');
        if (TOKEN == null) {
            // i write this 3 times because router cant be mounted before auth validation
            setIsValidating(false)
            throw Error;
        }
        try {
            //Test current token & refreshToken (apiCall internal refresh the token in case of server return token invalid)
            dispatch(ShowGlobalLoading());
            let response = await getUser();
            if (response.success) {
                dispatch(AuthLogin({
                    authenticated: true,
                }));
            } else {
                dispatch(HideGlobalLoading());
                setIsValidating(false)
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
        if(authenticated){
            setIsValidating(false);
            setTimeout(() => {
                dispatch(HideGlobalLoading());
            }, 2000);
        }
    }, [authenticated]);

    return (
        <Fragment>
            {
                isValidating ? null : children
            }
        </Fragment>
    );
}

export default Auth;
