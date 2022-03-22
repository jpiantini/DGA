import { useState, useLayoutEffect, useEffect, useRef } from "react";
import {
  BodyText,
  BodyTextBold,
  SmallHeightDivider,
  StyledButtonOutlined,
  StyledButton,
  MediumHeightDivider,
  StyledCheckCircleIcon,
  SubTitle,
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
  SuccessContainer,
} from "./styles/RequestServicesStyles";
import MobileStepper from "@mui/material/MobileStepper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import TextInformation from "../../components/TextInformation/TextInformation";
import { Grid, Rating } from "@mui/material";
import { localToArray, transformField } from "../../utilities/functions/ArrayUtil";
import Form from "./components/Form/Form";
import { useMutation, useQuery } from "react-query";
import { addRating, getForm, linkingDocumentsToRequestInBackOffice, linkingDocumentsToRequestInSoftExperted, registerForm, uploadFormDocuments } from "../../api/RequestService";
import { getServiceDescription } from "../../api/ServiceDescription";
import { getUser } from "../../api/Auth";
import { format } from 'date-fns'
import { cleanStringFromNumbers, localToNumber } from '../../utilities/functions/NumberUtil';
import { transformFileData, transformFormData, transformFormGrid } from "./RequestServiceUtils";
import { cleanString } from "../../utilities/functions/StringUtil";
import { useSnackbar } from "notistack";
import { FIELD_TYPES } from "./components/Form/FormConstants";
import FormModal from "../../components/FormModal/FormModal";
import PaymentCard from "./components/PaymentCard/PaymentCard";
import axios from 'axios';

