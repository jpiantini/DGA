import { useState,useLayoutEffect } from 'react';
import Collapsable from '../../components/Collapsable/Collapsable';
import ServiceDirectoryMenu from '../../components/ServiceDirectoryMenu/ServiceDirectoryMenu';
import TextInformation from '../../components/TextInformation/TextInformation';
import { BodyText, Row, SmallHeightDivider, RowBodyDivider, StyledButtonOutlined, MediumHeightDivider } from '../../theme/Styles';
import { FAQDATA } from './ServiceDescriptionConstants';
import useMediaQuery from '@mui/material/useMediaQuery';
import LoginOrRegisterModal from '../../components/LoginOrRegisterModal/LoginOrRegisterModal';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from "react-redux";
import { UpdateAppSubHeaderTitle } from '../../redux/actions/UiActions';
import { useParams } from "react-router-dom";
import {
    ButtonContainer,
    Container,
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
            <LoginOrRegisterModal open={loginOrRegisterModalStatus} onBackDropClick={() => setLoginOrRegisterModalStatus(false)} onCloseClick={() => setLoginOrRegisterModalStatus(false)} />
            <Row>
                <ServiceDirectoryMenu />
                <RowBodyDivider />
                <Container style={{ width: '100%' }}>
                    <TextInformation title="Información general"
                        content="Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                     sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
                     sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
                     Stet clita"
                    />
                    <BodyText>Costo del servicio: Gratuito</BodyText>
                    <SmallHeightDivider />
                    <SmallHeightDivider />
                    <TextInformation title="Requisitos"
                        content="Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                      sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
                      sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
                      Stet clita."
                    />
                    <BodyText>• Cedula de Identidad</BodyText>
                    <BodyText>• Realizar Pago (en línea o presencial)</BodyText>
                    <ButtonContainer>
                        <StyledButtonOutlined variant="outlined" onClick={() => handleServiceRequest(serviceID)}>INICIAR SOLICITUD</StyledButtonOutlined>
                    </ButtonContainer>
                    <SmallHeightDivider />
                    <SmallHeightDivider />
                    {
                        matchesWidth &&
                        <>
                            <TextInformation title="Preguntas Frecuentes"
                                content="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, 
                        sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
                        sed diam voluptua."
                            />

                            {
                                FAQDATA.map((item) => (
                                    <div key={item.id}>
                                        <Collapsable title={item.question} content={item.answer} />
                                        <SmallHeightDivider />
                                    </div>
                                ))
                            }
                        </>

                    }
                </Container>
            </Row>
            <MediumHeightDivider/>
            {
                !matchesWidth &&
                <>
                    <TextInformation title="Preguntas Frecuentes"
                        content="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, 
                        sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
                        sed diam voluptua."
                    />

                    {
                        FAQDATA.map((item) => (
                            <div key={item.id}>
                                <Collapsable  title={item.question} content={item.answer} />
                                <SmallHeightDivider />
                            </div>
                        ))
                    }
                </>

            }
        </Container>
    );
}

export default ServiceDescription;
