import { useState, useLayoutEffect, useEffect, useRef, Fragment } from "react";
import {
  BodyText,
  BodyTextBold,
  SmallHeightDivider,
  StyledButtonOutlined,
  StyledButton,
  MediumHeightDivider,
  StyledCheckCircleIcon,
  SubTitle,
  Title,
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
  PricesContainer,
  PricesItemContainer,
} from "./styles/RequestServicesStyles";
import MobileStepper from "@mui/material/MobileStepper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import TextInformation from "../../components/TextInformation/TextInformation";
import { Dialog, Grid, Rating } from "@mui/material";
import { arrayArrayToArray, localToArray, transformField } from "../../utilities/functions/ArrayUtil";
import Form from "./components/Form/Form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { addRating, getForm, linkingDocumentsToRequestInBackOffice, linkingDocumentsToRequestInSoftExperted, registerForm, uploadFormDocuments } from "../../api/RequestService";
import { getServiceDescription } from "../../api/ServiceDescription";
import { getUser } from "../../api/Auth";
import { format } from 'date-fns'
import { cleanStringFromNumbers, localToNumber } from '../../utilities/functions/NumberUtil';
import { reverseTransformFormData, reverseTransformFormGrid, transformFileData, transformFormData, transformFormGrid } from "./RequestServiceUtils";
import { cleanString } from "../../utilities/functions/StringUtil";
import { useSnackbar } from "notistack";
import { FIELD_TYPES } from "./components/Form/FormConstants";
import FormModal from "../../components/FormModal/FormModal";
import PaymentCard from "./components/PaymentCard/PaymentCard";
import axios from 'axios';
import CenterLoading from "../../components/CenterLoading/CenterLoading";
import { getDraftsList, saveDraft } from "../../api/Drafts";
import { isEmpty } from "../../utilities/functions/ValidationUtil";
import ImportantInformationModal from "../../components/ImportantInformationModal/ImportantInformationModal";

