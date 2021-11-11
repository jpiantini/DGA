import * as React from 'react';
import { Container, DarkOverlay, Title } from './styles/SubHeaderStyles';
import SubHeaderSolidBackground from '../../../../assets/images/SolidColorBanner.png'
import SubHeaderBackground from '../../../../assets/images/SubHeaderBackground.png'

function SubHeader() {
    const USING_IMAGE = false; //MOCKUP VALUE
    return (
        <Container style={{
            backgroundImage: USING_IMAGE ? `url(${SubHeaderBackground})` :  `url(${SubHeaderSolidBackground})`,
        }}>
            {
                USING_IMAGE ?
                <DarkOverlay>
                <Title>Solicitud de no objeción de suelo</Title>
            </DarkOverlay>
                :
                <Title>Solicitud de no objeción de suelo</Title>
            }

        </Container>

    );
}

export default SubHeader;
