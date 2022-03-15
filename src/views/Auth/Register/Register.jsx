import { useState, useLayoutEffect, useEffect, Fragment } from 'react';
import {
    SmallHeightDivider,
    StyledButtonOutlined,
    StyledButton,
    MediumHeightDivider,
    WpRichTextContainer,
    SubTitle,
    StyledCheckCircleIcon
} from '../../../theme/Styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from "react-redux";
import { HideGlobalLoading, ShowGlobalLoading, UpdateAppSubHeaderTitle } from '../../../redux/actions/UiActions';
import {
    ButtonsContainer,
    ButtonContainer,
    Container,
    FinalStepContainer,
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
import { useSnackbar } from 'notistack';
import PhoneTextField from '../../../components/PhoneTextField/PhoneTextField';
import { cedulaValidationService } from '../../../api/RenderField';

function Register() {
    const matchesWidth = useMediaQuery('(min-width:768px)');
    const history = useHistory();
    const dispatch = useDispatch();
    const { authenticated } = useSelector((state) => state.authReducer);
    const { enqueueSnackbar } = useSnackbar();

    const stepsLenght = RegisterSteps.length;
    const stepsTitles = RegisterSteps.map((step) => step.title);
    const [activeStep, setActiveStep] = useState(0);
    // IN THIS CASE IT IS -2 BECAUSE The last step is only a Message it does not contain a form
    const lastStep = (stepsLenght - 2) == activeStep;
    const [schemaValidation, setSchemaValidation] = useState({});

    const [userRegistered, setUserRegistered] = useState(false);

    const [provincesData, setProvincesData] = useState([]);
    const [municipalitiesData, setMunicipalitiesData] = useState([]);
    const [sectorsData, setSectorsData] = useState([]);

    const [questionsData, setQuestionsData] = useState([]);

    const [wordpressContent, setWordpressContent] = useState();

    const [isValidatingCedula, setIsValidatingCedula] = useState(false);


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
            password_confirmation: '',
            document_type: '1',
            citizen_id: '',
            name: '',
            first_last_name: '',
            second_last_name: '',
            occupation: '',
            province_id: '',
            municipality_id: '',
            sector_id: '',
            phone: '',
            phone2: '',
            email2: '',
            address: '',
            first_citizen_question: '',
            first_citizen_answer: '',
            second_citizen_question: '',
            second_citizen_answer: '',
            third_citizen_question: '',
            third_citizen_answer: '',
            termsAndCondition: false
        },
        validationSchema: schemaValidation,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (values, actions) => {
            validateStepForm({ values, actions })
        },
    });

    const handleFieldsValidations = (errors) => {
        let fieldsKeys = Object.keys(errors);
        for (let i = 0; i < fieldsKeys.length; i++) {
            let error = errors[fieldsKeys[i]];
            formik.setFieldError(fieldsKeys[i], error[0])
        }
    }


    const validateStepForm = ({ values, actions }) => {
        if (lastStep) {
            handleRegister(values);
        } else {
            setActiveStep(activeStep + 1);
            actions?.setTouched({});
            actions?.setSubmitting(false);
        }
    }

    const handleSubmitForm = (e) => {
        window.scrollTo(0, 0);
        if (Object.keys(formik.errors).length != 0) {
            enqueueSnackbar('Llene todos los campos requeridos', { variant: 'error' });
        } else {
            formik.handleSubmit(e);
        }
    }

    useEffect(() => {
        const innerSchema = FormSchema[activeStep];
        if (typeof innerSchema === 'object') {
            setSchemaValidation(innerSchema.validations);
        }
        return () => { }
    }, [activeStep])


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
            setMunicipalitiesData([]);
            setSectorsData([]);
        } catch (error) {

        }
    }

    const getRegisterQuestionsData = async () => {
        try {
            let questionsData = await apiCall().get('/auth/get/getquestionandanswer')
            if (questionsData) {
                setQuestionsData(
                    questionsData.data.payload?.map((question) => ({
                        value: question.id,
                        label: question.questions
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
            setSectorsData([]);
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

    const handleSecurityQuestionChange = (e) => {
        if (formik.values.first_citizen_question == e.target.value) {
            formik.setFieldValue("first_citizen_question", "");
            formik.setFieldValue("first_citizen_answer", "");
        }
        if (formik.values.second_citizen_question == e.target.value) {
            formik.setFieldValue("second_citizen_question", "");
            formik.setFieldValue("second_citizen_answer", "");
        }
        if (formik.values.third_citizen_question == e.target.value) {
            formik.setFieldValue("third_citizen_question", "");
            formik.setFieldValue("third_citizen_answer", "");
        }
        formik.setFieldValue(e.target.id, e.target.value);
    }

    const handleRegister = async (formData) => {
        dispatch(ShowGlobalLoading('Cargando'));
        try {
            let response = await apiCall().post('/auth/register/portal',
                {
                    document_type: formData.document_type,
                    citizen_id: formData.citizen_id,
                    email: formData.email,
                    name: formData.name,
                    first_last_name: formData.first_last_name,
                    second_last_name: formData.second_last_name,
                    occupation: formData.occupation,
                    password: formData.password,
                    password_confirmation: formData.password_confirmation,
                    province_id: formData.province_id,
                    municipality_id: formData.municipality_id,
                    sector_id: formData.sector_id,
                    phone: formData.phone,
                    phone2: formData.phone2,
                    email2: formData.email2,
                    address: formData.address,
                });
            if (response.data?.success) {

                await apiCall().post('/auth/register/questionandanswer',
                    [
                        {
                            citizen_question: formData.first_citizen_question,
                            citizen_answer: formData.first_citizen_answer,
                            citizen_id: formData.citizen_id,
                        },
                        {
                            citizen_question: formData.second_citizen_question,
                            citizen_answer: formData.second_citizen_answer,
                            citizen_id: formData.citizen_id,
                        },
                        {
                            citizen_question: formData.third_citizen_question,
                            citizen_answer: formData.third_citizen_answer,
                            citizen_id: formData.citizen_id,
                        },
                    ])
                setUserRegistered(true);
                handleNext();
            } else {
                //handle errors from server
                if (typeof response.data?.msg?.error === 'object') {
                    handleFieldsValidations(response.data?.msg?.error);
                    enqueueSnackbar('Hay uno o mas errores con la información introducida. Valídalos e inténtalo nuevamente', { variant: 'error' });
                    window.scrollTo(0, 0);
                } else {
                    enqueueSnackbar('Ha sucedido un error inténtelo mas tarde o contacte a soporte', { variant: 'error' });
                    window.scrollTo(0, 0);
                }
            }
        } catch (error) {
            //handle local/network errors 

        }
        dispatch(HideGlobalLoading());
    }

    useLayoutEffect(() => {
        //UPDATE APP HEADER SUBTITLE
        dispatch(UpdateAppSubHeaderTitle('Registro ciudadano')) // TITLE OF SUBHEADER APP
    }, []);

    useEffect(() => {
        if (authenticated) {
            history.push('/app/myDesk')
            return;
        }
        getProvincesData();
        getRegisterQuestionsData();
        getAndSetAllWordPressContent();
    }, []);

    const validateCitizenID = async (e) => {
        formik.setFieldTouched('citizen_id', true, true)
        if (e.target.value.length > 0) {
            try {
                setIsValidatingCedula(true);
                let response = await cedulaValidationService(e.target.value);
                setIsValidatingCedula(false);
                if (response?.success && response?.exist) {
                    //DO NOTHING CEDULA IS VALID
                } else {
                    formik.setFieldError('citizen_id', "Cédula no válida, introduzca otra cédula")
                }
            } catch (error) {
                setIsValidatingCedula(false);
                formik.setFieldError('citizen_id', "Ha ocurrido un error validando la cedula")
            }
        }

    }

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
                            <TextField title="Confirmar contraseña" type="password" id="password_confirmation"
                                value={formik.values.password_confirmation}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.password_confirmation && Boolean(formik.errors.password_confirmation)}
                                helperText={formik.touched.password_confirmation && formik.errors.password_confirmation}
                                required
                            />
                        </Grid>
                    </Grid>
                    :
                    activeStep == 1 ?

                        <Grid alignItems="center" justifyContent="flex-start" container direction="row" spacing={{ xs: 2, md: 3 }} columns={{ xs: 8, sm: 8, md: 12 }}>

                            <Grid item xs={12} sm={12} md={12}>
                                <RadioButtonGroup title="Tipo de documento" id="document_type"
                                    options={identificationTypes}
                                    value={formik.values.document_type}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.document_type && Boolean(formik.errors.document_type)}
                                    helperText={formik.touched.document_type && formik.errors.document_type}
                                    required 
                                    row
                                    />
                            </Grid>

                            <Grid item xs={8} sm={4} md={6}>
                                <TextField title="Documento de Identidad" type="text" id="citizen_id"
                                    required
                                    isLoading={isValidatingCedula}
                                    mask={formik.values.document_type === '1' ? "999-9999999-9" : ""}
                                    unMaskedValue={true}
                                    value={formik.values.citizen_id}
                                    onChange={formik.handleChange}
                                    onBlur={formik.values.document_type === '1' ? validateCitizenID : formik.handleBlur}
                                    error={formik.touched.citizen_id && Boolean(formik.errors.citizen_id)}
                                    helperText={formik.touched.citizen_id && formik.errors.citizen_id}
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
                                <TextField title="Primer apellido" type="text" id="first_last_name"
                                    value={formik.values.first_last_name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.first_last_name && Boolean(formik.errors.first_last_name)}
                                    helperText={formik.touched.first_last_name && formik.errors.first_last_name}
                                    required
                                />
                            </Grid>

                            <Grid item xs={8} sm={4} md={6}>
                                <TextField title="Segundo Apellido" type="text" id="second_last_name"
                                    value={formik.values.second_last_name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.second_last_name && Boolean(formik.errors.second_last_name)}
                                    helperText={formik.touched.second_last_name && formik.errors.second_last_name}
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
                                <Select title="Provincia" type="text" id="province_id"
                                    data={provincesData}
                                    value={formik.values.province_id}
                                    onChange={(e) => {
                                        formik.setFieldValue('municipality_id', '');
                                        formik.setFieldValue('sector_id', '');
                                        formik.handleChange(e);
                                        getMunicipalitiesData(e.target.value)
                                    }}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.province_id && Boolean(formik.errors.province_id)}
                                    helperText={formik.touched.province_id && formik.errors.province_id}
                                    required
                                />
                            </Grid>

                            <Grid item xs={8} sm={4} md={6}>
                                <Select title="Municipio" type="text" id="municipality_id"
                                    disabled={!municipalitiesData.length > 0}
                                    data={municipalitiesData}
                                    value={formik.values.municipality_id}
                                    onChange={(e) => {
                                        formik.setFieldValue('sector_id', '');
                                        formik.handleChange(e);
                                        getSectorsData(e.target.value);
                                    }}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.municipality_id && Boolean(formik.errors.municipality_id)}
                                    helperText={formik.touched.municipality_id && formik.errors.municipality_id}
                                    required
                                />
                            </Grid>

                            <Grid item xs={8} sm={4} md={6}>
                                <Select title="Sector" type="text" id="sector_id"
                                    disabled={!sectorsData.length > 0}
                                    data={sectorsData}
                                    value={formik.values.sector_id}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.sector_id && Boolean(formik.errors.sector_id)}
                                    helperText={formik.touched.sector_id && formik.errors.sector_id}
                                    required
                                />
                            </Grid>

                            <Grid item xs={8} sm={4} md={6}>
                                <PhoneTextField title="Teléfono de contacto" type="text" id="phone"
                                    required
                                    value={formik.values.phone}
                                    onChange={formik.handleChange}
                                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                                    helperText={formik.touched.phone && formik.errors.phone}
                                />
                            </Grid>

                            <Grid item xs={8} sm={4} md={6}>
                                <PhoneTextField title="Telefono de contacto secundario" type="text" id="phone2"
                                    value={formik.values.phone2}
                                    onChange={formik.handleChange}
                                    error={formik.touched.phone2 && Boolean(formik.errors.phone2)}
                                    helperText={formik.touched.phone2 && formik.errors.phone2}
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

                            <Grid alignItems="center" justifyContent="center" container direction="row" spacing={{ xs: 2, md: 3 }} columns={{ xs: 8, sm: 8, md: 12 }}>

                                <Grid item xs={12} sm={12} md={12}>
                                    <Select title="Pregunta de seguridad primaria" id="first_citizen_question"
                                        data={questionsData}
                                        value={formik.values.first_citizen_question}
                                        onChange={handleSecurityQuestionChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.first_citizen_question && Boolean(formik.errors.first_citizen_question)}
                                        helperText={formik.touched.first_citizen_question && formik.errors.first_citizen_question}
                                        required
                                    />
                                </Grid>

                                <Grid item xs={12} sm={12} md={12}>
                                    <TextField title="Respuesta de seguridad primaria" type="text" id="first_citizen_answer"
                                        required
                                        value={formik.values.first_citizen_answer}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.first_citizen_answer && Boolean(formik.errors.first_citizen_answer)}
                                        helperText={formik.touched.first_citizen_answer && formik.errors.first_citizen_answer}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={12} md={12}>
                                    <Select title="Pregunta de seguridad secundaria" id="second_citizen_question"
                                        data={questionsData}
                                        value={formik.values.second_citizen_question}
                                        onChange={handleSecurityQuestionChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.second_citizen_question && Boolean(formik.errors.second_citizen_question)}
                                        helperText={formik.touched.second_citizen_question && formik.errors.second_citizen_question}
                                        required
                                    />
                                </Grid>

                                <Grid item xs={12} sm={12} md={12}>
                                    <TextField title="Respuesta de seguridad secundaria" type="text" id="second_citizen_answer"
                                        required
                                        value={formik.values.second_citizen_answer}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.second_citizen_answer && Boolean(formik.errors.second_citizen_answer)}
                                        helperText={formik.touched.second_citizen_answer && formik.errors.second_citizen_answer}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={12} md={12}>
                                    <Select title="Pregunta de seguridad terciaria" id="third_citizen_question"
                                        data={questionsData}
                                        value={formik.values.third_citizen_question}
                                        onChange={handleSecurityQuestionChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.third_citizen_question && Boolean(formik.errors.third_citizen_question)}
                                        helperText={formik.touched.third_citizen_question && formik.errors.third_citizen_question}
                                        required
                                    />
                                </Grid>

                                <Grid item xs={12} sm={12} md={12}>
                                    <TextField title="Respuesta de seguridad terciaria" type="text" id="third_citizen_answer"
                                        required
                                        value={formik.values.third_citizen_answer}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.third_citizen_answer && Boolean(formik.errors.third_citizen_answer)}
                                        helperText={formik.touched.third_citizen_answer && formik.errors.third_citizen_answer}
                                    />
                                </Grid>


                            </Grid>

                            :
                            activeStep == 3 ?

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

                                <FinalStepContainer>
                                    <StyledCheckCircleIcon />
                                    <SmallHeightDivider />
                                    <SubTitle>
                                        ¡Gracias!
                                        Recibirás un correo de verificacion.
                                    </SubTitle>

                                </FinalStepContainer>
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
                        userRegistered ?
                            <StyledButton onClick={() => history.push('/public')}>
                                Ir a inicio
                            </StyledButton>
                            :
                            <StyledButtonOutlined onClick={handleSubmitForm} variant="outlined">
                                {lastStep ? "Registrar" : "Continuar"}
                            </StyledButtonOutlined>
                    }
                </ButtonContainer>
            </ButtonsContainer>
        </Container >
    );
}

export default Register;