function RequestService() {
  const history = useHistory();
  let { serviceID } = useParams();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const successRef = useRef(null)

  const [priceModalIsOpen, setPriceModalIsOpen] = useState(true);
  const [selectedVariation, setSelectedVariation] = useState();

  const [showRequestDetail, setShowRequestDetail] = useState(false);

  const [successResponse, setSuccessResponse] = useState();
  const [ratingValue, setRatingValue] = useState('0,00');


  const handleSelectVariation = (val) => {
    handleModalVisibility();
    setSelectedVariation(val)
  }


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
      const response = await getForm(serviceDescription.expertform_id, userData.payload.citizen_id);
      dispatch(HideGlobalLoading());
      return response;
    } catch (error) {
      history.push('/public');
      dispatch(HideGlobalLoading());
      throw new Error('An error has ocurred');
    }
  }, {
    enabled: serviceDescription != undefined && userData != undefined
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
      //dev
      //data: _data.map(step => step.map(transformField)).reverse(),
      data: _data.map(step => step.map(transformField)),
      plainData: plainData.map(transformField),
      saved_fields: formData.saved_fields,
    }

    return result;
  };

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
        data: transformFormData(formData, getData().plainData).filter((field) => field.type != FIELD_TYPES.file && field.type != FIELD_TYPES.grid),
        grid: transformFormGrid(formData, getData().plainData)
      },
      documents: [],
      userInfo: {
        numdocsolicita: userData.payload.citizen_id,
        tipodocsolicita: 1,
        nombressolicita: userData.payload.name,
        apellidossolici: `${userData.payload.first_last_name} ${userData.payload.second_last_name}`,
        fechasolicitud: format(new Date(), 'yyyy-MM-dd'),
        direccsolic: userData.payload.address,
        nacionsolic: "Dominicano",
        celularsolic: cleanStringFromNumbers(userData.payload.phone),
        emailsolic: userData.payload.email,
        solicitudonline: 1,
      }
    }

    dispatch(ShowGlobalLoading('Cargando'));
    try {

      const FilesOfForm = transformFileData(formData, getData().plainData);

      let canSubmitForm = true;
      let uploadedFilesRoutes = FilesOfForm.oldFile;

      const formDataOfFiles = new FormData();
      if (FilesOfForm?.newFile.length > 0) {
        for (let i = 0; i < FilesOfForm.newFile.length; i++) {
          formDataOfFiles.append(
            "file[]",
            FilesOfForm.newFile[i].file,
            FilesOfForm.newFile[i].file.name
          );
        }
        dispatch(ShowGlobalLoading('Subiendo documentos'));
        let responseFilesUploaded = await uploadFormDocuments(formDataOfFiles);
        if (responseFilesUploaded.success) {
          uploadedFilesRoutes = [
            ...uploadedFilesRoutes,
            ...responseFilesUploaded.files.map((item, index) => {
              return {
                ...item,
                label: FilesOfForm.newFile[index].label
              }
            }
            )
          ]
        } else {
          canSubmitForm = false;
        }
      }
      console.log(uploadedFilesRoutes);
      debugger
      if (canSubmitForm) {
        let canFormContinue = true;
        dispatch(ShowGlobalLoading('Registrando solicitud'));
        let responseFormSubmit = await registerForm(request);
        if (responseFormSubmit.success) {
          if (uploadedFilesRoutes.length > 0) {
            let uploadSoftExpertArray = []
            for (let i = 0; i < uploadedFilesRoutes.length; i++) {
              const uploadSoftExpertConfig = {
                documents:
                  [
                    {
                      ...uploadedFilesRoutes[i],
                    }
                  ],
                title: responseFormSubmit.title,
                record_id: responseFormSubmit.SoftExpertResponse.record_id,
                attribute: responseFormSubmit.attributes,
                process_id: serviceDescription.process_id,
                acronym: "DPPDE",//responseFormSubmit.acronym,
                names: [uploadedFilesRoutes[i].label],
                activity_id: false
              }
              uploadSoftExpertArray.push(linkingDocumentsToRequestInSoftExperted(uploadSoftExpertConfig));
            }
            dispatch(ShowGlobalLoading('Procesando solicitud'));
            await axios.all(uploadSoftExpertArray);

            let requestBackOffice = {
              documents: uploadedFilesRoutes
            };
            let responseBackOffice = await linkingDocumentsToRequestInBackOffice(requestBackOffice, responseFormSubmit.RequestID);
            if (responseBackOffice.success) {

            } else {
              canFormContinue = false;
              enqueueSnackbar("Ha ocurrido un error favor intentar mas tarde.", { variant: 'error' })
              throw Error;
            }

          }

          if (canFormContinue) {
            enqueueSnackbar("Solicitud enviada satisfactoriamente.", { variant: 'success' })
            //     history.push(`/app/serviceRequestedDetails/${responseFormSubmit.RequestID}payment`)
            setSuccessResponse(responseFormSubmit);
            setShowRequestDetail(true);
            successRef.current.scrollIntoView()
          }
        } else {
          enqueueSnackbar("Ha ocurrido un error favor intentar mas tarde.", { variant: 'error' })
        }
      } else {
        enqueueSnackbar("Ha ocurrido un error subiendo los documentos.", { variant: 'error' });
        throw Error;
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

  if (isLoading || serviceDescriptionIsLoading || userDataIsLoading) return null;
  return (
    <Container>
      <SmallHeightDivider />
      <SmallHeightDivider />
      {
        !showRequestDetail ?
          <Container>
            <Form
              doRequest={sendRequest}
              data={getData().data}
              plainData={getData().plainData}
              multipleDocuments={serviceDescription?.multiple_document === "true" ? true : false}
            />
            <FormModal open={priceModalIsOpen} onClose={handleModalVisibility} maxWidth='xl'
              conditionalClose={true}>
              <SmallHeightDivider />
              <Grid alignItems="center" container direction="row" justifyContent="center" spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {
                  serviceDescription.prices.map((price, index) => (
                    price.variations.length > 1 ?
                      <Grid key={index} item xs={4} sm={8} md={6} >
                        <PaymentCard title={price.concept} variations={price.variations}
                          onClick={handleSelectVariation}
                        />
                      </Grid>
                      :
                      <Grid key={index} item xs={4} sm={8} md={6} >
                        <PaymentCard title={price.variations[0].concept} variations={price.variations}
                          onClick={handleSelectVariation}
                        />
                      </Grid>
                  ))
                }
              </Grid>
              <SmallHeightDivider />
            </FormModal>
          </Container>
          :
          <Container ref={successRef}>
            <SuccessContainer>
              <StyledCheckCircleIcon />
              <SmallHeightDivider />
              <SubTitle >
                Solicitud enviada satisfactoriamente.
              </SubTitle>
              {     /*         <SmallHeightDivider />
              <strong>
                <BodyText>
                  ¿Que le parecio el proceso de solicitud este servicio?
                </BodyText>
              </strong>
              <Rating
                name="simple-controlled"
                value={ratingValue}
                precision={0.5}
                onChange={(event, newValue) => {
                  handleSendRating(newValue);
                }}
                size="large"
              />
              */
              }
              <MediumHeightDivider />
            </SuccessContainer>
            <ButtonsContainer>
              <div style={{ width: '30%' }}>
                <StyledButtonOutlined onClick={() => history.push('/app/myDesk')} variant="outlined">
                  Ir a inicio mi escritorio
                </StyledButtonOutlined>

              </div>
              <div style={{ width: '30%' }}>
                <StyledButton onClick={() => history.push(`/app/serviceRequestedDetails/${successResponse.RequestID}`)}>
                  Ver detalle de la solicitud
                </StyledButton>
              </div>
            </ButtonsContainer>
          </Container>
      }
    </Container>
  );
}

export default RequestService;
