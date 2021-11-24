import { useState, Fragment } from 'react';
import { MiturLogoImage, AuthBackgroundImage, FormSchema } from './RegisterConstants';
import {
    Image,
    RegisterContainer,
    LeftPanelContainer,
    LogoImage,
    FlexStartContainer,
    BodyText,
    FooterContainer,
    FormContainer,
    StyledCheckCircleIcon
} from './styles/RegisterStyles';
import { SmallHeightDivider, StyledButton, MediumHeightDivider } from '../../../theme/Styles';
import COLORS from '../../../theme/Colors';
import { useHistory } from "react-router-dom";
import TextField from '../../../components/TextField/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useFormik } from 'formik';


function Register() {

    const history = useHistory();

    const [userRegistered, setUserRegistered] = useState(false);

    const formik = useFormik({
        initialValues: {
            name: '',
            lastName: '',
            identification: '',
            identificationType: 1,
            email: '',
            phoneNumber: ''
        },
        validationSchema: FormSchema,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
            setUserRegistered(true);
        },
    });

    const goToRoute = (route) => {
        history.push(route);
    }

    return (
        <RegisterContainer>
            <LeftPanelContainer>
                {
                    userRegistered ?
                        <Fragment>
                                <StyledCheckCircleIcon/>
                        </Fragment>
                        :
                        <Fragment>
                            <LogoImage src={MiturLogoImage} />
                            <FlexStartContainer>
                                <FormContainer>
                                    <TextField title="Nombre" type="text" id="name"
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        error={formik.touched.name && Boolean(formik.errors.name)}
                                        helperText={formik.touched.name && formik.errors.name}
                                        required
                                    />
                                    <SmallHeightDivider />

                                    <TextField title="Apellidos" type="text" id="lastName"
                                        value={formik.values.lastName}
                                        onChange={formik.handleChange}
                                        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                        helperText={formik.touched.lastName && formik.errors.lastName}
                                        required
                                    />
                                    <SmallHeightDivider />

                                    <RadioGroup name="identificationType" value={formik.values.identificationType} onChange={formik.handleChange} row >
                                        <FormControlLabel value={1} control={<Radio sx={{ color: COLORS.tertiary }} />} label="Cedúla" />
                                        <FormControlLabel value={2} control={<Radio sx={{ color: COLORS.tertiary }} />} label="Pasaporte" />
                                    </RadioGroup>
                                    <SmallHeightDivider />

                                    <TextField title="Documento de Identidad" type="text" id="identification"
                                        required
                                        mask="999-9999999-9"
                                        value={formik.values.identification}
                                        onChange={formik.handleChange}
                                        error={formik.touched.identification && Boolean(formik.errors.identification)}
                                        helperText={formik.touched.identification && formik.errors.identification}
                                    />
                                    <SmallHeightDivider />

                                    <TextField title="Telefono de contacto" type="text" id="phoneNumber"
                                        required
                                        mask="999-999-9999"
                                        value={formik.values.phoneNumber}
                                        onChange={formik.handleChange}
                                        error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                                        helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                                    />
                                    <SmallHeightDivider />

                                    <TextField title="Correo Electronico" type="text" id="email"
                                        required
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        error={formik.touched.email && Boolean(formik.errors.email)}
                                        helperText={formik.touched.email && formik.errors.email}
                                    />

                                    <SmallHeightDivider />
                                    <SmallHeightDivider />

                                    <StyledButton onClick={() => formik.handleSubmit()}>
                                        Registrarme
                                    </StyledButton>
                                </FormContainer>
                                <FooterContainer>
                                    <BodyText style={{
                                        color: COLORS.grayPlaceholder,
                                        fontSize: '12px'
                                    }}>@2021 Ministerio de Turismo de la República Dominicana.
                                        Todos los derechos reservados.</BodyText>
                                </FooterContainer>
                            </FlexStartContainer>
                        </Fragment>
                }
            </LeftPanelContainer>
            <Image style={{
                backgroundImage: `url(${AuthBackgroundImage})`
            }} />
        </RegisterContainer>
    );
}

export default Register;
