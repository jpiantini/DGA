import React, { useState } from 'react';
import { StyledButtonOutlined } from '../../../../theme/Styles';
import {
    Container,
    Title,
    Separator,
    BodyText,
    ServiceButton,
    CenterContainer
} from './styles/ServiceCardStyles';

function ServiceCard({ title, bodyText, onRequestPress }) {

    return (
        <Container>
            <CenterContainer >
                <Separator />
                <Title>{title}</Title>
                <Separator />
                <BodyText>
                    {bodyText}
                </BodyText>
                <StyledButtonOutlined variant="outlined" onClick={onRequestPress} style={{width:'80%'}}>VER SERVICIOS</StyledButtonOutlined>
            </CenterContainer>
        </Container >

    );
}

export default ServiceCard;
