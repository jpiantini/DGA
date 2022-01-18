import {memo} from 'react';
import Dialog from '@mui/material/Dialog';
import TextInformation from '../TextInformation/TextInformation';
import IconButton from '@mui/material/IconButton';
import { Row } from '../../theme/Styles';
import {
  Container,
  ContentContainer,
  StyledCloseIcon
} from './styles/FormModalStyles';

function FormModal({ children, title, open, onClose }) {
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
            {
              title ?
              <TextInformation title={title} />
              :
              <div style={{width:'100%'}}/>
            }
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

export default memo(FormModal)