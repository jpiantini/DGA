import * as React from 'react';
import SubHeaderSolidBackground from '../../../../assets/images/SolidColorBanner.png'
import SubHeaderBackground from '../../../../assets/images/SubHeaderBackground.png'
import { useSelector } from "react-redux";
import { Container, DarkOverlay, Title } from './styles/SubHeaderStyles';

function SubHeader() {
    const USING_IMAGE = false; //MOCKUP VALUE
    const { title } = useSelector((state) => state.uiReducer);
    
  
    return (
        <Container style={{
            backgroundImage: USING_IMAGE ? `url(${SubHeaderBackground})` :  `url(${SubHeaderSolidBackground})`,
        }}>
            {
                USING_IMAGE ?
                <DarkOverlay>
                <Title>{title}</Title>
            </DarkOverlay>
                :
                <Title>{title}</Title>
            }

        </Container>

    );
}

export default SubHeader;
