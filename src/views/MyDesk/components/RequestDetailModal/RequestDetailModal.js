import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import { useMediaQuery } from '@mui/material';
import { useHistory } from 'react-router';
import TextInformation from '../../../../components/TextInformation/TextInformation';
import DeskNotification from '../DeskNotification/DeskNotification';
import { Row, SmallHeightDivider, StyledButton } from '../../../../theme/Styles';
import {
  Container,
  StyledBackdrop,
  ContentContainer,
  Title,
  Text,
  TextContainer,
  ButtonContainer,
  Column
} from './styles/RequestDetailStyles';

export default function RequestDetailModal({ open, onCloseClick, selectedItem }) {
  const matchesWidth = useMediaQuery('(min-width:768px)');
  const history = useHistory();


  return (
    <Dialog
      open={open}
      onClose={onCloseClick}
      onBackdropClick={onCloseClick}
      BackdropComponent={
        StyledBackdrop
      }
    >
      <Container>

        <ContentContainer>
          <DeskNotification disableAnimation disableCloseButton //LUNES CAMBIAR ESTE COMPONENTE CREAR UNO INDEPENDIENTE PARA ESTA FUNCIONALIDAD
           variant={selectedItem?.actionRequired ? "warning" : selectedItem.status === 'rejected' ?  'rejected' : 'success'}
           message={selectedItem?.actionRequired ?
            "MENSAJE DE ACCION REQUERIDA. FAVOR REALICE LA ACCION REQUERIDA PARA COMPLETAR LA SOLICITUD"
            :
            "¡Felicidades! Esta solicitud se ha completado correctamente."

          } />
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
                selectedItem?.actionRequired &&
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
      </Container>
    </Dialog>
  );
}