import { useState, useLayoutEffect, useEffect } from "react";
import {
  BodyText,
  BodyTextBold,
  Title,
  SubTitle,
  SmallHeightDivider,
  RowBodyDivider,
  StyledButtonOutlined,
  StyledButton,
  MediumHeightDivider,
} from "../../theme/Styles";
import { ListServices, MockupSteps } from "./RequestServiceConstants";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { UpdateAppSubHeaderTitle } from "../../redux/actions/UiActions";
import { useParams } from "react-router-dom";
import {
  ButtonsContainer,
  ButtonContainer,
  Container,
  ImageContainer,
  LogoImage,
  PaymentMethodsContainer,
} from "./styles/RequestServicesStyles";
import MobileStepper from "@mui/material/MobileStepper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import TextInformation from "../../components/TextInformation/TextInformation";
import { Grid } from "@mui/material";
import Select from "../../components/Select/Select";
import TextField from "../../components/TextField/TextField";
import DatePicker from "../../components/DatePicker/DatePicker";
import CheckBoxGroup from "../../components/CheckBoxGroup/CheckBoxGroup";
import RadioButtonGroup from "../../components/RadioButtonGroup/RadioButtonGroup";
import UploadFile from "../../components/UploadFile/UploadFile";

function RequestService() {
  const matchesWidth = useMediaQuery("(min-width:768px)");
  const history = useHistory();
  let { serviceID } = useParams();
  const dispatch = useDispatch();
  const { authenticated } = useSelector((state) => state.authReducer);

  const stepsLenght = MockupSteps.length;
  const [activeStep, setActiveStep] = useState(0);
  const [togglePaymentForm, setTogglePaymentForm] = useState();

  const [testDate, setTestDate] = useState();
  const [testAdataOptions, setTestAdataOptions] = useState([
    {
      id: "checkboxValue1",
      value: true,
      label: "Value 1",
    },
    {
      id: "checkboxValue2",
      value: false,
      label: "Value 2",
    },
    {
      id: "checkboxValue3",
      value: false,
      label: "Value 3",
    },
  ]);
  let testAdata = [
    {
      value: 1,
      label: "Selection 1",
    },
    {
      value: 2,
      label: "Selection 2",
    },
    {
      value: 3,
      label: "Selection 3",
    },
  ];
  const [testRadio, setTestRadio] = useState(1);
  let testRadiodataOptions = [
    {
      value: 1,
      label: "Yes",
    },
    {
      value: 0,
      label: "No",
    },
  ];

  const handleNext = () => {
    //NEED CHANGE MockupSteps to FormSteps
    setActiveStep((prevActiveStep) =>
      prevActiveStep + 1 == stepsLenght ? prevActiveStep : prevActiveStep + 1
    );
    if (stepsLenght - 2 == activeStep) {
      setTogglePaymentForm(true);
    } else {
      setTogglePaymentForm(false);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) =>
      prevActiveStep == 0 ? 1 : prevActiveStep - 1
    );
    if (stepsLenght - 1 == activeStep) {
      setTogglePaymentForm(true);
    } else {
      setTogglePaymentForm(false);
    }
  };

  useLayoutEffect(() => {
    let Service = ListServices.find((service) => service.id == serviceID);
    if (Service) {
      //UPDATE APP HEADER SUBTITLE
      dispatch(UpdateAppSubHeaderTitle(Service.title)); // TITLE OF SUBHEADER APP
    } else {
      //IF ENTERED SERVICE AS PARAM DOES`NT EXISTS REDIRECT TO FIRST SERVICE
      history.push("/app/requestService/1");
      let Service = ListServices.find((service) => service.id == serviceID);
      dispatch(UpdateAppSubHeaderTitle(Service.title));
    }
  }, []);

  useEffect(() => {
    //  console.log(MOCKUP_JSON_DYNAMIC_FORM[0])
  }, []);

  return (
    <Container>
      {matchesWidth && (
        <Stepper activeStep={activeStep} alternativeLabel>
          {MockupSteps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      )}
      <SmallHeightDivider />
      <SmallHeightDivider />
      {!togglePaymentForm ? (
        <Container>
          <Title>FORMULARIO DINAMICO PASO {activeStep + 1}</Title>
          <SubTitle>FORMULARIO DINAMICO PASO {activeStep + 1}</SubTitle>
          <Select title="Select" required data={testAdata} />

          <TextField title="TextField Text" type="text" required />
          <TextField title="TextField Number" type="number" required />
          <TextField
            title="TextField Masked"
            type="text"
            mask="999-999-9999"
            unMaskedValue={true}
            onChange={(e) => console.log(e)}
            required
          />
          <TextField
            multiline
            title="TextField Text Multiline"
            type="text"
            required
          />

          <DatePicker
            title="Date Picker"
            required
            value={testDate}
            onChange={(e) => setTestDate(e)}
          />

          <CheckBoxGroup
            title="CheckBox Group"
            options={testAdataOptions}
            onChange={(e) => setTestAdataOptions(e.target.value)}
          />

          <RadioButtonGroup
            title="RadioButton Group"
            options={testRadiodataOptions}
            value={testRadio}
            onChange={(e) => setTestRadio(e.target.value)}
          />

          <UploadFile title="Upload File" id={"Acta de nacimiento"} />

          <div style={{ height: "50px" }} />
        </Container>
      ) : (
        <Container>
          <TextInformation title="Información general" />
          <Grid
            alignItems="center"
            justifyContent="flex-start"
            container
            direction="row"
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 8, sm: 8, md: 8 }}
          >
            <Grid item xs={4} sm={4} md={4}>
              <BodyTextBold>Fecha:</BodyTextBold>
              <BodyText>12 septiembre de 2021</BodyText>
            </Grid>

            <Grid item xs={4} sm={4} md={4}>
              <BodyTextBold>Empresa:</BodyTextBold>
              <BodyText>Construcciones K</BodyText>
            </Grid>

            <Grid item xs={4} sm={4} md={4}>
              <BodyTextBold>Numero de solicitud:</BodyTextBold>
              <BodyText>002366574553</BodyText>
            </Grid>

            <Grid item xs={4} sm={4} md={4}>
              <BodyTextBold>Servicio:</BodyTextBold>
              <BodyText>Solicitud de No Objeción de suelo</BodyText>
            </Grid>

            <Grid item xs={4} sm={4} md={4}>
              <BodyTextBold>Costo:</BodyTextBold>
              <BodyText>RD$2,000.00</BodyText>
            </Grid>
          </Grid>

          <SmallHeightDivider />
          <TextInformation title="Formas de pago" />
          <SmallHeightDivider />
          <SmallHeightDivider />

          <Grid
            alignItems="center"
            justifyContent="center"
            container
            direction="row"
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 6, sm: 8, md: 12 }}
          >
            <Grid item xs={4} sm={4} md={4}>
              <ImageContainer onClick={() => alert("click")}>
                <LogoImage src="https://www.sirite.gob.do/o/sirit-theme-1.20190411.66/images/sirit/sirit-logo.png" />
              </ImageContainer>
            </Grid>

            <Grid item xs={4} sm={4} md={4}>
              <ImageContainer onClick={() => alert("click")}>
                <LogoImage src="https://www.cardnet.com.do/capp/images/logo_nuevo_x_2.png" />
              </ImageContainer>
            </Grid>
          </Grid>
          <MediumHeightDivider />
          <ButtonContainer>
            <StyledButton onClick={() => history.push("/app/myDesk")}>
              Pagar despues
            </StyledButton>
          </ButtonContainer>
          <MediumHeightDivider />
        </Container>
      )}

      <ButtonsContainer>
        <ButtonContainer>
          <StyledButtonOutlined
            disabled={activeStep == 0 || togglePaymentForm}
            onClick={handleBack}
            variant="outlined"
          >
            Retroceder
          </StyledButtonOutlined>
        </ButtonContainer>

        {
          //STEPPER WHEN DEVICE IS MOBILE
          !matchesWidth && (
            <MobileStepper
              variant="dots"
              steps={stepsLenght}
              position="static"
              activeStep={activeStep}
            />
          )
        }

        <ButtonContainer>
          {MockupSteps.length - 2 == activeStep ? (
            <StyledButton onClick={handleNext}>Enviar Solicitud</StyledButton>
          ) : (
            <StyledButtonOutlined
              disabled={activeStep + 1 == MockupSteps.length}
              onClick={handleNext}
              variant="outlined"
            >
              Continuar
            </StyledButtonOutlined>
          )}
        </ButtonContainer>
      </ButtonsContainer>
    </Container>
  );
}

export default RequestService;
