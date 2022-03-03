import { memo } from 'react';
import {
    Container, Header, HeaderSubTitle, HeaderTitle, BodyTitle, Body,BodySubTitle,ButtonsContainer,CardButton
} from './styles/PaymentCardStyles';

function PaymentCard({ title, price, time, onClick }) {
    return (
        <Container>
            <Header>
                <HeaderSubTitle>
                    {title}
                </HeaderSubTitle>
                <HeaderTitle>
                    RD${price}
                </HeaderTitle>
            </Header>
            <Body>
                <BodySubTitle>Tiempo de entrega</BodySubTitle>
                <strong>
                    <BodyTitle>
                        {time}
                    </BodyTitle>
                </strong>
            </Body>
            <ButtonsContainer>
                <CardButton onClick={onClick}>Confirmar</CardButton>
            </ButtonsContainer>
        </Container>
    );
}

export default memo(PaymentCard);
