import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import TextInformation from '../TextInformation/TextInformation';
import IconButton from '@mui/material/IconButton';
import { Row } from '../../theme/Styles';
import {
  Container,
  ContentContainer,
  StyledCloseIcon
} from './styles/FormModalStyles';

export default function FormModal({ children, title, open, onClose }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      onBackdropClick={onClose}
      maxWidth='md'
    >
      <Container>

        <ContentContainer>
          <Row>
            <TextInformation title={title} />
            <IconButton onClick={onClose} sx={{ marginLeft: '5%' }}>
              <StyledCloseIcon />
            </IconButton>
          </Row>

          {
            children
          }
        </ContentContainer>
      </Container>
    </Dialog>
  );
}