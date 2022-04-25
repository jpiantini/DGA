import React, { useState } from 'react';
import LaptopIcon from '@mui/icons-material/Laptop';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Icon from '@mui/material/Icon';

import COLORS from '../../theme/Colors';
import {
    Container,
    RowContainer,
    Subtitle,
    SpecialSubtitle,
    Title,
    Separator,
    FullSeparator,
    BodyText,
    ButtonsContainer,
    ServiceButton,
    ServiceSecondaryButton
} from './styles/ServiceCardStyles';

function ServiceCard({ iconName, relationTo, title, subTitle, onRequestPress, OnViewInformationPress,disableRequestButton = false }) {
    return (
        <Container>
            <div style={{ width: '95%', alignSelf: 'center' }}>
   
                <span style={{ color: COLORS.tertiary, fontSize: '40px' }} className="material-icons">
                {/*iconName*/}
                note_add
                </span>
                <RowContainer>
                    <Subtitle>RELACIONADO A: </Subtitle>
                    <SpecialSubtitle style={{ color: COLORS.tertiary }}>{relationTo}</SpecialSubtitle>
                </RowContainer>
                <Title>{title}</Title>

            </div>
            <div>
                <BodyText>
                    {subTitle}
                </BodyText>
            </div>
            < ButtonsContainer>
                <ServiceButton disabled={disableRequestButton} onClick={onRequestPress} endIcon={<LaptopIcon />}>SOLICITAR</ServiceButton>
                <ServiceSecondaryButton onClick={OnViewInformationPress} endIcon={<HelpOutlineIcon />}>VER INFORMACIÓN</ServiceSecondaryButton>
            </ButtonsContainer >

        </Container >
    );
}

export default ServiceCard;
