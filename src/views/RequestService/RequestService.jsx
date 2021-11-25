import { useState, useLayoutEffect } from 'react';
import { BodyText, Row, SmallHeightDivider, RowBodyDivider, StyledButtonOutlined } from '../../theme/Styles';
import { ListServices, MockupSteps } from './RequestServiceConstants';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from "react-redux";
import { UpdateAppSubHeaderTitle } from '../../redux/actions/UiActions';
import { useParams } from "react-router-dom";
import {
    ButtonsContainer,
    ButtonContainer,
    Container,
} from './styles/RequestServicesStyles';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

function RequestService() {
    const matchesWidth = useMediaQuery('(min-width:768px)');
    const history = useHistory();
    let { id } = useParams();
    const dispatch = useDispatch();
    const { authenticated } = useSelector((state) => state.authReducer);

    const [activeStep, setActiveStep] = useState(0);
    const [backButtonActive, setActiveStep] = useState(0);

    const handleNext = () => {
        //NEED CHANGE MockupSteps to FormSteps
        let stepsLenght = MockupSteps.length;
        setActiveStep((prevActiveStep) => prevActiveStep + 1 == stepsLenght ? prevActiveStep : prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep == 0 ? 1 : prevActiveStep - 1);
    };

    useLayoutEffect(() => {
        let Service = ListServices.find((service) => service.id == id);
        if (Service) {
            //UPDATE APP HEADER SUBTITLE
            dispatch(UpdateAppSubHeaderTitle(Service.title)) // TITLE OF SUBHEADER APP
        } else {
            //IF ENTERED SERVICE AS PARAM DOES`NT EXISTS REDIRECT TO FIRST SERVICE
            history.push('/app/requestService/1')
            let Service = ListServices.find((service) => service.id == id);
            dispatch(UpdateAppSubHeaderTitle(Service.title))
        }
    }, []);

    return (
        <Container >
            <Stepper activeStep={activeStep} alternativeLabel>
                {MockupSteps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>


            <ButtonsContainer>
                <ButtonContainer>
                    <StyledButtonOutlined disabled={activeStep == 0} onClick={handleBack} variant="outlined">
                        Retroceder
                    </StyledButtonOutlined>
                </ButtonContainer>
                <ButtonContainer>
                    <StyledButtonOutlined disabled={activeStep+1  == MockupSteps.length} onClick={handleNext} variant="outlined">
                        Continuar
                    </StyledButtonOutlined>
                </ButtonContainer>
            </ButtonsContainer>

        </Container >

    );
}

export default RequestService;
