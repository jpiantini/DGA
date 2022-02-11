import { useState, useLayoutEffect, Fragment } from 'react';
import Collapsable from '../../components/Collapsable/Collapsable';
import ServiceDirectoryMenu from '../../components/ServiceDirectoryMenu/ServiceDirectoryMenu';
import TextInformation from '../../components/TextInformation/TextInformation';
import { BodyText, Row, SmallHeightDivider, RowBodyDivider, StyledButtonOutlined, MediumHeightDivider } from '../../theme/Styles';
import { FAQDATA, mockupServiceInformation } from './ServiceDescriptionConstants';
import useMediaQuery from '@mui/material/useMediaQuery';
import LoginOrRegisterModal from '../../components/LoginOrRegisterModal/LoginOrRegisterModal';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from "react-redux";
import { UpdateAppSubHeaderTitle } from '../../redux/actions/UiActions';
import { useParams } from "react-router-dom";
import {
    ButtonContainer,
    Container,
    TextListContainer,
} from './styles/ServiceDescriptionStyles';

function ServiceDescription() {
    const matchesWidth = useMediaQuery('(min-width:768px)');
    const history = useHistory();
    let { serviceID } = useParams();
    const dispatch = useDispatch();
    const { authenticated } = useSelector((state) => state.authReducer);

    const [loginOrRegisterModalStatus, setLoginOrRegisterModalStatus] = useState(false);

    const handleServiceRequest = (serviceID) => {
        if (authenticated) {
            history.push(`/app/requestService/${serviceID}`)
        } else {
            setLoginOrRegisterModalStatus(!loginOrRegisterModalStatus);
        }
    }

    useLayoutEffect(() => {
        if (serviceID == 1) { //VALIDATE IF SERVICE EXIST EXAMPLE CALLING BACKEND AND SEND ID TO GET INFO 
            //UPDATE APP HEADER SUBTITLE
            dispatch(UpdateAppSubHeaderTitle(mockupServiceInformation.serviceTitle)) // TITLE OF SUBHEADER APP
        } else {
            history.push('/app/serviceDescription/1')
        }
    }, [serviceID]);


    return (
        <Container >
            <LoginOrRegisterModal open={loginOrRegisterModalStatus} onBackDropClick={() => setLoginOrRegisterModalStatus(false)} onCloseClick={() => setLoginOrRegisterModalStatus(false)} />
            <Row>
                <ServiceDirectoryMenu />
                <RowBodyDivider />
                <Container style={{ width: '100%' }}>
                    <TextInformation title="Información general"
                        content={mockupServiceInformation.generalInformation}
                    />
                    <BodyText>
                        Costo del servicio: &nbsp;
                        <strong>
                            {mockupServiceInformation.serviceCost}
                        </strong>
                    </BodyText>
                    <SmallHeightDivider />
                    <SmallHeightDivider />
                    <TextInformation title="Requisitos"
                        content={mockupServiceInformation.requerimentsInformation}
                    />
                    <TextListContainer>
                        {
                            mockupServiceInformation.requerimentsList.map((value, index) => (
                                <li key={index}>
                                    <BodyText>
                                        {value}
                                    </BodyText>
                                </li>
                            ))
                        }
                    </TextListContainer>
                    <ButtonContainer>
                        <StyledButtonOutlined variant="outlined" onClick={() => handleServiceRequest(serviceID)}>INICIAR SOLICITUD</StyledButtonOutlined>
                    </ButtonContainer>
                    <SmallHeightDivider />
                    <SmallHeightDivider />
                    {
                        matchesWidth &&
                        <Fragment>
                            <TextInformation title="Preguntas Frecuentes"  />
                            <SmallHeightDivider />

                            {
                                FAQDATA.map((item) => (
                                    <div key={item.id}>
                                        <Collapsable title={item.question} content={item.answer} />
                                        <SmallHeightDivider />
                                    </div>
                                ))
                            }
                        </Fragment>

                    }
                </Container>
            </Row>
            <MediumHeightDivider />
            {
                !matchesWidth &&
                <Fragment>
                    <TextInformation title="Preguntas Frecuentes"/>
                    <SmallHeightDivider />

                    {
                        FAQDATA.map((item) => (
                            <div key={item.id}>
                                <Collapsable title={item.question} content={item.answer} />
                                <SmallHeightDivider />
                            </div>
                        ))
                    }
                </Fragment>

            }
        </Container>
    );
}

export default ServiceDescription;
