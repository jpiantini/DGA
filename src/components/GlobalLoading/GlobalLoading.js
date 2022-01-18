import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import { Fade } from '@mui/material';
import {Container,Title} from './styles/GlobalLoadingStyles';
import { SmallHeightDivider } from '../../theme/Styles';
import { useSelector } from 'react-redux';

function GlobalLoading() {
    const { showGlobalLoading,globalLoadingMessage } = useSelector((state) => state.uiReducer);

    return (
        <Dialog
        fullScreen
        open={showGlobalLoading}
        TransitionComponent={Fade}
      >
          <Container>
          <CircularProgress size='10em'/>
          <SmallHeightDivider/>
          <Title>{globalLoadingMessage}</Title>
          </Container>
        </Dialog>
    );
}

export default GlobalLoading;