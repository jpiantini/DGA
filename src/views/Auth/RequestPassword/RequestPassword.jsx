import { useState, useEffect } from 'react';
import { FormSchema } from './RequestPasswordConstants';
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
    TextFieldContainer,
    TextError
} from './styles/RequestPasswordStyles';
import { StyledButton, Row, SmallHeightDivider, MediumHeightDivider } from '../../../theme/Styles';
import COLORS from '../../../theme/Colors';
import { useFormik } from 'formik';
import { useHistory } from 'react-router';
import TextField from '../../../components/TextField/TextField';
import { useDispatch, useSelector } from "react-redux";
import { removeGuionFromString } from '../../../utilities/functions/StringUtil';
import { useSnackbar } from 'notistack';
import {restorePassword} from '../../../api/RequestPassword'
import { HideGlobalLoading, ShowGlobalLoading } from '../../../redux/actions/UiActions';
import Logo from '../../../assets/images/LogoPNG.png'
import AuthImage from '../../../assets/images/HomeImage.jpeg'

function RequestPassword() {

    const dispatch = useDispatch();
    const history = useHistory();
    const { authenticated } = useSelector((state) => state.authReducer);
    const { enqueueSnackbar } = useSnackbar();

    const [errorMessage, setErrorMessage] = useState('');

    const formik = useFormik({
        initialValues: {
            id: '',
            email: '',
            emailConfirmation: ''
        },
        validationSchema: FormSchema,
        onSubmit: (values) => {
            //alert(JSON.stringify(values, null, 2));
            onRequest(values);
        },
    });

    const onRequest = async (formData) => {
        try {
            dispatch(ShowGlobalLoading("Cargando"));
            const response = await restorePassword({
                citizen_id: removeGuionFromString(formData.id),
                email: formData.email
            });
            if (response.success) {//IF passwordRequest SUCCESS
                enqueueSnackbar("Se ha enviado un mensaje a su correo electrónico", { variant: 'success' })
                history.push('/public')
            }else{
                setErrorMessage(response?.msg)
               // enqueueSnackbar("Ha ocurrido un error favor intentar mas tarde.", { variant: 'error' })
            }
            dispatch(HideGlobalLoading());
        } catch (error) {
            enqueueSnackbar("Ha ocurrido un error favor intentar mas tarde.", { variant: 'error' })
            dispatch(HideGlobalLoading());
        }
    }

    useEffect(() => {
        if (authenticated) {
            history.push('/app/myDesk')
            return;
        }
    }, []);

    return (
        <RowContainer>
            <LeftPanelContainer>
                <LogoImage src={Logo} />
                <FlexStartContainer>
                    <Title>Restablecer contraseña</Title>
                    <SmallHeightDivider />
                    <SmallHeightDivider />
                    <TextFieldContainer>
                        <TextField placeholder="Documento" type="text" id="id"
                            value={formik.values.id}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.id && Boolean(formik.errors.id)}
                            helperText={formik.touched.id && formik.errors.id}
                        />

                    </TextFieldContainer>

                    <TextFieldContainer>
                        <TextField placeholder="Correo Electrónico" type="email" id="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />

                    </TextFieldContainer>

                    <TextFieldContainer>
                        <TextField placeholder="Confirmar correo electrónico" type="email" id="emailConfirmation"
                            value={formik.values.emailConfirmation}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.emailConfirmation && Boolean(formik.errors.emailConfirmation)}
                            helperText={formik.touched.emailConfirmation && formik.errors.emailConfirmation}
                        />
                    </TextFieldContainer>
                    <TextError>{errorMessage}</TextError>
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
                backgroundImage: `url(${AuthImage})`
            }} />
        </RowContainer>
    );
}

export default RequestPassword;
