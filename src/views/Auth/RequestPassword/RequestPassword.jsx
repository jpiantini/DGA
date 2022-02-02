import { useState, useEffect } from 'react';
import { MiturLogoImage, AuthBackgroundImage, FormSchema } from './RequestPasswordConstants';
import {
    LogoImage,
    Image,
    RowContainer,
    LeftPanelContainer,
    Title,
    FlexStartContainer,
    LinkText,
    BodyText,
    FooterContainer,
    TextFieldContainer
} from './styles/RequestPasswordStyles';
import { StyledButton, Row, SmallHeightDivider, MediumHeightDivider } from '../../../theme/Styles';
import COLORS from '../../../theme/Colors';
import { useFormik } from 'formik';
import { useHistory } from 'react-router';
import TextField from '../../../components/TextField/TextField';
import { useDispatch, useSelector } from "react-redux";

function RequestPassword() {

    const history = useHistory();
    const { authenticated } = useSelector((state) => state.authReducer);

    const onRequest = (formData) => {
        //CALL API passwordRequest WITH AXIOS
        if (formData) {//IF passwordRequest SUCCESS
            //ToggleScreen and show success message 
        }
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            emailConfirmation: ''
        },
        validationSchema: FormSchema,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
            onRequest(values);
        },
    });

    useEffect(() => {
        if (authenticated) {
            history.push('/app/myDesk')
            return;
        }
    }, []);


    return (
        <RowContainer>
            <LeftPanelContainer>
                <LogoImage src={MiturLogoImage} />
                <FlexStartContainer>
                    <Title>Restablecer contraseña</Title>
                    <SmallHeightDivider />
                    <SmallHeightDivider />
                    <TextFieldContainer>
                        <TextField placeholder="Correo Electronico" type="email" id="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />

                    </TextFieldContainer>

                    <TextFieldContainer>
                        <TextField placeholder="Confirmar correo electronico" type="email" id="emailConfirmation"
                            value={formik.values.emailConfirmation}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.emailConfirmation && Boolean(formik.errors.emailConfirmation)}
                            helperText={formik.touched.emailConfirmation && formik.errors.emailConfirmation}
                        />
                    </TextFieldContainer>
                    <MediumHeightDivider />
                    <StyledButton onClick={() => formik.handleSubmit()}>Restablecer contraseña</StyledButton>
                    <MediumHeightDivider />

                    <LinkText
                        to='/public/login'
                        style={{
                            color: COLORS.primary,
                        }}>Regresar</LinkText>
                    <FooterContainer>
                        <BodyText>@2021 Ministerio de Turismo de la República Dominicana.
                            Todos los derechos reservados.</BodyText>
                    </FooterContainer>
                </FlexStartContainer>
            </LeftPanelContainer>
            <Image style={{
                backgroundImage: `url(${AuthBackgroundImage})`
            }} />
        </RowContainer>
    );
}

export default RequestPassword;
