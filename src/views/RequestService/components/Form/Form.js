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
import { isEmpty } from '../../../../utilities/functions/ValidationUtil';
import LocalStorageService from '../../../../services/LocalStorageService';
import { HideGlobalLoading, ShowGlobalLoading } from '../../../../redux/actions/UiActions';

function Form(props) {
    const matchesWidth = useMediaQuery('(min-width:768px)');
    const history = useHistory();
    let { serviceID } = useParams();
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const [localFieldErrors, setLocalFieldErrors] = useState({});
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
    const [showRestoreFormModal, setShowRestoreFormModal] = useState(false);

    const [state, setState] = useState({});
    const [schemaValidation, setSchemaValidation] = useState({});
    const { errors, handleBlur, setFieldValue, handleChange, values, handleSubmit, touched, setFieldTouched, setFieldError, setErrors, setTouched, setValues } = useFormik({
        initialValues: state,
        onSubmit: (values, actions) => localDoRequest({ values, actions }),
        validationSchema: yup.object().shape(schemaValidation),
        enableReinitialize: true,
    });

    const saveCurrentFormDataInLocalStorage = () => {
        const formData = {
            serviceID,
            localFieldErrors,
            localData,
            fakeSteps,
            fakeStep,
            activeStep,
            fakeStepsToShow,
            state,
            schemaValidation,
            errors,
            values,
            touched
        }
        console.log(formData)
        LocalStorageService.setItem(`dynamicFormData`, formData)
    }

    const restoreSavedFormDataFromLocalStorage = () => {
        props.setPriceModalIsOpen(false);
        const formData = LocalStorageService.getItem(`dynamicFormData`);
        console.log(formData)
        dispatch(ShowGlobalLoading('Reestableciendo formulario'))
        setLocalFieldErrors(formData.localFieldErrors);
        setLocalData(formData.localData);
        setFakeSteps(formData.fakeSteps);
        setFakeStep(formData.fakeStep);
        setActiveStep(formData.activeStep);
        setFakeStepsToShow(formData.fakeStepsToShow);
        setState(formData.state);
        setSchemaValidation(formData.schemaValidation)
        setErrors(formData.errors);
        setTouched(formData.touched)
        setValues(formData.values);

        //  simulate 2.3s while form is initializing 
        setTimeout(() => {
            handleShowRestoreFormModal();
            dispatch(HideGlobalLoading())
        }, 2300);
    }

    const cancelRestoreForm = () => {
        dispatch(ShowGlobalLoading('Inicializando formulario'));
        LocalStorageService.removeItem(`dynamicFormData`);
        // simulate 2.3s while form is initializing 
        setTimeout(() => {
            setShowRestoreFormModal(false);
            props.setPriceModalIsOpen(true);
            dispatch(HideGlobalLoading())
        }, 2500);
    }


    const handleShowSubmitModal = () => {
        setShowSubmitModal(!showSubmitModal)
    }

    const handleShowRestoreFormModal = () => {
        setShowRestoreFormModal(!showRestoreFormModal)
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

            const formData = LocalStorageService.getItem(`dynamicFormData`);
            if (formData?.serviceID === serviceID) {
                setShowRestoreFormModal(true)
                return;
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
        saveCurrentFormDataInLocalStorage();
        if (Object.keys(localFieldErrors).length > 0) {
            window.scrollTo(0, 0);
            return
        }
        if (fakeLastStep && typeof props.doRequest == 'function') {
            handleShowSubmitModal();
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
                error={touched[item.fieldKey] && Boolean(errors[item.fieldKey] || localFieldErrors[item.fieldKey])}
                helperText={touched[item.fieldKey] && (errors[item.fieldKey] || localFieldErrors[item.fieldKey])}
                onChange={setFieldValue}
                setFieldTouched={setFieldTouched}
                setFieldError={setFieldError}
                changeRule={changeRule}
                setLocalFieldErrors={setLocalFieldErrors}
                localFieldErrors={localFieldErrors}
                multipleDocuments={props?.multipleDocuments}
            //       step={step}
            //    steps={steps}
            />
        )
    }

    return (
        <Container >
            <ImportantInformationModal open={showRestoreFormModal} onBackDropClick={() => { }}
                onCloseClick={cancelRestoreForm} CloseTitle="Cancelar" CloseButton
                buttonTitle="Confirmar" buttonClick={restoreSavedFormDataFromLocalStorage} content={
                    <Fragment>
                        <strong>
                            Se ha encontrado información previa de una solicitud sin terminar.
                        </strong>
                        <br />
                        <strong>
                            <p>
                                ¿Desea cargarla para esta solicitud?
                            </p>
                        </strong>
                        <p>
                            Si cancela la informacion sera borrada.
                        </p>
                    </Fragment>
                } />

            <ImportantInformationModal open={showSubmitModal} onBackDropClick={handleShowSubmitModal}
                onCloseClick={handleShowSubmitModal} CloseTitle="Cancelar" CloseButton
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
                        fakeStepsToShow?.map((stepData) => {
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
