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
import { getForm, linkingDocumentsToRequestInBackOffice, linkingDocumentsToRequestInSoftExperted, registerForm, uploadFormDocuments } from "../../api/RequestService";
import { getServiceDescription } from "../../api/ServiceDescription";
import { getUser } from "../../api/Auth";
import { format } from 'date-fns'
import { cleanStringFromNumbers, localToNumber } from '../../utilities/functions/NumberUtil';
import { transformFormData } from "./RequestServiceUtils";
import { cleanString } from "../../utilities/functions/StringUtil";
import { useSnackbar } from "notistack";
import { FIELD_TYPES } from "./components/Form/FormConstants";
import FormModal from "../../components/FormModal/FormModal";
import PaymentCard from "./components/PaymentCard/PaymentCard";

function RequestService() {
  const history = useHistory();
  let { serviceID } = useParams();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const [priceModalIsOpen, setPriceModalIsOpen] = useState(false);


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

  const handleModalVisibility = () => {
    setPriceModalIsOpen(!priceModalIsOpen);
  }

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
      data: _data.map(step => step.map(transformField)),//.reverse(),
      plainData: plainData.map(transformField),
      saved_fields: formData.saved_fields,
    }

    return result;
  };



  /* const mutationRegisterForm = useMutation(registerForm, {
     onMutate: (req) => {
     }
   });
 */
  const sendRequest = async (formData) => {
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
        data: transformFormData(formData, getData().data).filter((field) => field.type != FIELD_TYPES.file),
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
        emailsolic: userData.payload.email,
        logico01: 1
      }
    }
    dispatch(ShowGlobalLoading('Cargando'));
    try {

      let canSubmitForm = true;
      let uploadedFilesRoutes = [];

      const filesToUpload = transformFormData(formData, getData().data).filter((field) => field.type === FIELD_TYPES.file);
      const formFilesData = new FormData();
      if (filesToUpload.length > 0) {
        for (let i = 0; i < filesToUpload.length; i++) {
          formFilesData.append(
            "file[]",
            filesToUpload[i].value,
            filesToUpload[i].value.name
          );
        }
        dispatch(ShowGlobalLoading('Subiendo documentos'));
        let responseFilesUpload = await uploadFormDocuments(formFilesData);
        if (responseFilesUpload.success) {
          uploadedFilesRoutes = responseFilesUpload.files;
        } else {
          canSubmitForm = false;
        }
      }

      if (canSubmitForm) {
        let canFormContinue = true;
        dispatch(ShowGlobalLoading('Registrando formulario'));
        let responseFormSubmit = await registerForm(request);
        if (responseFormSubmit.success) {
          if (filesToUpload.length > 0) {
            const uploadSoftExpertConfig = {
              documents: uploadedFilesRoutes.map((file, index) => {
                return {
                  ...file,
                  label: filesToUpload[index].label
                }
              }),
              title: responseFormSubmit.title,
              record_id: responseFormSubmit.SoftExpertResponse.record_id,
              attribute: responseFormSubmit.attributes,
              process_id: serviceDescription.process_id,
              acronym: responseFormSubmit.acronym,
              names: filesToUpload.map((file) => {
                return file.label
              }),
              activity_id: "MITUR002"
            }
       /*     dispatch(ShowGlobalLoading('Registrando enlace'));
            let responseSoftExpert = await linkingDocumentsToRequestInSoftExperted(uploadSoftExpertConfig);
            if (responseSoftExpert.success) {
              let responseBackOffice = await linkingDocumentsToRequestInBackOffice(uploadSoftExpertConfig.documents, responseFormSubmit.RequestID);
              if (responseBackOffice.success) {

              } else {
                canFormContinue = false;
                enqueueSnackbar("Ha ocurrido un error favor intentar mas tarde.", { variant: 'error' })
                throw Error;
              }
            } else {
              canFormContinue = false;
              enqueueSnackbar("Ha ocurrido un error favor intentar mas tarde.", { variant: 'error' })
              throw Error;
            }*/
          }
          if (canFormContinue) {
            enqueueSnackbar("Solicitud enviada satisfactoriamente.", { variant: 'success' })
            history.push(`/app/serviceRequestedDetails/${responseFormSubmit.RequestID}payment`)
          }
        } else {
          enqueueSnackbar("Ha ocurrido un error favor intentar mas tarde.", { variant: 'error' })
        }
      }
    } catch (error) {
      enqueueSnackbar("Ha ocurrido un error,contacte al soporte para mas información", { variant: 'error' })
    }
    dispatch(HideGlobalLoading());
  }

  useLayoutEffect(() => {
    //UPDATE APP HEADER SUBTITLE
    dispatch(UpdateAppSubHeaderTitle(serviceDescription?.name));
  }, [serviceDescription]);

/*useEffect(() => {
    setPriceModalIsOpen(true);
  }, []);
*/


  if (isLoading || serviceDescriptionIsLoading || userDataIsLoading) return null;
  return (
    <Container>
      <SmallHeightDivider />
      <SmallHeightDivider />
      <Container>
        <Form
          doRequest={sendRequest}
          data={getData().data}
          plainData={getData().plainData}
        />
        <FormModal open={priceModalIsOpen} onClose={handleModalVisibility} title="Pago" maxWidth='lg'
          conditionalClose={true}>
            <SmallHeightDivider />
            <Grid alignItems="center" container direction="row" justifyContent="center" spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
              {
                serviceDescription.prices[0].variations.map((variation, index) => (
                  <Grid key={index} item xs={4} sm={4} md={6} >

                    <PaymentCard title={variation.concept} price={variation.price}
                      time="15 Dias laborables" onClick={() => console.log('click')}
                    />
                  </Grid>
                ))
              }
            </Grid>

        </FormModal>
      </Container>
    </Container>
  );
}

export default RequestService;
