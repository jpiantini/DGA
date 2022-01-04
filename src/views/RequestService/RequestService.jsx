import { useState, useLayoutEffect, useEffect } from "react";
import {
  BodyText,
  BodyTextBold,
  SmallHeightDivider,
  StyledButtonOutlined,
  StyledButton,
  MediumHeightDivider,
} from "../../theme/Styles";
import { } from "./RequestServiceConstants";
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
} from "./styles/RequestServicesStyles";
import MobileStepper from "@mui/material/MobileStepper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import TextInformation from "../../components/TextInformation/TextInformation";
import { Grid } from "@mui/material";
import formDataWithGrid from "./formDataWithGrid.json"; //DEVELOPMENT REMOVE
import formData from "./formData.json"; //DEVELOPMENT REMOVE
import formDataMitur from "./formulario_mitur.json"; //DEVELOPMENT REMOVE
import { localToArray } from "../../utilities/functions/ArrayUtil";
import Form from "./components/Form/Form";

function RequestService() {
  const matchesWidth = useMediaQuery("(min-width:768px)");
  const history = useHistory();
  let { serviceID } = useParams();
  const dispatch = useDispatch();
  const { authenticated } = useSelector((state) => state.authReducer);

  const [activeStep, setActiveStep] = useState(0);
  const [togglePaymentForm, setTogglePaymentForm] = useState();

  const transformField = (field) => {
    const fields = localToArray(field.fields).map(transformField)
    return {
      ...field,
      key: field.orden,
      fieldKey: field.name,
      data: localToArray(field.values).map((item) => {
        return {
          id: item.value,
          label: item.label,
          value: item.value,
          rule: item.rule,
          father:item.father
        };
      }),
      gridData: [],
      fields,
    }
  }

  const getData = () => {
   // return formDataWithGrid.map((step) => {
    return formDataMitur.fields.map((step) => {
      return step.map(transformField)
    });
  };
//  console.log(getData());
  useLayoutEffect(() => {
    let Service = undefined; //ListServices.find((service) => service.id == serviceID);
    if (Service) {
      //UPDATE APP HEADER SUBTITLE
      dispatch(UpdateAppSubHeaderTitle(Service.title)); // TITLE OF SUBHEADER APP
    } else {
      //UPDATE APP HEADER SUBTITLE
      dispatch(UpdateAppSubHeaderTitle("TITULO DE SERVICIO SOLICITADO")); // TITLE OF SUBHEADER APP
    }
  }, []);

  return (
    <Container>
      <SmallHeightDivider />
      <SmallHeightDivider />
      {!togglePaymentForm ? (
        <Container>
          <Form
            doRequest={console.log}
            data={getData()} />
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
    </Container>
  );
}

export default RequestService;
