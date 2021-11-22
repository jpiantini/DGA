import { useState, useLayoutEffect, useEffect, Fragment } from 'react';
import ServiceDirectoryMenu from '../../components/ServiceDirectoryMenu/ServiceDirectoryMenu';
import TextInformation from '../../components/TextInformation/TextInformation';
import useMediaQuery from '@mui/material/useMediaQuery';
import { MediumHeightDivider, SmallHeightDivider, StyledButtonOutlined } from '../../theme/Styles';
import { Row, RowBodyDivider } from '../../theme/Styles';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from "react-redux";
import { UpdateAppSubHeaderTitle } from '../../redux/actions/UiActions';
import DeskNotification from './components/DeskNotification/DeskNotification';
import { MockupCompletedRequests, MockupInProcessRequests, MockupNotifications, MockupRejectedRequests } from './MyDeskConstants';
import {
    Container,
    MetricsContainer,
    MetricsContentDivider,
    MetricsTextContainer,
    MetricsTitle,
    MetricsValue,
    ButtonsMenuContainer
} from './styles/MyDeskStyles';
import ButtonGroup from '@mui/material/ButtonGroup';
import RequestCard from './components/RequestCard/RequestCard';
import RequestDetailModal from './components/RequestDetailModal/RequestDetailModal';
import Fade from 'react-reveal/Fade';

function MyDesk() {

    const matchesWidth = useMediaQuery('(min-width:768px)');
    const history = useHistory();
    const dispatch = useDispatch();

    const [NotificationList, setNotificationsList] = useState(MockupNotifications);
    const [ActiveMenu, setActiveMenu] = useState(0); //0 MI PERFIL , 2 MIS SOLICITUDES, 3 MIS DOCUMENTOS
    const [openRequestDetailModal, setOpenRequestDetailModal] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState();

    const removeMockupNotifications = (notificationID) => {
        setNotificationsList(
            NotificationList.filter((notification) => notification.id != notificationID)
        )
    }

    const handleChangeMenu = (menuID) => {
        setActiveMenu(menuID)
    }

    const handleRequestDetailModalStatus = (request) => {
        setSelectedRequest(request);
        setOpenRequestDetailModal(!openRequestDetailModal);
    }

    useLayoutEffect(() => {
        dispatch(UpdateAppSubHeaderTitle('Mi escritorio')) //SET SUBHEADER TITLE
    }, []);

    return (
        <Container >
            <Row>
                {
                    matchesWidth &&
                    <Fragment>
                        <ServiceDirectoryMenu />
                        <RowBodyDivider />
                    </Fragment>
                }
                <Container>
                    {
                        NotificationList.map((notification) => (
                            <Fragment>
                                <DeskNotification key={notification.id} variant={notification.type}
                                    onClose={() => removeMockupNotifications(notification.id)}
                                />
                                <SmallHeightDivider />
                            </Fragment>

                        ))
                    }
                    <SmallHeightDivider />
                    <MetricsContainer>
                        <MetricsTextContainer>
                            <MetricsTitle>Solicitudes en proceso</MetricsTitle>
                            <MetricsValue>01</MetricsValue>
                        </MetricsTextContainer>
                        <MetricsContentDivider />
                        <MetricsTextContainer>
                            <MetricsTitle>Solicitudes completadas</MetricsTitle>
                            <MetricsValue>02</MetricsValue>
                        </MetricsTextContainer>
                        <MetricsContentDivider />
                        <MetricsTextContainer>
                            <MetricsTitle>Documentos subidos</MetricsTitle>
                            <MetricsValue>06</MetricsValue>
                        </MetricsTextContainer>
                        <MetricsContentDivider />
                        <MetricsTextContainer>
                            <MetricsTitle>Solicitudes rechazadas</MetricsTitle>
                            <MetricsValue>01</MetricsValue>
                        </MetricsTextContainer>
                    </MetricsContainer>


                    <MediumHeightDivider />
                    <ButtonsMenuContainer>
                        <ButtonGroup size="large" >
                            <StyledButtonOutlined active={ActiveMenu == 0} onClick={() => handleChangeMenu(0)}>
                                Mi Perfil
                            </StyledButtonOutlined>
                            <StyledButtonOutlined active={ActiveMenu == 1} onClick={() => handleChangeMenu(1)}>
                                Mis Solicitudes
                            </StyledButtonOutlined>
                            <StyledButtonOutlined active={ActiveMenu == 2} onClick={() => handleChangeMenu(2)}>
                                Mis Documentos
                            </StyledButtonOutlined>
                        </ButtonGroup>
                    </ButtonsMenuContainer>

                    {
                        ActiveMenu == 0 ? // MI PERFIL
                            <Fade right>
                                <MediumHeightDivider />
                                <TextInformation title="MI PERFIL" />
                            </Fade>
                            :
                            ActiveMenu == 1 ? // SOLICITUDES EN PROCESO
                                <Fade right >
                                    <MediumHeightDivider />
                                    <TextInformation title="Solicitudes en proceso" />

                                    {
                                        MockupInProcessRequests.map((request) => (
                                            <Fragment key={request.id}>
                                                <SmallHeightDivider />
                                                <RequestCard title={request.title} percent={request.percent}
                                                    onClick={() => handleRequestDetailModalStatus(request)}
                                                    variant={request.status} />
                                            </Fragment>
                                        ))
                                    }

                                    <MediumHeightDivider />
                                    <TextInformation title="Solicitudes Completadas" />

                                    {
                                        MockupCompletedRequests.map((request) => (
                                            <Fragment key={request.id}>
                                                <SmallHeightDivider />
                                                <RequestCard title={request.title} percent={'100%'}
                                                    onClick={() => handleRequestDetailModalStatus(request)}
                                                    variant={request.status} />
                                            </Fragment>
                                        ))
                                    }

                                    <MediumHeightDivider />
                                    <TextInformation title="Solicitudes Rechazadas" />

                                    {
                                        MockupRejectedRequests.map((request) => (
                                            <Fragment key={request.id}>
                                                <SmallHeightDivider />
                                                <RequestCard title={request.title} percent={'100%'}
                                                    onClick={() => handleRequestDetailModalStatus(request)}
                                                    variant={request.status} />
                                            </Fragment>
                                        ))
                                    }
                                    <RequestDetailModal
                                        selectedItem={selectedRequest}
                                        open={openRequestDetailModal}
                                        onCloseClick={handleRequestDetailModalStatus} />
                                </Fade>
                                : 
                                // MIS DOCUMENTOS
                                <Fade right>
                                    <MediumHeightDivider />
                                    <TextInformation title="MIS DOCUMENTOS" />
                                </Fade>
                    }

                </Container>
            </Row>

        </Container>
    );
}

export default MyDesk;
