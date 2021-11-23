import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import ErrorIcon from '@mui/icons-material/Error';
import COLORS from '../../theme/Colors';
import { useMediaQuery } from '@mui/material';
import { SmallHeightDivider, StyledButtonOutlined } from '../../theme/Styles';
import { Container, Title, ButtonsContainer } from './styles/LoginOrRegisterModalStyles';
import { useHistory } from 'react-router';

export default function LoginOrRegisterModal({ open, onBackDropClick, onCloseClick }) {
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
        <ErrorIcon style={{ fontSize: matchesWidth ? '120px' : '80px', color: COLORS.secondary }} />
        <Title>Para solicitar servicio favor iniciar sesión o registrarse</Title>
        <ButtonsContainer>
          <StyledButtonOutlined variant="outlined" onClick={() => goToRoute('/public/login')}>INICIAR SESIÓN</StyledButtonOutlined>
          <SmallHeightDivider />
          <StyledButtonOutlined variant="outlined" onClick={() => goToRoute('/public/register')}>REGISTRARME</StyledButtonOutlined>
        </ButtonsContainer>
      </Container>
    </Dialog>
  );
}