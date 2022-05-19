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
import HomeIcon from '../../../../assets/icons/HomeIcon.png'
import MonumentIcon from '../../../../assets/icons/MonumentIcon.png'
import EditIcons from '../../../../assets/icons/EditIcons.png'


function ServiceCard({ title, bodyText, onRequestPress, cardNumber = 0 }) {
    const iconsForCard = [
        HomeIcon,
        EditIcons,
        MonumentIcon,
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
                <LinkText onClick={onRequestPress}>VER TRAMITES</LinkText>
            </CenterContainer>
        </Container >

    );
}

export default ServiceCard;
