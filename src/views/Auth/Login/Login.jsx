import { useState, useEffect } from 'react';
import { FormSchema } from './LoginConstants';
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
import axios from 'axios';
import { getUser, registerLoggedUserInServiceBackend } from '../../../api/Auth';
import { cleanStringFromNumbers } from '../../../utilities/functions/NumberUtil';
import { useQuery } from 'react-query';
import userLogo from '../../../assets/images/user.png'
import {removeGuionFromString} from '../../../utilities/functions/StringUtil'
import Logo from '../../../assets/images/LogoPNG.png'
import AuthImage from '../../../assets/images/HomeImage.jpeg'

function Login() {

    const history = useHistory();
    const dispatch = useDispatch();
    const { authenticated } = useSelector((state) => state.authReducer);

    const [errorMessage, setErrorMessage] = useState('');

    const { refetch } = useQuery(['userData'], () => getUser(), { enabled: false })

    const formik = useFormik({
        initialValues: {
            //DEVELOPMENT COMMENT OR REMOVE
          //  id:'01122222221',
          // password: '12345678'
            id: '',
            password: '' 
        },
        validationSchema: FormSchema,
        onSubmit: (values) => {
            handleLogin(values);
        },
    });

    const handleLogin = async (formData) => {
        try {
            dispatch(ShowGlobalLoading('Iniciando sesión'));
            let response = await apiCall().post('/auth/login',
                {
                    citizen_id: removeGuionFromString(formData.id),
                    password: formData.password,
                });
            if (response.data?.success) {
                LocalStorageService.setItem('token', response.data?.payload.token);
                if (response.data?.payload.profile_img == null || response.data?.payload.profile_img === "N/A") {
                    LocalStorageService.setItem('profile_img', userLogo);
                } else {
                    LocalStorageService.setItem('profile_img', response.data?.payload.profile_img);
                }

                let userResponse = await getUser();
                LocalStorageService.setItem('user_cedula',userResponse.payload.citizen_id);
                LocalStorageService.setItem('user_primary_email',userResponse.payload.email);
                refetch();
                const requestData = {
                    id: userResponse.payload.citizen_id,
                    mail: userResponse.payload.email,
                    name: userResponse.payload.name,
                    surname: userResponse.payload.first_last_name,
                    secsurname: userResponse.payload.second_last_name,
                    phone: cleanStringFromNumbers(userResponse.payload.phone),
                    city: userResponse.payload.municipality,
                    created_date:
                    {
                        date: "2019-05-15 04:54:47.000000",
                        timezone_type: 3,
                        timezone: "UTC"
                    }
                }
                await registerLoggedUserInServiceBackend(requestData);
                dispatch(AuthLogin({
                    authenticated: true,
                    profileImg: response.data.payload.profile_img
                }))
                dispatch(HideGlobalLoading());
            } else {
                dispatch(HideGlobalLoading());
                setErrorMessage(response.data?.msg);
            }
        } catch (error) {
            LocalStorageService.removeItem("token");
            LocalStorageService.removeItem("profile_img");
            setErrorMessage("Ha ocurrido un error, favor contacte a soporte");
            dispatch(HideGlobalLoading());
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
                <LogoImage src={Logo} />
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
                backgroundImage: `url(${AuthImage})`
            }} />
        </LoginContainer>
    );
}

export default Login;
