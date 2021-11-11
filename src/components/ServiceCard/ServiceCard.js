import  React, { useState } from 'react';
import ReceiptIcon from '@mui/icons-material/Receipt';
import LaptopIcon from '@mui/icons-material/Laptop';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import * as MuiIcons from '@mui/icons-material';
import Icon from '@mui/material/Icon';

import COLORS from '../../../../theme/Colors';
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

function ServiceCard({iconName,relationTo,title,subTitle,onRequestPress,OnViewInformationPress}) {

  
    const [isHovering, setIsHovering] = useState(false);

    const handleHover = (isMouseOver) => {
        setIsHovering(isMouseOver);
    }
    return (
        <Container onMouseOver={() => handleHover(true)} onMouseOut={() => handleHover(false)}>
            <div style={{ margin: '10px' }}>
                <Icon style={{ color: COLORS.tertiary, fontSize: '40px' }}>{iconName}</Icon>
                <RowContainer>
                    <Subtitle>RELACIONADO A: </Subtitle>
                    <SpecialSubtitle style={{ color: isHovering ? COLORS.primary : COLORS.tertiary }}>{relationTo}</SpecialSubtitle>
                </RowContainer>
                <Title>{title}</Title>
                <Separator />


            </div>
            <div>
                <BodyText style={{
                    display: 'flex',
                    'max-height': !isHovering ? 100 : 0,
                    transition: 'max-height 0.3s ease-out',
                }}>
                    {subTitle}
                </BodyText>
            </div>
            <FullSeparator style={{ display: !isHovering ? 'flex' : 'none' }} />

            < ButtonsContainer style={{
                display: 'flex',
                'max-height': isHovering ? 100 : 0,
                transition: 'max-height 0.3s ease',
            }}>

                <ServiceButton onClick={onRequestPress} endIcon={<LaptopIcon />}>SOLICITAR</ServiceButton>
                <ServiceSecondaryButton onClick={OnViewInformationPress} endIcon={<HelpOutlineIcon />}>VER INFORMACIÓN</ServiceSecondaryButton>
            </ButtonsContainer >

        </Container >

    );
}

export default ServiceCard;
