import { useState, useEffect, memo } from 'react';
import {
    SmallHeightDivider,
    StyledButtonOutlined,
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
import { dataObjectRuleChanger, getFieldValidation } from './FormFunctions';
import RenderField from './components/RenderField';
import { localToString } from '../../../../utilities/functions/StringUtil';
import { safeValExtraction } from '../../../../utilities/functions/ObjectUtil';
import { RULE_LIST } from './FormConstants';

function Form(props) {
    const matchesWidth = useMediaQuery('(min-width:768px)');
    const history = useHistory();
    let { serviceID } = useParams();
    const dispatch = useDispatch();
    const { authenticated } = useSelector((state) => state.authReducer);

    const [localData, setLocalData] = useState([]);
    const stepsLenght = localToArray(localData).length;
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
        if (localData[step]) {
            let stepField = false
            for (let i = 0; i < localData[step]?.length; i++) {
                const field = localData[step][i];
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
        if (localToArray(localData).length > 0) {
            const innerSchema = {}
            localData[activeStep].map((field) => {
                const validator = getFieldValidation(field)
                if (validator) {
                    innerSchema[field.fieldKey] = getFieldValidation(field)
                }
            })
            setSchemaValidation(innerSchema)
        }
        return () => { }
    }, [localData, activeStep])

    useEffect(() => {
        if (localToArray(props.data).length > 0) {
            setLocalData(localToArray(props.data))
            const innerState = { ...state, ...values }
            props.data.map((step) => {
                step.map(field => {
                    if (!innerState[field.fieldKey]) {
                        innerState[field.fieldKey] = undefined
                    }
                })
            })
            setState(innerState)
        }
        return () => { }
    }, [props.data])

    const localDoRequest = ({ values, actions }) => {
        if (lastStep && typeof props.doRequest == 'function') {
            console.log({ values, actions })
            props.doRequest({ values, actions })
        } else {
            setActiveStep(activeStep + 1);
            actions?.setTouched({});
            actions?.setSubmitting(false);
        }
    }

    const changeRule = (rule) => {
        if (!rule || rule == '') {
            return
        }

        const ruleList = [rule]
        let _localData = localToArray(localData)

        for (let index = 0; index < ruleList.length; index++) {
            const ruleSeparated = localToString(ruleList[index]).split(':')
            const ruleAction = localToString(ruleSeparated[0]).split(',')
            const ruleField = localToString(ruleSeparated[1]).split(',')

            _localData = localToArray(_localData).map((step) => {
                return localToArray(step).map((field) => {
                    const findRuleField = ruleField.find(fieldName => field.fieldKey == fieldName)
                    if (!findRuleField) {
                        return field
                    } else {
                        const findIndexRuleField = ruleField.findIndex(fieldName => field.fieldKey == fieldName)
                        const _field = dataObjectRuleChanger(field, RULE_LIST[ruleAction[findIndexRuleField]], setFieldValue)

                        //add more ruleList if its rule five and the other field (select) has value
                        if (
                            RULE_LIST[ruleAction[findIndexRuleField]] == RULE_LIST[5] &&
                            safeValExtraction(values[field.fieldKey], 'rule')
                        ) {
                            ruleList.push(safeValExtraction(values[field.fieldKey], 'rule'))
                        }

                        //return the modified object
                        return _field
                    }
                })
            })
        }

        setLocalData(_localData)
    }


    const LocalRenderField = ({ item, index }) => {
        return (
            <RenderField
                {...item}
                key={item.key}
                fieldKey={item.fieldKey}
                index={index}
                value={values[item.fieldKey]}
                fatherValue={values[localToString(item.father_id)]}
                placeholder={item.placeholder}
                error={touched[item.fieldKey] && Boolean(errors[item.fieldKey])}
                helperText={touched[item.fieldKey] && errors[item.fieldKey]}
                onChange={setFieldValue}
                setFieldTouched={setFieldTouched}
                changeRule={changeRule}

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
                    {localData.map((stepData, index) => {
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
                                <StepLabel {...labelProps}>{localData[index][0].label}</StepLabel>
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
                            localToArray(localData[activeStep]).map((item, index) => {
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
