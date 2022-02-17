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
import { useQuery } from 'react-query';
import { getRequestDetail } from '../../api/ServiceRequestedDetails';


function ServiceRequestedDetails() {
    const history = useHistory();
    let { requestID } = useParams();
    const dispatch = useDispatch();

    const { data: serviceRequestedDetail, isLoading } = useQuery(['serviceRequestedDetail', requestID], async () => {
        try {
            dispatch(ShowGlobalLoading("Cargando"));
            const response = await getRequestDetail(requestID, "40225994520");
            dispatch(HideGlobalLoading());
            return response;
        } catch (error) {
            history.push('/public');
            dispatch(HideGlobalLoading());
        }
    })

    const [activeMenu, setActiveMenu] = useState(0);
    const [claimModalVisible, setClaimModalVisible] = useState(false);

    const handleChangeMenu = (menuID) => {
        setActiveMenu(menuID);
    }

    useLayoutEffect(() => {
        //UPDATE APP HEADER SUBTITLE, SET THE SERVICE NAME AND TOGGLE TO SPECIFIC MENU
        if (serviceRequestedDetail != undefined) {
            dispatch(UpdateAppSubHeaderTitle(serviceRequestedDetail.request.service.name));
            setActiveMenu(serviceRequestedDetail.request.request_actions ? 3 : 0);
        }

    }, [serviceRequestedDetail]);

    if (isLoading) return null;

    return (
        <Container >
            <Row>
                <Container style={{ width: '100%' }}>
                    <ButtonsMenuContainer>
                        <ButtonGroup size="large" >
                            <StyledButtonOutlined active={activeMenu == 0} onClick={() => handleChangeMenu(0)}>
                                Detalles
                            </StyledButtonOutlined>
                            <StyledButtonOutlined active={activeMenu == 1} onClick={() => handleChangeMenu(1)}>
                                Quejas y Reclamaciones
                            </StyledButtonOutlined>
                            <StyledButtonOutlined active={activeMenu == 2} onClick={() => handleChangeMenu(2)}>
                                Pagos
                            </StyledButtonOutlined>
                            {
                                serviceRequestedDetail.request.request_actions && //IF ACTION REQUIRED IS TRUE
                                <StyledButtonOutlined active={activeMenu == 3} onClick={() => handleChangeMenu(3)}>
                                    Accion Requerida
                                </StyledButtonOutlined>
                            }
                        </ButtonGroup>
                    </ButtonsMenuContainer>
                    {
                        serviceRequestedDetail.request.request_actions ? //ONLY MOUNT IF REQUESTID HAS AN ACTION REQUIRED
                            <Fragment>
                                <SmallHeightDivider />
                                <DeskNotification variant={'warning'} disableCloseButton={true}
                                />
                                <SmallHeightDivider />
                            </Fragment>
                            :
                            <MediumHeightDivider />
                    }
                    {
                        activeMenu == 0 ?

                            <Details />
                            :
                            activeMenu == 1 ?
                                <ComplaintsAndClaims />
                                :
                                activeMenu == 2 ?
                                    <Payment />
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
