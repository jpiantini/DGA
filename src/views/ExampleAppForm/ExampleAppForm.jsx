import { useState, useLayoutEffect, useEffect } from 'react';
import { BodyText, BodyTextBold, Title,SubTitle, SmallHeightDivider, RowBodyDivider, StyledButtonOutlined, StyledButton, MediumHeightDivider } from '../../theme/Styles';
import { ListServices, MockupSteps } from './ExampleAppFormConstants';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from "react-redux";
import { UpdateAppSubHeaderTitle } from '../../redux/actions/UiActions';
import { useParams } from "react-router-dom";
import {
    ButtonsContainer,
    ButtonContainer,
    Container,
    ImageContainer,
    LogoImage,
    PaymentMethodsContainer,
} from './styles/ExampleAppFormStyles';
import MobileStepper from '@mui/material/MobileStepper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import TextInformation from '../../components/TextInformation/TextInformation'
import { Grid } from '@mui/material';
import Select from '../../components/Select/Select';
import TextField from '../../components/TextField/TextField';
import DatePicker from '../../components/DatePicker/DatePicker';
import CheckBoxGroup from '../../components/CheckBoxGroup/CheckBoxGroup';
import RadioButtonGroup from '../../components/RadioButtonGroup/RadioButtonGroup';
import UploadFile from '../../components/UploadFile/UploadFile';
import TimePicker from '../../components/TimePicker/TimePicker';
import CheckBox from '../../components/CheckBox/CheckBox';

function ExampleAppForm() {
    const matchesWidth = useMediaQuery('(min-width:768px)');
    const history = useHistory();
    const dispatch = useDispatch();
    const { authenticated } = useSelector((state) => state.authReducer);

    const stepsLenght = MockupSteps.length;
    const [activeStep, setActiveStep] = useState(0);
    const [togglePaymentForm, setTogglePaymentForm] = useState();


    const [testDate, setTestDate] = useState();
    const [testTime, setTestTime] = useState();

    const [testCheckboxValue, setTestCheckboxValue] = useState();
    const [testAdataOptions, setTestAdataOptions] = useState(
        [
            {
                id: 'checkboxValue1',
                value: true,
                label: 'Value 1'
            },
            {
                id: 'checkboxValue2',
                value: false,
                label: 'Value 2'
            },
            {
                id: 'checkboxValue3',
                value: false,
                label: 'Value 3'
            },
        ]
    );
    let testAdata = [
        {
            value: 1,
            label: 'Selection 1'
        },
        {
            value: 2,
            label: 'Selection 2'
        },
        {
            value: 3,
            label: 'Selection 3'
        },
    ]
    const [testRadio, setTestRadio] = useState(1);
    let testRadiodataOptions = [
        {
            value: 1,
            label: 'Yes'
        },
        {
            value: 0,
            label: 'No'
        },

    ]

    const handleNext = () => {
        //NEED CHANGE MockupSteps to FormSteps
        setActiveStep((prevActiveStep) => prevActiveStep + 1 == stepsLenght ? prevActiveStep : prevActiveStep + 1);
        if (stepsLenght - 2 == activeStep) {
            setTogglePaymentForm(true);
        } else {
            setTogglePaymentForm(false)
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep == 0 ? 1 : prevActiveStep - 1);
        if (stepsLenght - 1 == activeStep) {
            setTogglePaymentForm(true);
        } else {
            setTogglePaymentForm(false)
        }
    };

    useLayoutEffect(() => {
            //UPDATE APP HEADER SUBTITLE
            dispatch(UpdateAppSubHeaderTitle('Formulario de prueba')) // TITLE OF SUBHEADER APP
    }, []);



    return (
        <Container >
            {
                matchesWidth &&
                <Stepper activeStep={activeStep} alternativeLabel>
                    {MockupSteps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            }
            <SmallHeightDivider />
            <SmallHeightDivider />
                    <Container>
                        <Title>TITULO FORMULARIO DE PRUEBA - PASO {activeStep + 1}</Title>
                        <SubTitle>SUBTITULO FORMULARIO DE PRUEBA - PASO {activeStep + 1}</SubTitle>
                        <Select title="Select" required data={testAdata} />

                        <TextField title="TextField Text" type="text" required />
                        <TextField title="TextField Number" type="number" required />
                        <TextField title="TextField Masked" type="text"
                            mask="999-999-9999" unMaskedValue={true} onChange={(e) => console.log(e)}
                            required />
                        <TextField multiline title="TextField Text Multiline" type="text" required />

                        <DatePicker title="Date Picker" required value={testDate} onChange={(e) => setTestDate(e.target.value)} />
                        <TimePicker  title="Time Picker" required value={testTime} onChange={(e) => setTestTime(e.target.value)} />
                        
                        <CheckBox label="Checkbox Label" title="Checkbox" value={testCheckboxValue} onChange={(e) => setTestCheckboxValue(e.target.value)}/>
                        
                        <CheckBoxGroup title="CheckBox Group"
                            options={testAdataOptions}
                            onChange={(e) => setTestAdataOptions(e.target.value)} />

                        <RadioButtonGroup title="RadioButton Group"
                            options={testRadiodataOptions}
                            value={testRadio}
                            onChange={(e) => setTestRadio(e.target.value)} />

                            <UploadFile title="Upload File" id={'Acta de nacimiento'}/>

                        <div style={{ height: '50px' }} />
                    </Container>
                  
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
                        MockupSteps.length - 2 == activeStep ?
                            <StyledButton onClick={handleNext}>
                                Enviar Solicitud
                            </StyledButton>
                            :
                            <StyledButtonOutlined disabled={activeStep + 1 == MockupSteps.length} onClick={handleNext} variant="outlined">
                                Continuar
                            </StyledButtonOutlined>
                    }
                </ButtonContainer>
            </ButtonsContainer>
        </Container >

    );
}

export default ExampleAppForm;
