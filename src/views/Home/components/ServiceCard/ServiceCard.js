import React, { useState } from 'react';
import { StyledButtonOutlined } from '../../../../theme/Styles';
import {
    Container,
    Title,
    Separator,
    BodyText,
    ServiceButton,
    CenterContainer,
    FirstIcon,
    SecondIcon,
    ThirdIcon,
    LinkText
} from './styles/ServiceCardStyles';

function ServiceCard({ title, bodyText, onRequestPress, cardNumber = 0 }) {
    const iconsForCard = [
        <FirstIcon />,
        <SecondIcon />,
        <ThirdIcon />,
    ]
    return (
        <Container>
            {
                iconsForCard[cardNumber]
            }
            <CenterContainer >
                <Title>{title}</Title>
                <BodyText>
                    {bodyText}
                </BodyText>
                <LinkText onClick={onRequestPress}>VER SERVICIOS</LinkText>
            </CenterContainer>
        </Container >

    );
}

export default ServiceCard;
