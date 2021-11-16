import { useState } from 'react';
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
    TextFieldContainer
} from './styles/LoginStyles';
import { StyledButton, Row } from '../../../theme/Styles';
import LoginTextField from './components/TextField/TextField';
import COLORS from '../../../theme/Colors';
import { useFormik } from 'formik';
import { useHistory } from 'react-router';
import TextField from '../../../components/TextField/TextField';

function Login() {

    const history = useHistory();

    const goToRoute = (route) => {
        history.push(route)
    }

    const formik = useFormik({
        initialValues: {
            id: '',
            password: ''
        },
        validationSchema: FormSchema,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    const onLoginClick = (formData) => {

    }


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
                    <div style={{ height: '15px' }} />
                    <StyledButton style={{width:'180px'}} onClick={() => formik.handleSubmit()}>Iniciar sesión</StyledButton>
                    <div style={{ height: '35px' }} />
                    <LinkText>No recuerdo mi contraseña</LinkText>
                    <Row>
                        <BodyText>¿No tienes una cuenta?</BodyText>
                        <LinkText
                            to='/public/register'
                            style={{
                                color: COLORS.primary,
                            }}>Registrarse</LinkText>
                    </Row>
              
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
