import { useState, useLayoutEffect, Fragment } from 'react';
import {
    Row,
    StyledButtonOutlined,
    ButtonsMenuContainer,
    MediumHeightDivider,
    SmallHeightDivider
} from '../../theme/Styles';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from "react-redux";
import { HideGlobalLoading, ShowGlobalLoading, UpdateAppSubHeaderTitle } from '../../redux/actions/UiActions';
import { useParams } from "react-router-dom";
import { Container } from './styles/ServiceRequestedDetailsStyles';
import ButtonGroup from '@mui/material/ButtonGroup';
import ComplaintsAndClaims from './subViews/complaintsAndClaims/ComplaintsAndClaims';
import Payment from './subViews/payments/Payments';
import Details from './subViews/details/Details';
import DeskNotification from '../../components/DeskNotification/DeskNotification';
import ActionsRequired from './subViews/actionsRequired/ActionsRequired';
import { useQuery, useQueryClient } from 'react-query';
import { getRequestDetail } from '../../api/ServiceRequestedDetails';
import { cacheConfig } from '../../cacheConfig';
import { MenuOptions } from './ServiceRequestedDetailsConstants';
import Messages from './subViews/messages/Messages';


function ServiceRequestedDetails() {
    const history = useHistory();
    let { requestID } = useParams();
    const dispatch = useDispatch();

    const cleanRequestID = requestID.replace('payment', '');

    const queryClient = useQueryClient();

    const userData = queryClient.getQueryData(['userData']);

    const { data: serviceRequestedDetail, isLoading } = useQuery(['serviceRequestedDetail', cleanRequestID], async () => {
        try {
            dispatch(ShowGlobalLoading("Cargando"));
            const response = await getRequestDetail(cleanRequestID, userData.payload.citizen_id);
            dispatch(HideGlobalLoading());
            return response;
        } catch (error) {
            history.push('/public');
            dispatch(HideGlobalLoading());
        }
    }, {
        staleTime: cacheConfig.staleTimeForRequestedServiceDetail
    })

    const [activeMenu, setActiveMenu] = useState(0);

    const handleChangeMenu = (menuID) => {
        setActiveMenu(menuID);
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
            //from serviceRequest
            if (requestID.includes('payment')) {
                if (serviceRequestedDetail.request.service.external_pay == 1 || serviceRequestedDetail.request.service.sirit_code != null) {
                    setActiveMenu(MenuOptions.payment);
                }
            }
        }

    }, [serviceRequestedDetail]);

    if (isLoading) return null;
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
                                serviceRequestedDetail.request.comments.length > 0 &&
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
