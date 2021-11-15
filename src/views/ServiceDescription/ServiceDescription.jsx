import { useState } from 'react';
import Collapsable from '../../components/Collapsable/Collapsable';
import ServiceDirectoryMenu from '../../components/ServiceDirectoryMenu/ServiceDirectoryMenu';
import TextInformation from '../../components/TextInformation/TextInformation';
import { BodyText, Row, SmallHeightDivider, RowBodyDivider, StyledButtonOutlined } from '../../theme/Styles';
import {
    ButtonContainer,
    Container,
} from './styles/ServiceDescriptionStyles';
import { FAQDATA } from './ServiceDescriptionConstants';
import useMediaQuery from '@mui/material/useMediaQuery';
import LoginOrRegisterModal from '../../components/LoginOrRegisterModal/LoginOrRegisterModal';

function ServiceDescription() {
    const matchesWidth = useMediaQuery('(min-width:768px)');

    const [loginOrRegisterModalStatus,setLoginOrRegisterModalStatus] = useState(false);

    const handleLoginOrRegisterModal = () => {
        //CREATE OTHER FUNCTION TO VALIDATE LOGIN AND START REQUEST OR OPEN MODAL
        setLoginOrRegisterModalStatus(!loginOrRegisterModalStatus);
    }

    return (
        <Container >
                        <LoginOrRegisterModal open={loginOrRegisterModalStatus} onBackDropClick={handleLoginOrRegisterModal} onCloseClick={handleLoginOrRegisterModal}/>
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
                    <TextInformation title="Requisitos"
                        content="Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                      sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
                      sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
                      Stet clita."
                    />
                    <BodyText>• Cedula de Identidad</BodyText>
                    <BodyText>• Realizar Pago (en línea o presencial)</BodyText>
                    <ButtonContainer>
                        <StyledButtonOutlined variant="outlined" onClick={() => handleLoginOrRegisterModal()}>INICIAR SOLICITUD</StyledButtonOutlined>
                    </ButtonContainer>
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
                                    <>
                                        <Collapsable key={item.id} title={item.question} content={item.answer} />
                                        <SmallHeightDivider />
                                    </>
                                ))
                            }
                        </>

                    }
        </Container>
    );
}

export default ServiceDescription;
