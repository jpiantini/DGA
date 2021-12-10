import { useState, useLayoutEffect, useEffect, memo } from 'react';
import {
    BodyText,
    BodyTextBold,
    SmallHeightDivider,
    StyledButtonOutlined,
    StyledButton,
    MediumHeightDivider
} from '../../../../theme/Styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
    ButtonsContainer,
    ButtonContainer,
    Container,
} from './styles/FormStyles';
import MobileStepper from '@mui/material/MobileStepper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Grid, Typography } from '@mui/material';
import { localToArray } from '../../../../utilities/functions/ArrayUtil';
import { useFormik } from 'formik';
import * as  yup from 'yup';
import { getFieldValidation } from './FormFunctions';
import RenderField from './components/RenderField';

function Form(props) {
    const matchesWidth = useMediaQuery('(min-width:768px)');
    const history = useHistory();
    let { serviceID } = useParams();
    const dispatch = useDispatch();
    const { authenticated } = useSelector((state) => state.authReducer);

    const stepsLenght = localToArray(props.data).length;
    const [activeStep, setActiveStep] = useState(0);
    const lastStep = (stepsLenght - 1) == activeStep;

    const [togglePaymentForm, setTogglePaymentForm] = useState();

    const [state, setState] = useState({});
    const [schemaValidation, setSchemaValidation] = useState({});
    const { errors, handleBlur, setFieldValue, handleChange, values, handleSubmit, touched, setFieldTouched } = useFormik({
        initialValues: state,
        onSubmit: (values, actions) => localDoRequest({ values, actions }),
        validationSchema: yup.object().shape(schemaValidation),
        enableReinitialize: true,
    });

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep == 0 ? 1 : prevActiveStep - 1);
    };

    const handleStepsValidation = (step) => {
        if (props.data[step]) {
            let stepField = false
            for (let i = 0; i < props.data[step]?.length; i++) {
                const field = props.data[step][i];
                console.log(field)
                if (touched[field.fieldKey] && Boolean(errors[field.fieldKey])) {
                    stepField = true;
                }
            }
            if (stepField) {
                return true;
            } else {
                return false;
            }
        }
    }

    useEffect(() => {
        if (localToArray(props.data).length > 0) {
            const innerState = { ...state, ...values }
            const innerSchema = {}
            props.data[activeStep].map((field) => {
                const validator = getFieldValidation(field)
                if (validator) {
                    innerSchema[field.fieldKey] = getFieldValidation(field)
                }
                if (!innerState[field.fieldKey]) {
                    innerState[field.fieldKey] = undefined
                }
            })
            setState(innerState)
            setSchemaValidation(innerSchema)
        }
        return () => { }
    }, [props.data, activeStep])

    const localDoRequest = ({ values, actions }) => {
        if (lastStep && typeof props.doRequest == 'function') {
            props.doRequest({ values, actions })
        } else {
            setActiveStep(activeStep + 1);
            actions?.setTouched({});
            actions?.setSubmitting(false);
        }
    }

    const LocalRenderField = ({ item, index }) => {
        //   console.log(item)
        return (
            <RenderField
                {...item}
                key={item?.fieldKey}
                index={index}
                value={values[item.fieldKey]}
                placeholder={item.placeholder}
                error={touched[item.fieldKey] && Boolean(errors[item.fieldKey])}
                helperText={touched[item.fieldKey] && errors[item.fieldKey]}
                onChange={setFieldValue}
                handleBlur={handleBlur}
            //       step={step}
            //    steps={steps}
            />
        )
    }

    return (
        <Container >
            {
                matchesWidth &&
                <Stepper activeStep={activeStep} alternativeLabel>
                    {props.data.map((stepData, index) => {
                        const labelProps = {};
                        if (handleStepsValidation(index)) {
                            labelProps.optional = (
                                <Typography sx={{ marginLeft: '47.5%' }} variant="caption" color="error">
                                    Error
                                </Typography>
                            );
                            labelProps.error = true;
                        }
                        return (
                            <Step key={index}>
                                <StepLabel {...labelProps}>{index}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
            }
            <SmallHeightDivider />
            <SmallHeightDivider />
            {
                !togglePaymentForm ?
                <Grid alignItems="center" justifyContent="flex-start" container direction="row" spacing={{ xs: 2, md: 3 }} columns={{ xs: 3, sm: 6, md: 12 }}>
                {
                            localToArray(props.data[activeStep]).map((item, index) => {
                                console.log(item, index)
                                return (
                                    LocalRenderField({ item, index })
                                )
                            })
                        }

                    </Grid>
                    :
                    <Container>


                    </Container>
            }
            <MediumHeightDivider />
            <ButtonsContainer>
                <ButtonContainer>
                    <StyledButtonOutlined disabled={activeStep == 0 || togglePaymentForm} onClick={handleBack} variant="outlined">
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

                    <StyledButtonOutlined onClick={handleSubmit} variant="outlined">
                        {lastStep ? 'Enviar Solicitud' : 'Continuar'}
                    </StyledButtonOutlined>

                </ButtonContainer>
            </ButtonsContainer>
        </Container >

    );
}

export default memo(Form);
