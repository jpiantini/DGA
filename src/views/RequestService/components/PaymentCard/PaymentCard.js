import { memo } from 'react';
import { numberToStringLaborableTime } from '../../../../utilities/functions/FormatterUtil';
import {
    Container, Header, HeaderSubTitle, HeaderTitle, BodyTitle, Body,BodySubTitle,ButtonsContainer,CardButton
} from './styles/PaymentCardStyles';

function PaymentCard({ title, price,time,onClick,variations }) {


    

    const filterTime = () => {
        if (time.hours > 0 && time.days > 0 && time.months > 0){
            return `${'a'}`
        }
    }

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
