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
import { FIELD_TYPES, RULE_LIST } from './FormConstants';
import { useSnackbar } from 'notistack';

function Form(props) {
    const matchesWidth = useMediaQuery('(min-width:768px)');
    const history = useHistory();
    let { serviceID } = useParams();
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const [localData, setLocalData] = useState([]);
    const stepsLenght = localToArray(localData).length;
    const [fakeSteps, setFakeSteps] = useState([]);
    const fakeStepsLenght = localToArray(fakeSteps).length;
    const [fakeStep, setFakeStep] = useState(0)
    const [activeStep, setActiveStep] = useState(0);
    const [fakeStepsToShow, setFakeStepsToShow] = useState([]);

    const lastStep = (stepsLenght - 1) == activeStep;
    const fakeLastStep = (fakeStepsLenght - 1) == fakeStep;

    const [state, setState] = useState({});
    const [schemaValidation, setSchemaValidation] = useState({});
    const { errors, handleBlur, setFieldValue, handleChange, values, handleSubmit, touched, setFieldTouched } = useFormik({
        initialValues: state,
        onSubmit: (values, actions) => localDoRequest({ values, actions }),
        validationSchema: yup.object().shape(schemaValidation),
        enableReinitialize: true,
    });

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

    //componentDidUpdate
    useEffect(() => {
        if (!fakeLastStep) {
            if (localToArray(localData).length > 0) {
                const notHidden = localData.filter(step => !step[0].hidden)
                let data = notHidden.map((step, index) => {
                    return {
                        label: step[0].label,
                        index: index,
                        realIndexInLocalData: localData.findIndex(localDataStep => localDataStep[0].key === step[0].key)
                    }
                })
                setFakeSteps(data)
                const newSliceValue = fakeStep >= (fakeSteps[fakeSteps.length - 1]?.index + 1) - 6 ? (fakeSteps[fakeSteps.length - 1]?.index + 1) - 6 : fakeStep;
                const slicedArray = data.slice(newSliceValue >= 0 ? newSliceValue : 0, newSliceValue + 6);
                setFakeStepsToShow(slicedArray)
            }
        }
        return () => { }
    }, [localData, fakeStep])

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
            //setting every key to undefined so formik mark red error
            const innerState = { ...state, ...values }

            for (const field of props.plainData) {
                if (!innerState[field.fieldKey]) {
                    innerState[field.fieldKey] = undefined
                }
            }

            //initialValues from dynamic form
            let initialState = props.plainData.find(field => field.type == FIELD_TYPES.initialValues)?.rules?.[0]
            if (!initialState) {
                //setting initial rules && values
                setLocalData(localToArray(props.data))
                setState(innerState)
                return
            } else if (initialState) {
                initialState = JSON.parse(initialState)
            }
            const rules = []
            for (const field of initialState) {
                const originalObject = props.plainData.find(plainField => plainField.name == field.name)
                switch (field.type) {
                    case FIELD_TYPES.checkboxGroup:
                        const checkRule = originalObject?.values.find(values => values.value == field.value)?.rule
                        if (checkRule) {
                            rules.push(checkRule)
                        }
                        innerState[field.name] = true
                        break;
                    case FIELD_TYPES.radioGroup:
                        const radioRule = originalObject?.values.find(values => values.value == field.value)?.rule
                        if (radioRule) {
                            rules.push(radioRule)
                        }
                        innerState[field.name] = field.value
                        break;
                    default:
                        innerState[field.name] = field.value
                        break;
                }
            }

            //setting initial rules && values
            changeRule(rules, localToArray(props.data))
            setState(innerState)
        }
        return () => { }
    }, [props.data])

    const handleSubmitForm = (e) => {
        handleSubmit(e);
        window.scrollTo(0, 0);
        if (Object.keys(errors).length != 0) {
            enqueueSnackbar('Llene todos los campos requeridos', { variant: 'error' });
        }
    }

    const localDoRequest = ({ values, actions }) => {
        if (fakeLastStep && typeof props.doRequest == 'function') {
            props.doRequest(values)
        } else {
            let extraStep = 0
            for (let i = (activeStep + 1); i < localData.length; i++) {
                const fields = localData[i]
                if (fields[0].hidden) {
                    extraStep++
                } else {
                    break;
                }
            }
            setActiveStep(activeStep + 1 + extraStep);
            setFakeStep(fakeStep + 1)
            actions?.setTouched({});
            actions?.setSubmitting(false);
        }
    }

    const handleBack = () => {
        window.scrollTo(0, 0);
        let extraStep = 0
        for (let i = (activeStep - 1); i > 0; i--) {
            const fields = localData[i]
            if (fields[0].hidden) {
                extraStep++
            } else {
                break;
            }
        }
        setActiveStep((prevActiveStep) => prevActiveStep == 0 ? 1 : (prevActiveStep - 1 - extraStep));
        setFakeStep(fakeStep - 1)
    };


    const changeRule = (rule, initialData) => {
        if (!rule || !rule.length) {
            return
        }

        const ruleList = Array.isArray(rule) ? rule : [rule]
        let _localData = localToArray(initialData ?? localData)

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
                        const rulesToApply = ruleField
                            .map((fieldName, index) => {
                                if (field.fieldKey == fieldName) {
                                    return RULE_LIST[ruleAction[index]]
                                } else {
                                    return null
                                }
                            })
                            .filter(item => item !== null)
                        const _field = dataObjectRuleChanger(field, rulesToApply, setFieldValue)

                        //add more ruleList if its rule five and the other field (select) has value
                        if (
                            rulesToApply.find(item => item == RULE_LIST[5]) &&
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
                <Stepper activeStep={fakeStep} alternativeLabel>
                    {
                        fakeStepsToShow.map((stepData) => {
                            const labelProps = {};
                            if (handleStepsValidation(stepData.realIndexInLocalData)) {
                                labelProps.optional = (
                                    <Typography sx={{ marginLeft: '47.5%' }} variant="caption" color="error">
                                        Error
                                    </Typography>
                                );
                                labelProps.error = true;
                            }
                            return (
                                <Step index={stepData.index} key={stepData.index}>
                                    <StepLabel {...labelProps}>{stepData.label}</StepLabel>
                                </Step>
                            );
                        })
                    }
                </Stepper>
            }
            <SmallHeightDivider />
            <SmallHeightDivider />
            <Grid alignItems="center" justifyContent="flex-start" container direction="row" spacing={{ xs: 2, md: 3 }} columns={{ xs: 3, sm: 6, md: 12 }}>
                {
                    localToArray(localData[activeStep]).map((item, index) => {
                        return (
                            LocalRenderField({ item, index })
                        )
                    })
                }

            </Grid>
            <MediumHeightDivider />
            {matchesWidth &&
                <ButtonsContainer>
                    <ButtonContainer>
                        <StyledButtonOutlined disabled={activeStep == 0} onClick={handleBack} variant="outlined">
                            Retroceder
                        </StyledButtonOutlined>
                    </ButtonContainer>

                    <ButtonContainer>
                        <StyledButtonOutlined onClick={handleSubmitForm} variant="outlined">
                            {fakeLastStep ? 'Enviar Solicitud' : 'Continuar'}
                        </StyledButtonOutlined>
                    </ButtonContainer>
                </ButtonsContainer>
            }


            { //STEPPER WHEN DEVICE IS MOBILE
                !matchesWidth &&
                <MobileStepper
                    variant="progress"
                    sx={{ display: 'flex', justifyContent: 'space-between', alignSelf: 'center' }}
                    LinearProgressProps={{
                        style: {
                            margin: '5%'
                        },
                        title: "aaaaaaa"
                    }}
                    steps={fakeStepsLenght}
                    position="bottom"
                    activeStep={activeStep}
                    backButton={
                        <ButtonContainer>
                            <StyledButtonOutlined disabled={activeStep == 0} onClick={handleBack} variant="outlined">
                                Retroceder
                            </StyledButtonOutlined>
                        </ButtonContainer>
                    }
                    nextButton={
                        <ButtonContainer>
                            <StyledButtonOutlined onClick={handleSubmitForm} variant="outlined">
                                {fakeLastStep ? 'Enviar Solicitud' : 'Continuar'}
                            </StyledButtonOutlined>
                        </ButtonContainer>

                    }
                />
            }
        </Container >

    );
}

export default memo(Form);
