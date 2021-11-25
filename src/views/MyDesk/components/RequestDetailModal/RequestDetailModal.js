import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import { useMediaQuery } from '@mui/material';
import { useHistory } from 'react-router';
import TextInformation from '../../../../components/TextInformation/TextInformation';
import IconButton from '@mui/material/IconButton';
import { Row, SmallHeightDivider, StyledButton } from '../../../../theme/Styles';
import {
  Container,
  StyledBackdrop,
  ContentContainer,
  Title,
  Text,
  TextContainer,
  ButtonContainer,
  Column,
  StyledCancelIcon,
  StyledCheckCircleIcon,
  StyledWarningIcon,
  IconContainer,
  HeaderMessageContainer,
  HeaderMessageTextContainer,
  HeaderMessageBodyText,
  StyledCloseIcon
} from './styles/RequestDetailModalStyles';
import { HeaderMessages } from './RequestDetailModalConstants';

export default function RequestDetailModal({ open, onCloseClick, selectedItem }) {
  const matchesWidth = useMediaQuery('(min-width:768px)');
  const history = useHistory();

  const HeaderMessage = ({ variant, message }) => {
    console.log(variant, message)
    return (
      <HeaderMessageContainer variant={variant}>
        <HeaderMessageTextContainer>
          <IconContainer>
            {
              variant === 'rejected' ?
                <StyledCancelIcon />
                :
                variant === 'actionRequired' ?
                  <StyledWarningIcon />
                  :
                  variant === 'success' ?
                    <StyledCheckCircleIcon />
                    :
                    variant === 'inProcess' ?
                      <StyledCheckCircleIcon />
                      :
                      null
            }
          </IconContainer>
          <div style={{ width: '2%' }} />
          <HeaderMessageBodyText >
            {message}
          </HeaderMessageBodyText>
        </HeaderMessageTextContainer>
      </HeaderMessageContainer>
    )
  }

  return (
    <Dialog
      open={open}
      onClose={onCloseClick}
      onBackdropClick={onCloseClick}
    //  BackdropComponent={
    //    StyledBackdrop
    //  }
    >
      <Container>

        <ContentContainer>
          <Row>
            <HeaderMessage
              variant={selectedItem?.status}
              message={
                HeaderMessages.find((message) =>
                  message.id === selectedItem?.status
                )?.message} />
            <IconButton onClick={onCloseClick} sx={{ marginLeft: '5%' }}>
              <StyledCloseIcon />
            </IconButton>
          </Row>

          <SmallHeightDivider />
          <TextInformation title="Detalles" />
          <SmallHeightDivider />
          <TextContainer>
            <Row style={{ justifyContent: 'space-between' }}>
              <Column>
                <Title>
                  Fecha:
                </Title>
                <Text>
                  20 septiembre de 2021
                </Text>
              </Column>
              <Column>
                <Title>
                  Numero de solicitud:
                </Title>
                <Text>
                  02355666687
                </Text>
              </Column>
            </Row>
            <SmallHeightDivider />
            <Row style={{ justifyContent: 'space-between' }}>
              <Column>
                <Title>
                  Empresa:
                </Title>
                <Text>
                  Construcciones K
                </Text>
              </Column>
              <Column>
                <Title>
                  Servicio:
                </Title>
                <Text>
                  Clasificación provisional
                </Text>
              </Column>
            </Row>
            <SmallHeightDivider />
            <Row style={{ justifyContent: 'space-between' }}>
              <Column>
                <Title>
                  Costo:
                </Title>
                <Text>
                  RD$2,000.00
                </Text>
              </Column>
              {
                selectedItem?.status === 'actionRequired' &&
                <Column>
                  <ButtonContainer>
                    <StyledButton>
                      Continuar
                    </StyledButton>
                  </ButtonContainer>
                </Column>
              }
            </Row>
          </TextContainer>
        </ContentContainer>
        <SmallHeightDivider />
      </Container>
    </Dialog>
  );
}