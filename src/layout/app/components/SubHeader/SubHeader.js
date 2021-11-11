import * as React from 'react';
import { Container, DarkOverlay,Title } from './styles/SubHeaderStyles';
import SubHeaderBackground from '../../../../assets/images/SubHeaderBackground.png'

function SubHeader() {

    return (
        <Container style={{
            backgroundImage: `url(${SubHeaderBackground})`
        }}>
            <DarkOverlay>
                <Title>Clasificacion Definitiva</Title>
            </DarkOverlay>
        </Container>

    );
}

export default SubHeader;
