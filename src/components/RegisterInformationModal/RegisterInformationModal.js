import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import ErrorIcon from '@mui/icons-material/Error';
import COLORS from '../../theme/Colors';
import { useMediaQuery } from '@mui/material';
import { SmallHeightDivider, StyledButton, StyledButtonOutlined } from '../../theme/Styles';
import {
  Container,
  BodyText,
  Title,
  ButtonsContainer,
  Header,
  StyledAnnouncementOutlinedIcon,
  CenterContainer,
  TextContainer,
  IconDivider
} from './styles/RegisterInformationModalStyles';
import { useHistory } from 'react-router';

export default function RegisterInformationModal({ open, onBackDropClick, onCloseClick }) {
  const matchesWidth = useMediaQuery('(min-width:768px)');
  const history = useHistory();


  const goToRoute = (route) => {
    //Probably needed save the route required in redux to send after login or sign up
    //Example if i request a service and i press login, route of the service is required to send when login or register is done
    history.push(route)
  }

  return (
    <Dialog
      open={open}
      onClose={onCloseClick}
      onBackdropClick={onBackDropClick}
    >
      <Container>

        <Header>
          <CenterContainer>
            <StyledAnnouncementOutlinedIcon />
            <IconDivider />
            <Title>Información Importante</Title>
          </CenterContainer>
        </Header>
        <CenterContainer>
          <TextContainer>
            <BodyText>
              Para poder registrarse vía el Portal de Servicios,
              es necesario que su computador posea una cámara web,
              de lo contrario usted puede hacerlo con su teléfono inteligente descargando
              la APP Servicios en Línea en las tiendas de Google Play o APP Store.
            </BodyText>
          </TextContainer>
        </CenterContainer>
        <CenterContainer>
          <ButtonsContainer>
            <StyledButton onClick={() => goToRoute('/app/register')}>Ir al Registro</StyledButton>
          </ButtonsContainer>
        </CenterContainer>
        <SmallHeightDivider/>
      </Container>
    </Dialog>
  );
}