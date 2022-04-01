import { useState, memo } from 'react';
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
    IconContainer,
    StyledInfoIcon
} from './styles/DeskNotificationStyles';
import Slide from 'react-reveal/Slide';
import parse from 'html-react-parser';

function DeskNotification({ variant, message, onClose, disableAnimation, disableCloseButton }) {

    const [showAnimation, setShowAnimation] = useState();

    const handleOnClose = () => {
        setShowAnimation(false);
        setTimeout(() => {
            if (onClose) {
                onClose();
            }
        }, 1000);
    }
    return (
        <Slide right={!disableAnimation} when={showAnimation}>
            <Container variant={variant}>
                <TextContainer>
                    <IconContainer>
                        {
                            variant === 'danger' ?
                                <StyledCancelIcon />
                                :
                                variant === 'warning' ?
                                    <StyledWarningIcon />
                                    :
                                    variant === 'info' ?
                                        <StyledInfoIcon />
                                        :
                                        < StyledCheckCircleIcon />


                        }
                    </IconContainer>
                    <strong>
                        <Text >
                            {
                                message ? parse(message) :
                                    ' Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
                            }
                        </Text>
                    </strong>
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

export default memo(DeskNotification);
