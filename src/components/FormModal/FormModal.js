import { memo } from 'react';
import Dialog from '@mui/material/Dialog';
import TextInformation from '../TextInformation/TextInformation';
import IconButton from '@mui/material/IconButton';
import { Row } from '../../theme/Styles';
import {
  Container,
  ContentContainer,
  StyledCloseIcon
} from './styles/FormModalStyles';

function FormModal({ children, title, open, onClose, conditionalClose,fullWidth,fullScreen,maxWidth ='md' }) {
  //conditionalClose - The modal doesn't close on backdrop click or close button click
  return (
    <Dialog
      open={open}
      onClose={conditionalClose ? null : onClose}
      onBackdropClick={conditionalClose ? null : onClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      fullScreen={fullScreen}
    >
      <Container>
        <ContentContainer>
          <Row>
            {
              title ?
                <TextInformation title={title} />
                :
                <div style={{ width: '100%' }} />
            }
            {
              !conditionalClose &&
              <IconButton onClick={onClose} sx={{ marginLeft: '5%' }}>
                <StyledCloseIcon />
              </IconButton>
            }
          </Row>
          {
            children
          }
        </ContentContainer>
      </Container>
    </Dialog>
  );
}

export default memo(FormModal)