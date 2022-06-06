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
    LinkText,
    CardIconContainer
} from './styles/ServiceCardStyles';
import Aire from '../../../../assets/icons/aire.png'
import Cliente from '../../../../assets/icons/cliente.png'
import Envio from '../../../../assets/icons/envio.png'


function ServiceCard({ title, bodyText, onRequestPress, requestCustomTitle, cardNumber = 0 }) {
    const iconsForCard = [
        Aire,
        Cliente,
        Envio
    ]
    return (
        <Container>
            <CardIconContainer>
                <img src={iconsForCard[cardNumber]} />
            </CardIconContainer>
            <CenterContainer >
                <Title>{title}</Title>
                <BodyText>
                    {bodyText}
                </BodyText>
                <LinkText onClick={onRequestPress}>
                    {requestCustomTitle ? requestCustomTitle : "VER TRÁMITES"}
                </LinkText>
            </CenterContainer>
        </Container >

    );
}

export default ServiceCard;
