import { useState, useEffect, memo, Fragment } from 'react';
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
import { dataObjectRuleChanger, fieldRuleChanger, getFieldValidation } from './FormFunctions';
import RenderField from './components/RenderField';
import { localToString } from '../../../../utilities/functions/StringUtil';
import { safeValExtraction } from '../../../../utilities/functions/ObjectUtil';
import { FIELD_TYPES, RULE_LIST } from './FormConstants';
import { useSnackbar } from 'notistack';
import ImportantInformationModal from '../../../../components/ImportantInformationModal/ImportantInformationModal';

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

    const [showSubmitModal, setShowSubmitModal] = useState(false);

    const [state, setState] = useState({});
    const [schemaValidation, setSchemaValidation] = useState({});
    const { errors, handleBlur, setFieldValue, handleChange, values, handleSubmit, touched, setFieldTouched, setFieldError } = useFormik({
        initialValues: state,
        onSubmit: (values, actions) => localDoRequest({ values, actions }),
        validationSchema: yup.object().shape(schemaValidation),
        enableReinitialize: true,
    });

    const handleShowModal = () => {
        setShowSubmitModal(!showSubmitModal)
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
        const _data = localToArray(props.data)
        if (_data.length > 0) {
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
                setLocalData(_data)
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
            changeRule(rules, _data)
            setState(innerState)
        }
        return () => { }
    }, [props.data])

    const handleSubmitForm = (e) => {
        handleSubmit(e);
        window.scrollTo(0, 0);
        if (Object.keys(errors).length != 0 && touched[Object.keys(errors)[0]]) {
            enqueueSnackbar('Llene todos los campos requeridos', { variant: 'error' });
        }
    }

    const localDoRequest = ({ values, actions }) => {
        if (fakeLastStep && typeof props.doRequest == 'function') {
            handleShowModal();
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

    const handleModalSubmit = () => {
        props.doRequest(values);
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

            _localData = _localData.map((step) => {
                return step.map((field) => {
                    //Main field modifier
                    let _field = fieldRuleChanger({
                        field,
                        ruleAction,
                        ruleField,
                        ruleList,
                        values,
                        setFieldValue,
                    })

                    //Secondary field modifier (for fields inside field)
                    if (field.type == FIELD_TYPES.grid && localToArray(field.fields).length) {
                        _field = {
                            ..._field,
                            fields: field.fields.map((fieldsField) => {
                                const _fieldsField = fieldRuleChanger({
                                    field: fieldsField,
                                    ruleAction,
                                    ruleField,
                                    ruleList,
                                    values,
                                    setFieldValue,
                                })
                                return _fieldsField
                            })
                        }
                    }

                    return _field
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
                setFieldError={setFieldError}
                changeRule={changeRule}

            //       step={step}
            //    steps={steps}
            />
        )
    }

    return (
        <Container >
            <ImportantInformationModal open={showSubmitModal} onBackDropClick={handleShowModal}
                onCloseClick={handleShowModal} CloseTitle="Cancelar" CloseButton
                buttonTitle="Confirmar" buttonClick={handleModalSubmit} content={
                    <Fragment>
                        <p>
                            Verifique que todos los datos suministrados en el formulario son correctos, en caso de tener alguna información errónea puede volver al paso anterior y arreglarla.
                        </p>
                        <strong>
                            Declaro que esta información es verídica y al hacerlo autorizo al Ministerio de Turismo de la Republica Dominicana a consultar mis datos personales en las distintas instituciones que intervienen en la presente solicitud.
                        </strong>
                    </Fragment>
                } />
            {
                matchesWidth &&
                <Stepper activeStep={fakeStep} alternativeLabel>
                    {
                        fakeStepsToShow.map((stepData) => {
                            const labelProps = {};
                            /*         if (handleStepsValidation(stepData.realIndexInLocalData)) {
                                         labelProps.optional = (
                                             <Typography sx={{ marginLeft: '47.5%' }} variant="caption" color="error">
                                                 Error
                                             </Typography>
                                         );
                                         labelProps.error = true;
                                     }
                                     */

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
