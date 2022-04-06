import { useState, useLayoutEffect, Fragment } from 'react';
import {
    Row,
    StyledButtonOutlined,
    ButtonsMenuContainer,
    MediumHeightDivider,
    SmallHeightDivider,
    BodyText
} from '../../theme/Styles';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from "react-redux";
import { HideGlobalLoading, ShowGlobalLoading, UpdateAppSubHeaderTitle } from '../../redux/actions/UiActions';
import { useParams } from "react-router-dom";
import { Container, SolutionContainer } from './styles/ServiceRequestedDetailsStyles';
import ButtonGroup from '@mui/material/ButtonGroup';
import ComplaintsAndClaims from './subViews/complaintsAndClaims/ComplaintsAndClaims';
import Payment from './subViews/payments/Payments';
import Details from './subViews/details/Details';
import DeskNotification from '../../components/DeskNotification/DeskNotification';
import ActionsRequired from './subViews/actionsRequired/ActionsRequired';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getRequestDetail, sendQualificationAndRating } from '../../api/ServiceRequestedDetails';
import { cacheConfig } from '../../cacheConfig';
import { FormRatingSchema, MenuOptions, statusColors } from './ServiceRequestedDetailsConstants';
import Messages from './subViews/messages/Messages';
import CenterLoading from '../../components/CenterLoading/CenterLoading';
import FormModal from '../../components/FormModal/FormModal';
import { Rating } from '@mui/material';
import TextField from '../../components/TextField/TextField';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';

