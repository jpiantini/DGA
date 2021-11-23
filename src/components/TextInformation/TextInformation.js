import * as React from 'react';
import {
    Title,
    Container,
    LineDivider,
} from './styles/TextInformationStyles';
import { BodyText } from '../../theme/Styles';
function TextInformation({ title, content }) {


    return (
        <Container>
            <Title>{title}</Title>
            <LineDivider />
            {
                content &&
                <BodyText style={{marginTop:'10px',marginBottom:'10px'}}>
                    {content}
                </BodyText>
           }
        </Container>
    );
}

export default TextInformation;