import { useState, useEffect } from 'react';
import { MiturLogoImage, AuthBackgroundImage, FormSchema } from './LoginConstants';
import {
    LogoImage,
    Image,
    LoginContainer,
    LeftPanelContainer,
    Title,
    FlexStartContainer,
    LinkText,
    BodyText,
    FooterContainer,
    TextFieldContainer,
    TextError
} from './styles/LoginStyles';
import { StyledButton, Row, SmallHeightDivider, MediumHeightDivider } from '../../../theme/Styles';
import COLORS from '../../../theme/Colors';
import { useFormik } from 'formik';
import { useHistory } from 'react-router';
import TextField from '../../../components/TextField/TextField';
import { useDispatch, useSelector } from "react-redux";
import { AuthLogin } from '../../../redux/actions/AuthActions';
import { HideGlobalLoading, ShowGlobalLoading } from '../../../redux/actions/UiActions';
import apiCall from '../../../services/ApiServerCall';
import LocalStorageService from '../../../services/LocalStorageService';

function Login() {

    const history = useHistory();
    const dispatch = useDispatch();
    const { authenticated } = useSelector((state) => state.authReducer);

    const [errorMessage, setErrorMessage] = useState('');

    const formik = useFormik({
        initialValues: {
            //DEVELOPMENT COMMENT OR REMOVE
            id: '40211984535',
            password: 'david123'
            /* PRODUCTION
            id: '',
            password: '' */
        },
        validationSchema: FormSchema,
        onSubmit: (values) => {
            handleLogin(values);
        },
    });

    const handleLogin = async (formData) => {
        try {
            let response = await apiCall().post('/auth/login',
                {
                    citizen_id: formData.id,
                    password: formData.password,
                });
            if (response.data?.success) {
                dispatch(ShowGlobalLoading('Iniciando sesión'));
                setTimeout(() => {
                    LocalStorageService.setItem('token', response.data?.payload.token); //save token in localStorage
                    dispatch(AuthLogin({
                        authenticated: true,
                        profileImg: response.data.payload.profile_img
                    }))
                    dispatch(HideGlobalLoading());
                }, 1500);
            } else { //Handle errors
                // TODO Handle errors
                console.log(response.data);
                console.log(errorMessage)
                setErrorMessage(response.data?.msg);
            }
        } catch (error) {
                        //LOCAL ERRORS NETWORK ETC
            //   console.log('error', error);
            //   alert('error');
        }
    }

    useEffect(() => {
        if (authenticated) {
            history.goBack();
        }
    }, [authenticated]);

    return (
        <LoginContainer>
            <LeftPanelContainer>
                <LogoImage src={MiturLogoImage} />
                <FlexStartContainer>
                    <Title>Iniciar Sesión</Title>
                    <TextFieldContainer>
                        <TextField
                            type="text"
                            placeholder="Cedúla o Pasaporte"
                            id="id"
                            value={formik.values.id}
                            onChange={formik.handleChange}
                            error={formik.touched.id && Boolean(formik.errors.id)}
                            helperText={formik.touched.id && formik.errors.id}
                        />
                    </TextFieldContainer>

                    <TextFieldContainer>
                        <TextField
                            type="password"
                            placeholder="Contraseña"
                            id="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />
                    </TextFieldContainer>
                    <TextError>{errorMessage}</TextError>
                    <MediumHeightDivider />
                    <StyledButton onClick={() => formik.handleSubmit()}>Iniciar sesión</StyledButton>
                    <MediumHeightDivider />
                    <LinkText to='/public/requestPassword'>No recuerdo mi contraseña</LinkText>
                    <SmallHeightDivider />
                    <BodyText>¿No tienes una cuenta?
                        <LinkText
                            to='/app/register'
                            style={{
                                color: COLORS.primary,
                            }}>Registrarse</LinkText>
                    </BodyText>
                    <FooterContainer>
                        <BodyText style={{
                            color: COLORS.grayPlaceholder,
                            fontSize: '12px'
                        }}>@2021 Ministerio de Turismo de la República Dominicana.
                            Todos los derechos reservados.</BodyText>
                    </FooterContainer>
                </FlexStartContainer>
            </LeftPanelContainer>
            <Image style={{
                backgroundImage: `url(${AuthBackgroundImage})`
            }} />
        </LoginContainer>
    );
}

export default Login;
