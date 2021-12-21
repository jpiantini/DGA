import { useState, useLayoutEffect, useEffect, Fragment } from 'react';
import {
    SmallHeightDivider,
    StyledButtonOutlined,
    StyledButton,
    MediumHeightDivider,
    WpRichTextContainer,
    SubTitle
} from '../../../theme/Styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from "react-redux";
import { UpdateAppSubHeaderTitle } from '../../../redux/actions/UiActions';
import {
    ButtonsContainer,
    ButtonContainer,
    Container,
    StyledCheckCircleIcon,
} from './styles/RegisterStyles';
import MobileStepper from '@mui/material/MobileStepper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Grid } from '@mui/material';
import Select from '../../../components/Select/Select';
import TextField from '../../../components/TextField/TextField';
import RadioButtonGroup from '../../../components/RadioButtonGroup/RadioButtonGroup';
import { RegisterSteps, FormSchema, identificationTypes } from './RegisterConstants';
import { useFormik } from 'formik';
import Typography from '@mui/material/Typography';
import apiCall from '../../../services/ApiServerCall';
import CheckBox from '../../../components/CheckBox/CheckBox';
import wpCall from '../../../services/WpServerCall';
import parse from 'html-react-parser';

function Register() {
    const matchesWidth = useMediaQuery('(min-width:768px)');
    const history = useHistory();
    const dispatch = useDispatch();
    const { authenticated } = useSelector((state) => state.authReducer);

    const stepsLenght = RegisterSteps.length;
    const stepsTitles = RegisterSteps.map((step) => step.title);
    const [activeStep, setActiveStep] = useState(0);
    const [userRegistered, setUserRegistered] = useState(false);

    const [provincesData, setProvincesData] = useState([]);
    const [municipalitiesData, setMunicipalitiesData] = useState([]);
    const [sectorsData, setSectorsData] = useState([]);

    const [wordpressContent, setWordpressContent] = useState();

    const getAndSetAllWordPressContent = async () => {
        let data = await wpCall().get("/pages/v1/page/terminos-y-condiciones");
        setWordpressContent(data?.data?.content);
    };


    const handleStepsValidation = (step) => {
        if (RegisterSteps[step]) {
            let stepElementError = false
            for (let i = 0; i < RegisterSteps[step].elements?.length; i++) {
                const element = RegisterSteps[step].elements[i];
                if (formik.touched[element] && Boolean(formik.errors[element])) {
                    stepElementError = true;
                }
            }
            if (stepElementError) {
                return true;
            } else {
                return false;
            }
        }
    }

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1 == stepsLenght ? prevActiveStep : prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep == 0 ? 1 : prevActiveStep - 1);
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            emailConfirmation: '',
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
            termsAndCondition: false
        },
        validationSchema: FormSchema,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (values) => {
            handleRegister(values)
        },
    });

    const getProvincesData = async () => {
        try {
            let provincesData = await apiCall().get('/get/provinces')
            if (provincesData) {
                setProvincesData(
                    provincesData.data.provinces?.map((province) => ({
                        value: province.bidclasif,
                        label: province.ctituloclas
                    })));
            }
        } catch (error) {

        }
    }

    const getMunicipalitiesData = async (value) => {
        try {
            let municipalitiesData = await apiCall().get(`/get/municipalities/${value}`)
            if (municipalitiesData) {
                setMunicipalitiesData(
                    municipalitiesData.data.municipalities?.map((municipalities) => ({
                        value: municipalities.bidclasif,
                        label: municipalities.ctituloclas
                    })));
            }
        } catch (error) {

        }
    }

    const getSectorsData = async (value) => {
        try {
            let sectorsData = await apiCall().get(`/get/sectors/${value}`)
            if (sectorsData) {
                setSectorsData(
                    sectorsData.data.sectors?.map((sector) => ({
                        value: sector.bidclasif,
                        label: sector.ctituloclas
                    })));
            }
        } catch (error) {

        }
    }

    const handleRegister = async (formData) => {
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
                handleNext();
                setUserRegistered(true);
            }
        } catch (error) {
            //   console.log('error', error);
            alert('error');
        }
    }

    useLayoutEffect(() => {
        //UPDATE APP HEADER SUBTITLE
        dispatch(UpdateAppSubHeaderTitle('Registro ciudadano')) // TITLE OF SUBHEADER APP
    }, []);

    useEffect(() => {
        getProvincesData();
        getAndSetAllWordPressContent();
    }, []);

    return (
        <Container >
            {
                matchesWidth &&
                <Stepper activeStep={activeStep} alternativeLabel>
                    {stepsTitles.map((label, index) => {
                        const labelProps = {};
                        if (handleStepsValidation(index)) {
                            labelProps.optional = (
                                <Typography sx={{ marginLeft: '45%' }} variant="caption" color="error">
                                    Error
                                </Typography>
                            );
                            labelProps.error = true;
                        }
                        return (
                            <Step key={label}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
            }
            <MediumHeightDivider />
            <SmallHeightDivider />
            {
                activeStep == 0 ?
                    <Grid alignItems="center" justifyContent="center" container direction="row" spacing={{ xs: 2, md: 3 }} columns={{ xs: 8, sm: 8, md: 12 }}>

                        <Grid item xs={12} sm={12} md={12}>
                            <TextField title="Correo Electronico" type="email" id="email"
                                required
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                            />
                        </Grid>

                        <Grid item xs={12} sm={12} md={12}>
                            <TextField title="Confirmar correo electronico" type="email" id="emailConfirmation"
                                required
                                value={formik.values.emailConfirmation}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.emailConfirmation && Boolean(formik.errors.emailConfirmation)}
                                helperText={formik.touched.emailConfirmation && formik.errors.emailConfirmation}
                            />
                        </Grid>

                        <Grid item xs={12} sm={12} md={12}>
                            <TextField title="Contraseña" type="password" id="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                                required
                            />
                        </Grid>

                        <Grid item xs={12} sm={12} md={12}>
                            <TextField title="Confirmar contraseña" type="password" id="passwordConfirmation"
                                value={formik.values.passwordConfirmation}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.passwordConfirmation && Boolean(formik.errors.passwordConfirmation)}
                                helperText={formik.touched.passwordConfirmation && formik.errors.passwordConfirmation}
                                required
                            />
                        </Grid>
                    </Grid>
                    :
                    activeStep == 1 ?

                        <Grid alignItems="center" justifyContent="center" container direction="row" spacing={{ xs: 2, md: 3 }} columns={{ xs: 8, sm: 8, md: 12 }}>

                            <Grid item xs={8} sm={4} md={6}>
                                <RadioButtonGroup title="Tipo de documento" id="identificationType"
                                    options={identificationTypes}
                                    value={formik.values.identificationType}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur} />
                            </Grid>

                            <Grid item xs={8} sm={4} md={6}>
                                <TextField title="Documento de Identidad" type="text" id="identification"
                                    required
                                    mask={formik.values.identificationType == 1 ? "999-9999999-9" : ""}
                                    unMaskedValue={true}
                                    value={formik.values.identification}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.identification && Boolean(formik.errors.identification)}
                                    helperText={formik.touched.identification && formik.errors.identification}
                                />
                            </Grid>

                            <Grid item xs={8} sm={4} md={6}>
                                <TextField title="Nombre" type="text" id="name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.name && Boolean(formik.errors.name)}
                                    helperText={formik.touched.name && formik.errors.name}
                                    required
                                />
                            </Grid>

                            <Grid item xs={8} sm={4} md={6}>
                                <TextField title="Primer apellido" type="text" id="lastName"
                                    value={formik.values.lastName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                    helperText={formik.touched.lastName && formik.errors.lastName}
                                    required
                                />
                            </Grid>

                            <Grid item xs={8} sm={4} md={6}>
                                <TextField title="Segundo Apellido" type="text" id="secondLastName"
                                    value={formik.values.secondLastName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.secondLastName && Boolean(formik.errors.secondLastName)}
                                    helperText={formik.touched.secondLastName && formik.errors.secondLastName}
                                //required
                                />
                            </Grid>

                            <Grid item xs={8} sm={4} md={6}>
                                <TextField title="Ocupacion" type="text" id="occupation"
                                    value={formik.values.occupation}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.occupation && Boolean(formik.errors.occupation)}
                                    helperText={formik.touched.occupation && formik.errors.occupation}
                                //required
                                />
                            </Grid>

                            <Grid item xs={8} sm={4} md={6}>
                                <Select title="Provincia" type="text" id="provinceId"
                                    data={provincesData}
                                    value={formik.values.provinceId}
                                    onChange={(e) => {
                                        formik.handleChange(e);
                                        getMunicipalitiesData(e.target.value)
                                    }}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.provinceId && Boolean(formik.errors.provinceId)}
                                    helperText={formik.touched.provinceId && formik.errors.provinceId}
                                    required
                                />
                            </Grid>

                            <Grid item xs={8} sm={4} md={6}>
                                <Select title="Municipio" type="text" id="municipalityId"
                                    disabled={!municipalitiesData.length > 0}
                                    data={municipalitiesData}
                                    value={formik.values.municipalityId}
                                    onChange={(e) => {
                                        formik.handleChange(e);
                                        getSectorsData(e.target.value);
                                    }}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.municipalityId && Boolean(formik.errors.municipalityId)}
                                    helperText={formik.touched.municipalityId && formik.errors.municipalityId}
                                    required
                                />
                            </Grid>

                            <Grid item xs={8} sm={4} md={6}>
                                <Select title="Sector" type="text" id="sectorId"
                                    disabled={!sectorsData.length > 0}
                                    data={sectorsData}
                                    value={formik.values.sectorId}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.sectorId && Boolean(formik.errors.sectorId)}
                                    helperText={formik.touched.sectorId && formik.errors.sectorId}
                                    required
                                />
                            </Grid>

                            <Grid item xs={8} sm={4} md={6}>
                                <TextField title="Telefono de contacto" type="text" id="phoneNumber"
                                    mask="999-999-9999"
                                    value={formik.values.phoneNumber}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                                    helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                                    required
                                />
                            </Grid>

                            <Grid item xs={8} sm={4} md={6}>
                                <TextField title="Telefono de contacto secundario" type="text" id="secondPhoneNumber"
                                    mask="999-999-9999"
                                    value={formik.values.secondPhoneNumber}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.secondPhoneNumber && Boolean(formik.errors.secondPhoneNumber)}
                                    helperText={formik.touched.secondPhoneNumber && formik.errors.secondPhoneNumber}
                                //     required
                                />
                            </Grid>

                            <Grid item xs={8} sm={4} md={6}>
                                <TextField title="Direccion" type="text" id="address"
                                    value={formik.values.address}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.address && Boolean(formik.errors.address)}
                                    helperText={formik.touched.address && formik.errors.address}
                                    required
                                />
                            </Grid>

                        </Grid>
                        :
                        activeStep == 2 ?
                            <Fragment>
                                {/*<Title>TERMINOS Y CONDICIONES</Title>*/}

                                <WpRichTextContainer>
                                    {
                                        wordpressContent && parse(wordpressContent)
                                    }
                                </WpRichTextContainer>

                                <SmallHeightDivider />
                                <CheckBox
                                    id="termsAndCondition"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.termsAndCondition && Boolean(formik.errors.termsAndCondition)}
                                    helperText={formik.touched.termsAndCondition && formik.errors.termsAndCondition}
                                    value={formik.values.termsAndCondition}
                                    label="Acepto los terminos y condiciones de uso y privacidad"
                                />
                            </Fragment>
                            :
                            <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center', alignSelf: 'center', alignItems: 'center' }}>
                                <StyledCheckCircleIcon />
                                <SmallHeightDivider />
                                <SubTitle>
                                    ¡Gracias!
                                    Recibirás un correo de verificacion.
                                </SubTitle>

                            </div>
            }

            <MediumHeightDivider />
            <MediumHeightDivider />

            <ButtonsContainer>
                <ButtonContainer>
                    <StyledButtonOutlined disabled={activeStep == 0 || userRegistered} onClick={handleBack} variant="outlined">
                        Retroceder
                    </StyledButtonOutlined>
                </ButtonContainer>

                { //STEPPER WHEN DEVICE IS MOBILE
                    !matchesWidth &&
                    <MobileStepper
                        variant="dots"
                        steps={stepsLenght}
                        position="static"
                        activeStep={activeStep}
                    />
                }

                <ButtonContainer>
                    {
                        stepsLenght - 2 == activeStep ?
                            <StyledButton onClick={() => formik.handleSubmit()}>
                                Registrar
                            </StyledButton>
                            : userRegistered ?
                                <StyledButton onClick={() => history.push('/public')}>
                                    Ir a inicio
                                </StyledButton>
                                :
                                <StyledButtonOutlined disabled={activeStep + 1 == stepsLenght} onClick={handleNext} variant="outlined">
                                    Continuar
                                </StyledButtonOutlined>
                    }
                </ButtonContainer>
            </ButtonsContainer>
        </Container >
    );
}

export default Register;