function RequestService() {
  const history = useHistory();
  let { serviceID } = useParams();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient()

  const successRef = useRef(null)
  const formRef = useRef(null);
  const [showRestoreFormModal, setShowRestoreFormModal] = useState(false);
  const [isDraft, setIsDraft] = useState(false);
  const [draftLoading, setDraftLoading] = useState(false);

  const [priceModalIsOpen, setPriceModalIsOpen] = useState(true);
  const [selectedVariation, setSelectedVariation] = useState();
  const [showRequestDetail, setShowRequestDetail] = useState(false);
  const [successResponse, setSuccessResponse] = useState();
  const [state, setState] = useState({
    rules: [],
    data: {},
    grid: {},
    fakeStep: 0,
    step: 0,
    totalPayment: 0,
    variations: [],
  })

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
      const response = await getServiceDescription(serviceID, userData.payload.citizen_id);
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

  const handleSelectVariation = (val) => {
    handleModalVisibility();
    console.log(val)
    setSelectedVariation(val)
  }

  const handleModalVisibility = () => {
    setPriceModalIsOpen(!priceModalIsOpen);
  }

  const handleRestoreFormModal = () => {
    setShowRestoreFormModal(!showRestoreFormModal);
  }

  const handleRestoreForm = () => {
    setShowRestoreFormModal(false);
    setPriceModalIsOpen(false);
    setIsDraft(true)
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
      data: _data.map(step => step.map(transformField)),
      plainData: plainData.map(transformField),
      saved_fields: formData.saved_fields,
      date: Number(new Date()),
      //dev
      // data: _data.map(step => step.map(transformField)).reverse(),
    }

    return result;
  };

  /* const getPayment = () => {
     let totalPayment = 0
     const variations= []
     for (const key in props.servicePrice) {
       variations.push(localToString(key))
       totalPayment += localToNumber(props.servicePrice[key])
     }
     return {
       totalPayment: totalPayment,
       variations: variations,
     }
   }
 */

  const handleFormSave = async () => {
    const formData = formRef.current?.saveForm()
    const reversedAppliedRuleList = localToArray(formData?.appliedRuleList).reverse()
    const noDuplicates = new Set(reversedAppliedRuleList)
    const _plainData = arrayArrayToArray(formData?.localData)

    const request = {
      citizen_id: userData.payload.citizen_id,
      service_id: serviceDescription.id,
      expertform_id: serviceDescription.expertform_id,
      data: transformFormData(formData?.values, _plainData, formData?.errors).filter((field) => field.type !== FIELD_TYPES.file),
      grid: transformFormGrid(formData?.values, _plainData),
      appliedRuleList: Array.from(noDuplicates).reverse(),
      fakeStep: formData?.fakeStep,
      step: formData?.step,
    }
    if (isEmpty(request.data)) {
      return
    }
    try {
      await saveDraft(request)
    } catch (error) {

    }
  }


  const sendRequest = async (valuesOfForm) => {
    const formData = formRef.current?.saveForm()
    const _plainData = arrayArrayToArray(formData?.localData)
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
        data: transformFormData(valuesOfForm, _plainData).filter((field) => field.type != FIELD_TYPES.file && field.type != FIELD_TYPES.grid),
        grid: transformFormGrid(valuesOfForm, _plainData)
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

      const FilesOfForm = transformFileData(valuesOfForm, _plainData);

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
                acronym: responseFormSubmit.acronym,
                names: [uploadedFilesRoutes[i].label],
                activity_id: serviceDescription.activity_id,
                new_request: true
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
            queryClient.invalidateQueries('serviceForm')
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

  //componentDidUpdate
  useEffect(() => {
    if (formData === undefined) {
      return
    }
    if (localToArray(getData()?.saved_fields?.data).length > 0 && isDraft !== true) {
      setShowRestoreFormModal(true);
      return;
    }
    if (!localToArray(getData()?.plainData).length || !getData()?.saved_fields || !localToArray(getData()?.saved_fields?.data).length || isDraft === false) {
      return
    }

    const { appliedRuleList, data, grid, fakeStep, step, totalPayment, variations } = getData()?.saved_fields
    dispatch(ShowGlobalLoading("Restableciendo"))
    setDraftLoading(true);
    setState({
      rules: localToArray(appliedRuleList),
      fakeStep: localToNumber(fakeStep),
      data: reverseTransformFormData(data, getData()?.plainData),
      grid: reverseTransformFormGrid(grid, getData()?.plainData),
      step: localToNumber(step),
      totalPayment: totalPayment,
      variations: variations,
    })
    setTimeout(() => {
      //Simulate loading for 2.5s 
      //Bug with react 17 for update somes components value is needed unmount and mount the Form component
      setDraftLoading(false);
      dispatch(HideGlobalLoading())
    }, 2500);

    return () => { }
  }, [formData, isDraft])

  useLayoutEffect(() => {
    //UPDATE APP HEADER SUBTITLE
    dispatch(UpdateAppSubHeaderTitle(serviceDescription?.name));
  }, [serviceDescription]);

  if (isLoading || serviceDescriptionIsLoading || userDataIsLoading) return <CenterLoading />;
  return (
    <Container>
      <SmallHeightDivider />
      <SmallHeightDivider />
      {
        !showRequestDetail ?
          <Container>
            {
              draftLoading ?
                null
                :
                <Form
                  ref={formRef}
                  doRequest={sendRequest}
                  data={getData().data}
                  plainData={getData().plainData}
                  setPriceModalIsOpen={setPriceModalIsOpen}
                  handleFormSave={handleFormSave}
                  multipleDocuments={serviceDescription?.multiple_document === "true" ? true : false}
                  initialForm={state}
                />
            }
            <ImportantInformationModal open={showRestoreFormModal} onBackDropClick={() => { }}
              onCloseClick={handleRestoreFormModal} CloseTitle="Cancelar" CloseButton
              buttonTitle="Confirmar" buttonClick={handleRestoreForm} content={
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
                </Fragment>
              } />
            <Dialog open={priceModalIsOpen} onClose={handleModalVisibility} maxWidth='xl' fullScreen>
              <PricesContainer>
                <Title>Tarifas del servicio</Title>
                <SmallHeightDivider />
                <SmallHeightDivider />
                <Grid alignItems='end' alignSelf='center' justifyContent='space-around' container direction='row' spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                  {
                    serviceDescription.prices.map((price, index) => (
                      price.variations.length > 1 ?
                        <Grid key={index} item xs={4} sm={8} md={4} >
                          <PricesItemContainer>
                            <PaymentCard title={price.concept} variations={price.variations}
                              onClick={handleSelectVariation}
                            />
                          </PricesItemContainer>

                        </Grid>
                        :
                        <Grid key={index} item xs={4} sm={8} md={4} >
                          <PricesItemContainer>
                            <PaymentCard title={price.variations[0].concept} variations={price.variations}
                              onClick={handleSelectVariation}
                            />
                          </PricesItemContainer>
                        </Grid>
                    ))
                  }
                </Grid>
              </PricesContainer>
            </Dialog>
          </Container>
          :
          <Container ref={successRef}>
            <SuccessContainer>
              <StyledCheckCircleIcon />
              <SmallHeightDivider />
              <SubTitle >
                Solicitud enviada satisfactoriamente.
              </SubTitle>
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
