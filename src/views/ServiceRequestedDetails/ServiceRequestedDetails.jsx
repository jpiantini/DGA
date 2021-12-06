import { useState, useLayoutEffect, Fragment } from 'react';
import ServiceDirectoryMenu from '../../components/ServiceDirectoryMenu/ServiceDirectoryMenu';
import TextInformation from '../../components/TextInformation/TextInformation';
import { BodyText, Row, SmallHeightDivider, RowBodyDivider, StyledButtonOutlined, ButtonsMenuContainer, MediumHeightDivider, BodyTextBold } from '../../theme/Styles';
import { claimsOptions, FormSchema } from './ServiceRequestedDetailsConstants';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from "react-redux";
import { UpdateAppSubHeaderTitle } from '../../redux/actions/UiActions';
import { useParams } from "react-router-dom";
import {
    ButtonContainer,
    Container,
} from './styles/ServiceRequestedDetailsStyles';
import ButtonGroup from '@mui/material/ButtonGroup';
import Select from '../../components/Select/Select';
import TextField from '../../components/TextField/TextField';
import UploadFile from '../../components/UploadFile/UploadFile';
import FormModal from '../../components/FormModal/FormModal';
import { useFormik } from 'formik';
import ClaimCard from './components/ClaimCard/ClaimCard';
import ComplaintsAndClaims from './subViews/complaintsAndClaims/ComplaintsAndClaims';
import Payment from './subViews/payments/Payments';


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
        if (serviceID == LastServiceAvailable) {
            //UPDATE APP HEADER SUBTITLE
            dispatch(UpdateAppSubHeaderTitle('TITULO DE SERVICIO')) // TITLE OF SUBHEADER APP
        } else {
            //IF ENTERED SERVICE AS PARAM DOES`NT EXISTS REDIRECT TO FIRST SERVICE
            history.push('/app/serviceDescription/1')
            //  let Title = titles.find((title) => title.id == 1)?.title;
            dispatch(UpdateAppSubHeaderTitle('TITULO DE SERVICIO')) // TITLE OF SUBHEADER APP
        }
    }, []);


    return (
        <Container >
            <Row>
                <ServiceDirectoryMenu />
                <RowBodyDivider />
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
                        </ButtonGroup>
                    </ButtonsMenuContainer>
                    <MediumHeightDivider />
                    {
                        activeMenu == 0 ?

                            <h1>detayes</h1>
                            :
                            activeMenu == 1 ?
                                <ComplaintsAndClaims/>
                                :
                                <Payment/>

                    }


                </Container>

            </Row>

        </Container>
    );
}

export default ServiceRequestedDetails;
