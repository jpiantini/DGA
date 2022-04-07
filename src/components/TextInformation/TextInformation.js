import {memo} from 'react';
import {
    Title,
    Container,
    LineDivider,
} from './styles/TextInformationStyles';
import { BodyText, Row } from '../../theme/Styles';

function TextInformation({ title,rightTitle, content }) {
    return (
        <Container>
            <Row style={{width:'100%',justifyContent:'space-between'}}>
            <Title>{title}</Title>
            <Title>{rightTitle}</Title>
            </Row>
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

export default memo(TextInformation);