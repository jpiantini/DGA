import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import {
    Container,
    TextContainer,
    Text,
    StyledCloseIcon,
    StyledCheckCircleIcon,
    StyledWarningIcon,
    StyledCancelIcon,
    CloseButtonContainer,
    IconContainer
} from './styles/DeskNotificationStyles';
import Slide from 'react-reveal/Slide';

function DeskNotification({ variant, message, onClose, disableAnimation, disableCloseButton }) {

    const [showAnimation, setShowAnimation] = useState();

    const handleOnClose = () => {
        setShowAnimation(false);
        setTimeout(() => {
            onClose();
        }, 1000);
    }
    return (
        <Slide right={!disableAnimation} when={showAnimation}>
            <Container variant={variant}>
                <TextContainer>
                    <IconContainer>
                        {
                            variant === 'error' ?
                                <StyledCancelIcon />
                                :
                                variant === 'warning' ?
                                    <StyledWarningIcon />
                                    :
                                    <StyledCheckCircleIcon />
                        }
                    </IconContainer>
                    <Text >
                        {
                            message ? message :
                            ' Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
                        }
                       
                    </Text>
                </TextContainer>
                {
                    disableCloseButton ? null :
                        <CloseButtonContainer>
                            <IconButton onClick={handleOnClose} sx={{ padding: 0 }}>
                                <StyledCloseIcon />
                            </IconButton>
                        </CloseButtonContainer>
                }

            </Container>
        </Slide>
    );
}

export default DeskNotification;
