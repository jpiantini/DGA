import * as React from 'react';
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

function DeskNotification({ variant, message,onClose }) {


    return (
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
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </Text>
            </TextContainer>
            <CloseButtonContainer>
                <IconButton onClick={onClose} sx={{padding:0}}>
                    <StyledCloseIcon />
                </IconButton>
            </CloseButtonContainer>

        </Container>
    );
}

export default DeskNotification;