function ServiceRequestedDetails() {
    const history = useHistory();
    let { requestID } = useParams();
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient();

    const [activeMenu, setActiveMenu] = useState(0);
    const [ratingModalIsOpen, setRatingModalIsOpen] = useState(false);
    const [rating, setRating] = useState(3);

    const formik = useFormik({
        initialValues: {
            comment: ''
        },
        validationSchema: FormRatingSchema,
        onSubmit: (values) => {
            handleSendRating(values);
        },
    });

    const userData = queryClient.getQueryData(['userData']);

    const { data: serviceRequestedDetail, isLoading } = useQuery(['serviceRequestedDetail', requestID], async () => {
        try {
            dispatch(ShowGlobalLoading("Cargando"));
            const response = await getRequestDetail(requestID, userData.payload.citizen_id);
            dispatch(HideGlobalLoading());
            return response;
        } catch (error) {
            history.push('/public');
            dispatch(HideGlobalLoading());
        }
    }, {
        staleTime: cacheConfig.staleTimeForRequestedServiceDetail
    })
    const mutation = useMutation(sendQualificationAndRating);

    const handleChangeMenu = (menuID) => {
        setActiveMenu(menuID);
    }

    const handleRatingModalVisibility = () => {
        setRatingModalIsOpen(!ratingModalIsOpen);
    }

    const handleSendRating = (formData) => {
        dispatch(ShowGlobalLoading("Cargando"))
        mutation.mutate({
            request_id: requestID,
            rating: rating,
            comment: formData.comment
        }, {
            onSettled: () => {
                dispatch(HideGlobalLoading())
            },
            onSuccess: () => {
                enqueueSnackbar("Calificación enviada con exito", { variant: 'success' })
                queryClient.invalidateQueries(['serviceRequestedDetail', requestID])
                handleRatingModalVisibility();
            },
            onError: () => {
                enqueueSnackbar("Ha ocurrido un error", { variant: 'error' })
            }
        })
    }


    useLayoutEffect(() => {
        //UPDATE APP HEADER SUBTITLE, SET THE SERVICE NAME AND TOGGLE TO SPECIFIC MENU
        if (serviceRequestedDetail != undefined) {
            dispatch(UpdateAppSubHeaderTitle(serviceRequestedDetail.request.service.name));
            if (serviceRequestedDetail.request.request_actions_id == 1) {
                setActiveMenu(MenuOptions.actionRequired);
            }
            if (serviceRequestedDetail.request.request_actions_id == 3) {
                setActiveMenu(MenuOptions.messages);
            }
            //Action required Payment
            if (serviceRequestedDetail.request.request_actions_id == 5) {
                setActiveMenu(MenuOptions.payment);
            }
            if (serviceRequestedDetail.request.request_actions_id == 7) {
                setActiveMenu(MenuOptions.payment);
            }
            //Without required action
            if (serviceRequestedDetail.request.request_actions_id == null) {
                setActiveMenu(MenuOptions.details);
            }
        }

    }, [serviceRequestedDetail]);

    if (isLoading) return <CenterLoading />;
    return (
        <Container >
            <Row>
                <Container style={{ width: '100%' }}>
                    <ButtonsMenuContainer>
                        <ButtonGroup size="large" >
                            <StyledButtonOutlined active={activeMenu == MenuOptions.details} onClick={() => handleChangeMenu(MenuOptions.details)}>
                                Detalles
                            </StyledButtonOutlined>
                            <StyledButtonOutlined active={activeMenu == MenuOptions.claims} onClick={() => handleChangeMenu(MenuOptions.claims)}>
                                Quejas y Reclamaciones
                            </StyledButtonOutlined>
                            {
                                serviceRequestedDetail.request.service.external_pay == 1 ||
                                    serviceRequestedDetail.request.service.sirit_code != null ?
                                    <StyledButtonOutlined active={activeMenu == MenuOptions.payment} onClick={() => handleChangeMenu(MenuOptions.payment)}>
                                        Pagos
                                    </StyledButtonOutlined>
                                    :
                                    null
                            }
                            {
                                serviceRequestedDetail.request.comments.length > 0 || serviceRequestedDetail.request.request_actions_id == 3 &&
                                <StyledButtonOutlined active={activeMenu == MenuOptions.messages} onClick={() => handleChangeMenu(MenuOptions.messages)}>
                                    Mensajes
                                </StyledButtonOutlined>
                            }
                            {   //IF ACTION REQUIRED IS FOR DOCUMENT OR TEXT
                                serviceRequestedDetail.request.request_actions_id == 1 || serviceRequestedDetail.request.request_actions_id == 1 ?
                                    <StyledButtonOutlined active={activeMenu == MenuOptions.actionRequired} onClick={() => handleChangeMenu(MenuOptions.actionRequired)}>
                                        Accion Requerida
                                    </StyledButtonOutlined>
                                    :
                                    null
                            }
                        </ButtonGroup>
                    </ButtonsMenuContainer>
                    {
                        //ONLY MOUNT IF REQUESTID HAS AN ACTION REQUIRED
                        serviceRequestedDetail.request.request_actions ?
                            <Fragment>
                                <SmallHeightDivider />
                                {
                                    serviceRequestedDetail.request.messages.map((message, index) => (
                                        <Fragment>
                                            <DeskNotification variant={'warning'} disableCloseButton={true}
                                                message={message.message}
                                            />
                                            <SmallHeightDivider />
                                        </Fragment>
                                    ))
                                }
                                <SmallHeightDivider />
                            </Fragment>
                            :
                            <MediumHeightDivider />
                    }
                    {
                        serviceRequestedDetail.request.solution &&
                        <Fragment>
                            <Row style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                                <SolutionContainer fullwidth={serviceRequestedDetail.request.rating?.length > 0}>
                                    <DeskNotification disableAnimation variant={serviceRequestedDetail.request.status.color} disableCloseButton={true}
                                        message={serviceRequestedDetail.request.solution}
                                    />
                                </SolutionContainer>
                                {
                                    serviceRequestedDetail.request.rating?.length <= 0 &&
                                    <div style={{ width: '22%' }}>
                                        <StyledButtonOutlined onClick={handleRatingModalVisibility} variant='outlined'>CALIFICAR</StyledButtonOutlined>
                                        <FormModal title="Calificación de servicio" open={ratingModalIsOpen} fullWidth onClose={handleRatingModalVisibility}>
                                            <SmallHeightDivider />
                                            <SmallHeightDivider />
                                            <strong>
                                                <BodyText style={{ marginLeft: '5px' }}>
                                                    Calificación
                                                </BodyText>
                                            </strong>
                                            <Rating
                                                onChange={(e, newValue) => setRating(newValue)}
                                                value={rating}
                                                precision={0.5}
                                                size="large"
                                            />

                                            <TextField placeholder="Comentario" id="comment"
                                                value={formik.values.comment}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.touched.comment && Boolean(formik.errors.comment)}
                                                helperText={formik.touched.comment && formik.errors.comment}
                                                multiline
                                                minRows={6}
                                            />
                                            <SmallHeightDivider />
                                            <SmallHeightDivider />
                                            <div style={{ width: '40%' }}>
                                                <StyledButtonOutlined onClick={formik.handleSubmit} variant='outlined'>Enviar Calificación</StyledButtonOutlined>
                                            </div>
                                            <SmallHeightDivider />
                                            <SmallHeightDivider />
                                        </FormModal>
                                    </div>
                                }
                            </Row>
                            <SmallHeightDivider />
                        </Fragment>
                    }
                    {
                        activeMenu == MenuOptions.details ?

                            <Details />
                            :
                            activeMenu == MenuOptions.claims ?
                                <ComplaintsAndClaims />
                                :
                                activeMenu == MenuOptions.payment ?
                                    <Payment />
                                    :
                                    activeMenu == MenuOptions.messages ?
                                        <Messages />
                                        :
                                        //IF ACTION REQUIRED IS TRUE
                                        serviceRequestedDetail.request.request_actions && <ActionsRequired />
                    }
                </Container>
            </Row>
        </Container>
    );
}

export default ServiceRequestedDetails;
