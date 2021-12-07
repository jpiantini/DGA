import { useState, useLayoutEffect, Fragment } from 'react';
import ServiceDirectoryMenu from '../../components/ServiceDirectoryMenu/ServiceDirectoryMenu';
import { Row, RowBodyDivider, StyledButtonOutlined, ButtonsMenuContainer, MediumHeightDivider, SmallHeightDivider } from '../../theme/Styles';
import { FormSchema } from './ServiceRequestedDetailsConstants';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from "react-redux";
import { UpdateAppSubHeaderTitle } from '../../redux/actions/UiActions';
import { useParams } from "react-router-dom";
import {
    Container,
} from './styles/ServiceRequestedDetailsStyles';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useFormik } from 'formik';
import ComplaintsAndClaims from './subViews/complaintsAndClaims/ComplaintsAndClaims';
import Payment from './subViews/payments/Payments';
import Details from './subViews/details/Details';
import DeskNotification from '../../components/DeskNotification/DeskNotification';
import ActionsRequired from './subViews/actionsRequired/ActionsRequired';


function ServiceRequestedDetails() {
    const matchesWidth = useMediaQuery('(min-width:768px)');
    const history = useHistory();
    let { serviceID, requestID } = useParams();
    const dispatch = useDispatch();
    const { authenticated } = useSelector((state) => state.authReducer);

    const [activeMenu, setActiveMenu] = useState(1);
    const [claimModalVisible, setClaimModalVisible] = useState(false);

    const [claims, setClaims] = useState([]);


    const handleChangeMenu = (menuID) => {
        setActiveMenu(menuID);
    }
    const handleClaimModalVisibility = () => {
        setClaimModalVisible(!claimModalVisible);
    }

    const handleRegisterClaim = (claim) => {
        alert('reclamacion creada');
        handleClaimModalVisibility();
        setClaims(prev => [...prev, claim]); // IS FOR MOCKUP BUT ALL CLAIMS RECHARGED WHEN ANOTHER NEW CLAIM IS REGISTERED
        Object.keys(formik.values).map((key) => {
            formik.setFieldValue(key, '', false);
        })
    }

    const formik = useFormik({
        initialValues: {
            reason: '',
            message: '',
        },
        validationSchema: FormSchema,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (values) => {
            handleRegisterClaim(values);
            console.log(claims)
        },
    });


    useLayoutEffect(() => {
        const LastServiceAvailable = 1; //TEST VALUE
        //CONSULT SERVICE INFO IN BACKEND 
        if (serviceID == LastServiceAvailable) { //IF SERVICE EXISTS
            //UPDATE APP HEADER SUBTITLE AND SET THE SERVICE NAME
            dispatch(UpdateAppSubHeaderTitle('TITULO DE SERVICIO')) // TITLE OF SUBHEADER APP
        } else {
            //IF ENTERED SERVICE AS PARAM DOES`NT EXISTS REDIRECT TO MyDesk
            history.push('/app/myDesk')
        }
    }, []);


    return (
        <Container >
            <Row>
                <ServiceDirectoryMenu />
                <RowBodyDivider />
                <Container style={{ width: '100%' }}>
                    {
                        //ONLY MOUNT IF REQUESTID HAS AN ACTION REQUIRED
                        <DeskNotification variant={'warning'}
                        />
                    }
                    <SmallHeightDivider />
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
                                true && //IF ACTION REQUIRED IS TRUE
                                <StyledButtonOutlined active={activeMenu == 3} onClick={() => handleChangeMenu(3)}>
                                Accion Requerida
                            </StyledButtonOutlined>
                            }
                        </ButtonGroup>
                    </ButtonsMenuContainer>
                    <MediumHeightDivider />
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
                                    true && <ActionsRequired /> //IF ACTION REQUIRED IS TRUE

                    }


                </Container>

            </Row>

        </Container>
    );
}

export default ServiceRequestedDetails;
