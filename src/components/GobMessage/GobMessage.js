import {memo} from 'react';
import { Container, TextContainer, Text, URLDivider, Image, LinkText, LineContainer } from './styles/GobMessageStyles';
import EscudoRD from '../../assets/images/EscudoRD.png'

function GobMessage() {


    return (
        <Container >
            <LineContainer>
            <TextContainer>
                <Text >
                    {'Este sitio pertenece al Ministerio de Turismo de la Republica Dominicana | Visitar el sitio oficial \r\n'}
                    <LinkText href='http://www.mitur.gob.do'>www.mitur.gob.do</LinkText>
                </Text>
            </TextContainer>
            <Image src={EscudoRD} />
            </LineContainer>
        </Container>
    );
}

export default memo(GobMessage);
