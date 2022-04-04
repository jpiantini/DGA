import { useState, useLayoutEffect, useEffect, Fragment } from 'react';
import ServiceDirectoryMenu from '../../components/ServiceDirectoryMenu/ServiceDirectoryMenu';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ButtonsMenuContainer, MediumHeightDivider, SmallHeightDivider,CardContainer, StyledButtonOutlined } from '../../theme/Styles';
import { Row, RowBodyDivider } from '../../theme/Styles';
import { useHistory } from 'react-router';
import { useDispatch } from "react-redux";
import { UpdateAppSubHeaderTitle } from '../../redux/actions/UiActions';
import {
    Container,
    MetricsContentDivider,
    MetricsTextContainer,
    MetricsTitle,
    MetricsValue,
} from './styles/MyDeskStyles';
import ButtonGroup from '@mui/material/ButtonGroup';
import MyProfile from './subViews/myProfile/MyProfile';
import MyRequests from './subViews/MyRequests/MyRequests';
import MyDocuments from './subViews/myDocuments/MyDocuments';
import MyInstitutionalDocuments from './subViews/myInstitutionalDocuments/MyInstitutionalDocuments';
import { useQuery, useQueryClient } from 'react-query';
import { getMetricsData } from '../../api/myDesk';
import CenterLoading from '../../components/CenterLoading/CenterLoading';

function MyDesk() {

    const matchesWidth = useMediaQuery('(min-width:768px)');
    const history = useHistory();
    const dispatch = useDispatch();
    const queryClient = useQueryClient();

    
    const [ActiveMenu, setActiveMenu] = useState(1); //0 MI PERFIL , 1 MIS SOLICITUDES, 2 MIS DOCUMENTOS
    const [ActiveDocumentMenu, setActiveDocumentMenu] = useState(0); //0 DOCUMENTOS PERSONALES ,1 DOCUMENTOS INSTITUCIONALES

    const [openModifyProfileModal, setOpenModifyProfileModal] = useState(false);
    const [openModifyOrAddCompanyModal, setOpenModifyOrAddCompanyModal] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState(false);

    const [openRequestDetailModal, setOpenRequestDetailModal] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState();

    const userData = queryClient.getQueryData(['userData']);
    const { data: metricsData, isLoading: metricsDataIsLoading } = useQuery(['myDeskMetricsData'], () => getMetricsData(userData.payload.citizen_id))

    const handleChangeMenu = (menuID) => {
        setActiveMenu(menuID)
    }

    const handleChangeDocumentMenu = (menuID) => {
        setActiveDocumentMenu(menuID)
    }


    const handleRequestDetailModalStatus = (request) => {
        setSelectedRequest(request);
        setOpenRequestDetailModal(!openRequestDetailModal);
    }

    useLayoutEffect(() => {
        dispatch(UpdateAppSubHeaderTitle('Mi escritorio')) //SET SUBHEADER TITLE
    }, []);
    if (metricsDataIsLoading) return <CenterLoading/>
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

                    <SmallHeightDivider />
                    <CardContainer>
                        <MetricsTextContainer>
                            <MetricsTitle>Solicitudes en proceso</MetricsTitle>
                            <MetricsValue>{metricsData.reqsOpen}</MetricsValue>
                        </MetricsTextContainer>
                        <MetricsContentDivider />
                        <MetricsTextContainer>
                            <MetricsTitle>Solicitudes completadas</MetricsTitle>
                            <MetricsValue>{metricsData.reqsComplete}</MetricsValue>
                        </MetricsTextContainer>
                        <MetricsContentDivider />
                        <MetricsTextContainer>
                            <MetricsTitle>Documentos subidos</MetricsTitle>
                            <MetricsValue>{metricsData.documents}</MetricsValue>
                        </MetricsTextContainer>
                        <MetricsContentDivider />
                        <MetricsTextContainer>
                            <MetricsTitle>Solicitudes rechazadas</MetricsTitle>
                            <MetricsValue>{metricsData.reqsRejected}</MetricsValue>
                        </MetricsTextContainer>
                    </CardContainer>


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
                                Documentos
                            </StyledButtonOutlined>
                        </ButtonGroup>
                    </ButtonsMenuContainer>

                    {
                        ActiveMenu == 0 ? // MI PERFIL
                            <MyProfile />
                            :
                            ActiveMenu == 1 ? // SOLICITUDES EN PROCESO
                                <MyRequests />
                                :
                                // DOCUMENTOS
                                <Fragment>
                                    <MediumHeightDivider />
                                    <ButtonsMenuContainer>
                                        <ButtonGroup size="large" >
                                            <StyledButtonOutlined active={ActiveDocumentMenu == 0} onClick={() => handleChangeDocumentMenu(0)}>
                                                Documentos Personales
                                            </StyledButtonOutlined>
                                            <StyledButtonOutlined active={ActiveDocumentMenu == 1} onClick={() => handleChangeDocumentMenu(1)}>
                                                Documentos Institucionales
                                            </StyledButtonOutlined>
                                        </ButtonGroup>
                                    </ButtonsMenuContainer>

                                    {
                                        ActiveDocumentMenu == 0 ?
                                            <MyDocuments />
                                            :
                                            <MyInstitutionalDocuments />
                                    }
                                </Fragment>

                    }

                </Container>
            </Row>
        </Container>
    );
}

export default MyDesk;
