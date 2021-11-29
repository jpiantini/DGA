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
    StyledCheckCircleIcon,
    StyledH1,
    StyledH2,
    StyledLink
} from './styles/RegisterStyles';
import { SmallHeightDivider, StyledButton, MediumHeightDivider } from '../../../theme/Styles';
import COLORS from '../../../theme/Colors';
import { useHistory } from "react-router-dom";
import TextField from '../../../components/TextField/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useFormik } from 'formik';
import apiCall from '../../../services/ApiServerCall';


function Register() {

    const history = useHistory();

    const [userRegistered, setUserRegistered] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            passwordConfirmation: '',
            identificationType: 1,
            identification: '',
            name: '',
            lastName: '',
            secondLastName: '',
            occupation: '',
            provinceId: '',
            municipalityId: '',
            sectorId: '',
            phoneNumber: '',
            secondPhoneNumber: '',
            secondaryEmail: '',
            address: '',
        },
        validationSchema: FormSchema,
        onSubmit: (values) => {
            handleRegister(values)
        },
    });

    const handleRegister = async (formData) => {
        // e.preventDefault();
        try {
            let response = await apiCall().post('/auth/register/portal',
                {
                    citizen_id: formData.identification,
                    email: formData.email,
                    name: formData.name,
                    first_last_name: formData.lastName,
                    second_last_name: formData.secondLastName,
                    occupation: formData.occupation,
                    password: formData.password,
                    password_confirmation: formData.passwordConfirmation,
                    province_id: formData.provinceId,
                    municipality_id: formData.municipalityId,
                    sector_id: formData.sectorId,
                    phone: formData.phoneNumber,
                    phone2: formData.secondPhoneNumber,
                    email2: formData.secondaryEmail,
                    address: formData.address,
                });
            if (response) {
                console.log('register success');
                alert('register success');
                setUserRegistered(true);
            }
        } catch (error) {
            console.log('error',error);
            alert('error');
        }
    }


    return (
        <RegisterContainer>
            <LeftPanelContainer>
                {
                    userRegistered ?
                        <FlexStartContainer>
                            <div style={{ height: '30%' }} />
                            <FormContainer>
                                <StyledCheckCircleIcon />
                                <StyledH1>
                                    ¡Gracias!
                                </StyledH1>
                                <StyledH2>
                                    Recibirás un correo de verificacion.
                                </StyledH2>
                                <MediumHeightDivider />
                                <StyledLink onClick={() => history.push('/public')}>
                                    Volver a inicio.
                                </StyledLink>
                            </FormContainer>
                            <FooterContainer>
                                <BodyText style={{
                                    color: COLORS.grayPlaceholder,
                                    fontSize: '12px'
                                }}>@2021 Ministerio de Turismo de la República Dominicana.
                                    Todos los derechos reservados.</BodyText>
                            </FooterContainer>
                        </FlexStartContainer>
                        :
                        <Fragment>
                            <LogoImage src={MiturLogoImage} />
                            <FlexStartContainer>
                                <FormContainer>
                                    <TextField title="Correo Electronico" type="text" id="email"
                                        required
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        error={formik.touched.email && Boolean(formik.errors.email)}
                                        helperText={formik.touched.email && formik.errors.email}
                                    />
                                    <SmallHeightDivider />

                                    <TextField title="Contraseña" type="password" id="password"
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        error={formik.touched.password && Boolean(formik.errors.password)}
                                        helperText={formik.touched.password && formik.errors.password}
                                        required
                                    />
                                    <SmallHeightDivider />

                                    <TextField title="Confirmar contraseña" type="password" id="passwordConfirmation"
                                        value={formik.values.passwordConfirmation}
                                        onChange={formik.handleChange}
                                        error={formik.touched.passwordConfirmation && Boolean(formik.errors.passwordConfirmation)}
                                        helperText={formik.touched.passwordConfirmation && formik.errors.passwordConfirmation}
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
                                        unMaskedValue={true}
                                        value={formik.values.identification}
                                        onChange={formik.handleChange}
                                        error={formik.touched.identification && Boolean(formik.errors.identification)}
                                        helperText={formik.touched.identification && formik.errors.identification}
                                    />
                                    <SmallHeightDivider />

                                    <TextField title="Nombre" type="text" id="name"
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        error={formik.touched.name && Boolean(formik.errors.name)}
                                        helperText={formik.touched.name && formik.errors.name}
                                        required
                                    />
                                    <SmallHeightDivider />

                                    <TextField title="Primer apellido" type="text" id="lastName"
                                        value={formik.values.lastName}
                                        onChange={formik.handleChange}
                                        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                        helperText={formik.touched.lastName && formik.errors.lastName}
                                        required
                                    />
                                    <SmallHeightDivider />

                                    <TextField title="Segundo Apellido" type="text" id="secondLastName"
                                        value={formik.values.secondLastName}
                                        onChange={formik.handleChange}
                                        error={formik.touched.secondLastName && Boolean(formik.errors.secondLastName)}
                                        helperText={formik.touched.secondLastName && formik.errors.secondLastName}
                                    //required
                                    />
                                    <SmallHeightDivider />

                                    <TextField title="Ocupacion" type="text" id="occupation"
                                        value={formik.values.occupation}
                                        onChange={formik.handleChange}
                                        error={formik.touched.occupation && Boolean(formik.errors.occupation)}
                                        helperText={formik.touched.occupation && formik.errors.occupation}
                                    //required
                                    />
                                    <SmallHeightDivider />

                                    <TextField title="Provincia ID" type="text" id="provinceId"
                                        value={formik.values.provinceId}
                                        onChange={formik.handleChange}
                                        error={formik.touched.provinceId && Boolean(formik.errors.provinceId)}
                                        helperText={formik.touched.provinceId && formik.errors.provinceId}
                                    required
                                    />
                                    <SmallHeightDivider />

                                    <TextField title="Municipio ID" type="text" id="municipalityId"
                                        value={formik.values.municipalityId}
                                        onChange={formik.handleChange}
                                        error={formik.touched.municipalityId && Boolean(formik.errors.municipalityId)}
                                        helperText={formik.touched.municipalityId && formik.errors.municipalityId}
                                    required
                                    />
                                    <SmallHeightDivider />

                                    <TextField title="Sector ID" type="text" id="sectorId"
                                        value={formik.values.sectorId}
                                        onChange={formik.handleChange}
                                        error={formik.touched.sectorId && Boolean(formik.errors.sectorId)}
                                        helperText={formik.touched.sectorId && formik.errors.sectorId}
                                    required
                                    />
                                    <SmallHeightDivider />

                                    <TextField title="Telefono de contacto" type="text" id="phoneNumber"
                                        mask="999-999-9999"
                                        value={formik.values.phoneNumber}
                                        onChange={formik.handleChange}
                                        error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                                        helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                                      required
                                    />
                                    <SmallHeightDivider />

                                    <TextField title="Telefono de contacto secundario" type="text" id="secondPhoneNumber"
                                        mask="999-999-9999"
                                        value={formik.values.secondPhoneNumber}
                                        onChange={formik.handleChange}
                                        error={formik.touched.secondPhoneNumber && Boolean(formik.errors.secondPhoneNumber)}
                                        helperText={formik.touched.secondPhoneNumber && formik.errors.secondPhoneNumber}
                                    //     required
                                    />
                                    <SmallHeightDivider />

                                    <TextField title="Direccion" type="text" id="address"
                                        value={formik.values.address}
                                        onChange={formik.handleChange}
                                        error={formik.touched.address && Boolean(formik.errors.address)}
                                        helperText={formik.touched.address && formik.errors.address}
                                    required
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
