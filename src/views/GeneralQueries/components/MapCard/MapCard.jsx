import { useState, useLayoutEffect, useEffect, memo, Fragment } from 'react';
import {
  SmallHeightDivider,
  MediumHeightDivider,
  StyledButtonOutlined,
  StyledButton,
} from '../../../../theme/Styles';
import {

  CardTitle,
  Container,
  Image,
  StyledCloseIcon,
  TitleContainer,
} from './styles/MapCardStyles';
//import { } from './GeneralQueriesConstants';
import { Box, Dialog, Grid, IconButton } from '@mui/material';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';


function MapCard({ previewURL, imageURL, title }) {

  const [openModal, setOpenModal] = useState();
  const [mouseOver, setMouseOver] = useState(false);

  const handleModalVisibility = () => {
    setMouseOver(false)
    setOpenModal(!openModal)
  }

  return (
    <Container onMouseLeave={() => setMouseOver(false)} onMouseOver={() => setMouseOver(true)}>
      <div style={{ display: 'flex', flexDirection: 'column' }} onClick={handleModalVisibility}>
        <TitleContainer hovering={mouseOver}>
          <CardTitle>
            {title}
          </CardTitle>
        </TitleContainer>
        <Image hovering={mouseOver} src={previewURL} />
      </div>

      <Dialog
        open={openModal}
        onClose={handleModalVisibility}
        onBackdropClick={handleModalVisibility}
        fullWidth
        maxWidth="xl"
      >
        <IconButton sx={{ zIndex: 99999999, width: '50px', alignSelf: 'flex-end', position: 'absolute', backgroundColor: '#FFF' }} onClick={handleModalVisibility}>
          <StyledCloseIcon />
        </IconButton>
        <TransformWrapper>
          {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
            <Fragment>
              <TransformComponent wrapperStyle={{ alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
                <img src={imageURL} style={{ maxWidth: '100%', alignSelf: 'center' }} />
              </TransformComponent>

              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                <StyledButton style={{ borderRadius: 0 }} onClick={() => zoomIn()}>Zoom +</StyledButton>
                <StyledButton style={{ borderRadius: 0 }} onClick={() => zoomOut()}>Zoom -</StyledButton>
                <StyledButton style={{ borderRadius: 0 }} onClick={() => resetTransform()}>Reiniciar</StyledButton>
              </div>
            </Fragment>
          )}
        </TransformWrapper>
      </Dialog>
    </Container>
  );
}

export default memo(MapCard);
