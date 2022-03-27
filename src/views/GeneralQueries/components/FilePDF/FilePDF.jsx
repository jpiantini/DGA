import { useState, memo, } from 'react';
import {

  Row,
} from '../../../../theme/Styles';
import {
  BodyText,
  Container,
  LineDivider,
  StyledInsertDriveFileIcon,
} from './styles/FilePDFStyles';
import { Dialog, } from '@mui/material';
import { DocumentViewer } from 'react-documents';

function MapCard({ title, url }) {

  const [openModal, setOpenModal] = useState();
  const [mouseOver, setMouseOver] = useState(false);

  const handleModalVisibility = () => {
    setMouseOver(false)
    setOpenModal(!openModal)
  }

  return (
    <Container onClick={handleModalVisibility} onMouseLeave={() => setMouseOver(false)} onMouseOver={() => setMouseOver(true)}>

      <Row style={{ alignItems: 'center' }}>
        <StyledInsertDriveFileIcon isHover={mouseOver} />
        <div style={{ width: '15px' }} />
        <BodyText>
          {title}
        </BodyText>
      </Row>
      <LineDivider />
      <Dialog
        open={openModal}
        onClose={handleModalVisibility}
        onBackdropClick={handleModalVisibility}
        fullWidth
        maxWidth="xl"
      >
        <DocumentViewer style={{ height: '90vh', width: '100%' }} viewer="url" url={url} />
      </Dialog>
    </Container>
  );
}

export default memo(MapCard);
