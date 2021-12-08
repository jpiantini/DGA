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
import { Grid } from '@mui/material';
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

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1 == stepsLenght ? prevActiveStep : prevActiveStep + 1);
     /*   if (stepsLenght - 2 == activeStep) {
            setTogglePaymentForm(true);
        } else {
            setTogglePaymentForm(false)
        }*/
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep == 0 ? 1 : prevActiveStep - 1);
     /*   if (stepsLenght - 1 == activeStep) {
            setTogglePaymentForm(true);
        } else {
            setTogglePaymentForm(false)
        }*/
    };

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
            setActiveStep(activeStep + 1)
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
                    {/*props.data.map(({item,index}) => (
                        <Step key={index}>
                            <StepLabel>{index+1}</StepLabel>
                        </Step>
                    ))*/}
                    <Step key={0}>
                        <StepLabel>{0}</StepLabel>
                    </Step>
                    <Step key={1}>
                        <StepLabel>{1}</StepLabel>
                    </Step>
                  
                </Stepper>
            }
            <SmallHeightDivider />
            <SmallHeightDivider />
            {
                !togglePaymentForm ?
                    <Container>

                        {

                            localToArray(props.data[activeStep]).map(( item, index ) => {
                                console.log(item,index)
                                return(
                                <LocalRenderField
                                    item={item}
                                    index={index}
                                    key={index}
                                />
                            )})
                        }

                    </Container>
                    :
                    <Container>


                    </Container>
            }

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
                    {
                     /*   stepsLenght - 2 == activeStep ?
                            <StyledButton onClick={handleNext}>
                                Enviar Solicitud
                            </StyledButton>
                            :*/
                            <StyledButtonOutlined disabled={activeStep + 1 == stepsLenght} onClick={handleNext} variant="outlined">
                                Continuar
                            </StyledButtonOutlined>
                    }
                </ButtonContainer>
            </ButtonsContainer>
        </Container >

    );
}

export default memo(Form);
