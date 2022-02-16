import { Fragment } from 'react';
import TextInformation from '../../../../components/TextInformation/TextInformation';
import {
    SmallHeightDivider,
    CardBodyText,
    CardContainer,
    CardTextContainer,
    CardBodyTitle
} from '../../../../theme/Styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
    Container,
} from '../../styles/ServiceRequestedDetailsStyles';
import { MockupPayments } from './PaymentsConstants';
import { Grid } from '@mui/material';
import { ImageContainer, LogoImage } from '../../styles/ServiceRequestedDetailsStyles';


function Payment() {

    const handleSiritePayment = () => {

        const siritePaymentConfig = {
            codigoCentroRecaudacion: "0018",
            codigoServicio: "0251",
            montoServicio: 2500,
            nombre: "Juan Daniel Beato",
            numeroDocumento: "40212345671",
            tipoDocumento: "C",
            medioPago: "PagoEnLinea",
            idAutorizacionPortal: "010101",
            urlRetorno: "http://127.0.0.1:3000/app/validatePayment",
        }

        let form = document.createElement('form');
        form.style.display = 'none'
        form.action = 'https://prw-psp-1.hacienda.gob.do/pasarela-pago/transaccion';
        form.method = 'POST';
        //  form.target = 'blank';

        let siriteConfigKeys = Object.keys(siritePaymentConfig)
        siriteConfigKeys.forEach((key, index) => {
            const input = document.createElement('input')
            input.name = key
            input.value = siritePaymentConfig[key]
            form.appendChild(input)
        })
        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);
    }


    return (
        <Container >
            <TextInformation title="Pagar impuesto de servicio" />
            <SmallHeightDivider />
            <SmallHeightDivider />
            <Grid alignItems="center" justifyContent="space-around" container direction="row" spacing={{ xs: 2, md: 3 }} columns={{ xs: 6, sm: 8, md: 12 }}>
                <Grid item xs={6} sm={4} md={4}>
                    <ImageContainer onClick={() => handleSiritePayment()}>
                        <LogoImage src="https://www.sirite.gob.do/o/sirit-theme-1.20190411.66/images/sirit/sirit-logo.png" />
                    </ImageContainer>
                </Grid>
            </Grid>
            <SmallHeightDivider />
            <SmallHeightDivider />
            <TextInformation title="Mis pagos" />
            <SmallHeightDivider />

            {
                MockupPayments.map((payment) => (
                    <Fragment>
                        <CardContainer>
                            <CardTextContainer>
                                <Grid alignItems="flex-start" justifyContent="flex-start" container direction="row" spacing={{ xs: 2, md: 3 }} columns={{ xs: 6, sm: 8, md: 12 }}>
                                    <Grid item xs={6} sm={4} md={4}>
                                        <CardBodyTitle>
                                            Pago
                                        </CardBodyTitle>
                                        <CardBodyText>
                                            {payment.requestName}
                                        </CardBodyText>
                                    </Grid>

                                    <Grid item xs={6} sm={4} md={4}>
                                        <CardBodyTitle>
                                            ID de pago
                                        </CardBodyTitle>
                                        <CardBodyText>
                                            {payment.confirmationID}
                                        </CardBodyText>
                                    </Grid>

                                    <Grid item xs={6} sm={4} md={4}>
                                        <CardBodyTitle>
                                            Monto pagado
                                        </CardBodyTitle>
                                        <CardBodyText>
                                            {payment.amount}
                                        </CardBodyText>
                                    </Grid>

                                    <Grid item xs={6} sm={4} md={4}>
                                        <CardBodyTitle>
                                            Fecha de pago
                                        </CardBodyTitle>
                                        <CardBodyText>
                                            {payment.date}
                                        </CardBodyText>
                                    </Grid>

                                </Grid>
                            </CardTextContainer>
                        </CardContainer>
                        <SmallHeightDivider />
                    </Fragment>
                ))
            }

        </Container>
    );
}

export default Payment;
