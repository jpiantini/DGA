import { memo, useState } from 'react';
import RadioButtonGroup from '../../../../components/RadioButtonGroup/RadioButtonGroup';
import TextField from '../../../../components/TextField/TextField';
import { SmallHeightDivider } from '../../../../theme/Styles';
import { numberToStringLaborableTime } from '../../../../utilities/functions/FormatterUtil';
import {
    Container, Header, HeaderSubTitle, HeaderTitle, BodyTitle, Body, BodySubTitle, ButtonsContainer, CardButton
} from './styles/PaymentCardStyles';

function PaymentCard({ title, price, onClick, variations }) {

    const [servicePrice, setServicePrice] = useState(variations?.[0]?.price);

    const [selectedVariation, setSelectedVariation] = useState(variations?.[0]?.id);
    const [quantityForRequest, setQuantityForRequest] = useState(1);



    const variationsForCheckGroup = variations?.map((variation) => {
        return {
            label: `${variation.concept} ($${variation.price})`,
            value: variation.id,
            //maxValue: variation.
        }
    })

    const getVariationTime = (variation) => {
        if (variation.months > 0 && variation.days > 0) {
            return `${variation.months} Meses y ${variation.days} días laborables`
        }
        if (variation.days > 0 && variation.hours > 0) {
            return `${variation.days} Días y ${variation.hours} horas laborables`
        }
        if (variation.months > 0) {
            return `${variation.months} Meses laborables`
        }
        if (variation.days > 0) {
            return `${variation.days} Días laborables`
        }
        if (variation.hours > 0) {
            return `${variation.hours} Horas laborables`
        }
    }

    const handleValueChange = (value) => {
        const selectedVariationPrice = variations.find((variation) => variation.id == selectedVariation)?.price;
        setServicePrice(value * selectedVariationPrice)
        setQuantityForRequest(value)
    }

    const handleRadioChange = (value) => {
        const selectedVariationPrice = variations.find((variation) => variation.id == value)?.price;
        setServicePrice(quantityForRequest * selectedVariationPrice);
        setSelectedVariation(value);

    }

    return (
        <Container>
            <Header>
                <HeaderSubTitle>
                    {title}
                </HeaderSubTitle>
                <HeaderTitle>
                    RD${servicePrice}
                </HeaderTitle>
            </Header>
            <Body>
                {
                    variations.length > 1 ?
                        <div>
                            <SmallHeightDivider />
                            <RadioButtonGroup options={variationsForCheckGroup} title="Opciones de servicio" helperText={null}
                                onChange={(e) => handleRadioChange(e.target.value)} value={selectedVariation} />
                        
                           {/* <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <strong>
                                    <BodySubTitle>
                                        Especifique cantidad a solicitar
                                    </BodySubTitle>
                                </strong>
                                <div style={{ width: '15px' }} />
                                <div style={{ width: '60px' }}>
                                    <TextField value={quantityForRequest} onChange={(e) => handleValueChange(e.target.value)} type="number" />
                                </div>
                            </div>*/}
                        </div>

                        :
                        null
                }
                <SmallHeightDivider />
                <div>
                    <BodySubTitle>Tiempo de entrega</BodySubTitle>
                    <strong>
                        <BodyTitle>
                            {getVariationTime(variations?.find((variation) => variation.id == selectedVariation)?.delivery_time)}
                        </BodyTitle>
                    </strong>
                </div>
                <SmallHeightDivider />
            </Body>
            <ButtonsContainer>
                <CardButton onClick={() => onClick(selectedVariation)}>Confirmar</CardButton>
            </ButtonsContainer>
        </Container>
    );
}

export default memo(PaymentCard);
