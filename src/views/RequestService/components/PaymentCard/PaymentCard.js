import { memo, useState } from 'react';
import RadioButtonGroup from '../../../../components/RadioButtonGroup/RadioButtonGroup';
import TextField from '../../../../components/TextField/TextField';
import { SmallHeightDivider } from '../../../../theme/Styles';
import { priceVariationToLaborableTime } from '../../../../utilities/functions/FormatterUtil';
import {
    Container, Header, HeaderSubTitle, HeaderTitle, BodyTitle, Body, BodySubTitle, ButtonsContainer, CardButton
} from './styles/PaymentCardStyles';

function PaymentCard({ title, onClick, variations }) {

    const [servicePrice, setServicePrice] = useState(variations?.[0]?.price);

    const [selectedVariation, setSelectedVariation] = useState(variations?.[0]);
    const [quantityForRequest, setQuantityForRequest] = useState(1);



    const variationsForCheckGroup = variations?.map((variation) => {
        return {
            label: `${variation.concept} ($${variation.price})`,
            value: variation.id,
            //maxValue: variation.
        }
    })
    /* THIS FUNCTIONS IS REMOVED BECAUSE ON THIS PROJECT ONLY HAVE 1 PRICE WITH VARIATIONS USER CANT PUT AMOUNTS FOR CALCS
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
    */

    const handleRadioChange = (value) => {
        const variation = variations.find((variation) => variation.id == value);
        const selectedVariationPrice = variation?.price
        setServicePrice(selectedVariationPrice);
        setSelectedVariation(variation);

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
                                onChange={(e) => handleRadioChange(e.target.value)} value={selectedVariation?.id} />

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
                            {priceVariationToLaborableTime(variations?.find((variation) => variation.id == selectedVariation?.id)?.delivery_time)}
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
