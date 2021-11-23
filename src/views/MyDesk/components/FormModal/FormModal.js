import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import { useMediaQuery } from '@mui/material';
import { useHistory } from 'react-router';
import TextInformation from '../../../../components/TextInformation/TextInformation';
import IconButton from '@mui/material/IconButton';
import { Row, SmallHeightDivider } from '../../../../theme/Styles';
import {
  Container,
  StyledBackdrop,
  ContentContainer,
  StyledCloseIcon
} from './styles/FormModalStyles';

export default function FormModal({ children,title,open,onClose }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      onBackdropClick={onClose}
     // BackdropComponent={
        //StyledBackdrop
    //  }
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