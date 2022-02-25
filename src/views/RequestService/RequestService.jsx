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
import { HideGlobalLoading, ShowGlobalLoading, UpdateAppSubHeaderTitle } from "../../redux/actions/UiActions";
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
import { localToArray, transformField } from "../../utilities/functions/ArrayUtil";
import Form from "./components/Form/Form";
import { useMutation, useQuery } from "react-query";
import { getForm, registerForm } from "../../api/RequestService";
import { getServiceDescription } from "../../api/ServiceDescription";
import { getUser } from "../../api/Auth";
import { format } from 'date-fns'
import { cleanStringFromNumbers, localToNumber } from '../../utilities/functions/NumberUtil';
import { transformFormData } from "./RequestServiceUtils";
import { cleanString } from "../../utilities/functions/StringUtil";
import { useSnackbar } from "notistack";

function RequestService() {
  const history = useHistory();
  let { serviceID } = useParams();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const [togglePaymentForm, setTogglePaymentForm] = useState();

  const { data: userData, isLoading: userDataIsLoading } = useQuery(['userData'], async () => {
    try {
      dispatch(ShowGlobalLoading("Cargando"));
      const response = await getUser();
      dispatch(HideGlobalLoading());
      return response;
    } catch (error) {
      history.push('/public');
      dispatch(HideGlobalLoading());
      throw new Error('An error has ocurred');
    }
  })


  const { data: serviceDescription, isLoading: serviceDescriptionIsLoading } = useQuery(['serviceDescription', serviceID], async () => {
    try {
      dispatch(ShowGlobalLoading("Cargando"));
      const response = await getServiceDescription(serviceID);
      dispatch(HideGlobalLoading());
      return response;
    } catch (error) {
      history.push('/public');
      dispatch(HideGlobalLoading());
      throw new Error('An error has ocurred');
    }
  })

  const { data: formData, isLoading } = useQuery(['serviceForm', serviceDescription?.expertform_id], async () => {
    try {
      dispatch(ShowGlobalLoading("Cargando"));
      //TO DO CHANGE CEDULA FOR LOGGED USER CEDULA
      const response = await getForm(serviceDescription.expertform_id, "40225994520");
      dispatch(HideGlobalLoading());
      return response;
    } catch (error) {
      history.push('/public');
      dispatch(HideGlobalLoading());
      throw new Error('An error has ocurred');
    }
  }, {
    enabled: serviceDescription != undefined
  })

  const getData = () => {
    //separating response by steps
    const plainData = [];
    const data = formData.fields;
    const _data = [];
    for (let i = 0; i < data.length; i++) {
      const step = data[i]
      let _step = []
      for (let j = 0; j < step.length; j++) {
        const field = step[j]
        plainData.push(field)
        if (_step.length && field.subtype == 'h1') {
          _data.push(_step)
          _step = []
        }
        _step.push(field)
        if ((step.length - 1) == j) {
          _data.push(_step)
          _step = []
        }
      }
    }

    const result = {
      formulary_data: formData.formulary_data,
      data: _data.map(step => step.map(transformField)),
      plainData: plainData.map(transformField),
      saved_fields: formData.saved_fields,
    }

    return result;
  };



  const mutationRegisterForm = useMutation(registerForm, {
    onMutate: (req) => {
      dispatch(ShowGlobalLoading('Cargando'));
    }
  });

  const sendRequest = (formData) => {
    const request = {
      req: {
        service_id: serviceID,
        doc_identification: userData.payload.citizen_id,
        name_service: serviceDescription.name,
        process_flow: serviceDescription.process_flow,
        form_version: cleanString(getData().formulary_data?.version),
        payment_amount: localToNumber(serviceDescription.prices?.[0].variations?.[0].price),
        payment_status: "1",
        payment_method: "2",
        total: localToNumber(serviceDescription.prices?.[0].variations?.[0].price),
        variations: [
          serviceDescription.prices[0].variations[0].id
        ],
        cant: "1",
        idAutorizacionPortal: ""
      },
      form: {
        citizen_record_id: userData.payload.citizen_id,
        expertform_id: serviceDescription.expertform_id,
        data: transformFormData(formData, getData().data),
        grid: {}
      },
      documents: [],
      userInfo: {
        numdocsolicita: userData.payload.citizen_id,
        tipodocsolicita: 1,
        nombressolicita: userData.payload.name,
        apellidossolici: userData.payload.first_last_name + userData.payload.second_last_name,
        fechasolicitud: format(new Date(), 'yyyy-MM-dd'),
        direccsolic: userData.payload.address,
        nacionsolic: "Dominicano",
        celularsolic: cleanStringFromNumbers(userData.payload.phone),
        emailsolic: userData.payload.email
      }
    }

    mutationRegisterForm.mutate(request, {
      onSuccess: (data) => {
        if (data.success) {
          // refresh cache of requestedServices - FOR SOME FILTERS ERRORS I DONT USE REACT QUERY FOR requestedServices
          // queryClient.invalidateQueries('requestedServices');
           history.push(`/app/serviceRequestedDetails/${data.RequestID}payment`)

        } else {
          enqueueSnackbar("Ha ocurrido un error favor intentar mas tarde.", { variant: 'error' })
        }
      },
      onError: () => {
        enqueueSnackbar("Ha ocurrido un error,contacte al soporte para mas información", { variant: 'error' })
      },
      onSettled: () => {
        dispatch(HideGlobalLoading());
      }

    });
  }
  useLayoutEffect(() => {
    //UPDATE APP HEADER SUBTITLE
    dispatch(UpdateAppSubHeaderTitle(serviceDescription?.name));
  }, [serviceDescription]);

  if (isLoading || serviceDescriptionIsLoading || userDataIsLoading) return null;
  return (
    <Container>
      <SmallHeightDivider />
      <SmallHeightDivider />
      {!togglePaymentForm ? (
        <Container>
          <Form
            doRequest={sendRequest}
            data={getData().data}
            plainData={getData().plainData}
          />
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
