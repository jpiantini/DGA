import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import ErrorIcon from '@mui/icons-material/Error';
import COLORS from '../../theme/Colors';
import { Container, Title, ButtonsContainer } from './styles/LoginOrRegisterModalStyles';
import { useMediaQuery } from '@mui/material';
import { SmallHeightDivider, StyledButtonOutlined } from '../../theme/Styles';

export default function LoginOrRegisterModal({ open, onBackDropClick, onCloseClick }) {
  const matchesWidth = useMediaQuery('(min-width:768px)');

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
          <StyledButtonOutlined variant="outlined">INICIAR SESIÓN</StyledButtonOutlined>
          <SmallHeightDivider />
          <StyledButtonOutlined variant="outlined">REGISTRARME</StyledButtonOutlined>
        </ButtonsContainer>
      </Container>
    </Dialog>
  );
}