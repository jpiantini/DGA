import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import { Fade } from '@mui/material';
import { Container, LogoImage, Title } from './styles/GlobalLoadingStyles';
import { SmallHeightDivider } from '../../theme/Styles';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import MiturLogo from "../../assets/images/MiturLogoSecondary.png";

function GlobalLoading({showByProp,textByProp}) {
    const { showGlobalLoading, globalLoadingMessage } = useSelector((state) => state.uiReducer);

    const [showLocalLoading, setShowLocalLoading] = useState(false);
    const [showLogo, setShowLogo] = useState(true);

    return (
        <Dialog
            fullScreen
            open={showByProp ? showByProp:showGlobalLoading}
            TransitionComponent={Fade}
        >
            <Container>
                <Fade in={showLogo} onEntered={() => setShowLogo(false)} onExited={() => setShowLocalLoading(true)} unmountOnExit={true}>
                    <LogoImage src={MiturLogo} />
                </Fade>
                {
                    showLocalLoading && <CircularProgress size='10em' />
                }
                <SmallHeightDivider />
                <Title>{textByProp ? textByProp:globalLoadingMessage}</Title>
            </Container>
        </Dialog>
    );
}

export default GlobalLoading;