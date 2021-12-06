import { useState, useLayoutEffect, Fragment } from 'react';
import TextInformation from '../../../../components/TextInformation/TextInformation';
import { MediumHeightDivider, SmallHeightDivider } from '../../../../theme/Styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
    ButtonContainer,
    CardContainer,
    Container,
} from '../../styles/ServiceRequestedDetailsStyles';
import { MockupPayments } from './PaymentsConstants';
import { Grid } from '@mui/material';
import { ImageContainer, LogoImage } from '../../styles/ServiceRequestedDetailsStyles';


function Payment() {
    const matchesWidth = useMediaQuery('(min-width:768px)');
    const history = useHistory();
    let { serviceID, requestID } = useParams();
    const dispatch = useDispatch();
    const { authenticated } = useSelector((state) => state.authReducer);


    return (
        <Container >

            <TextInformation title="Pagar impuesto de servicio" />
            <SmallHeightDivider />
            <SmallHeightDivider />
            <Grid alignItems="center" justifyContent="space-around" container direction="row" spacing={{ xs: 2, md: 3 }} columns={{ xs: 6, sm: 8, md: 12 }}>
                <Grid item xs={6} sm={4} md={4}>
                    <ImageContainer onClick={() => alert('click')}>
                        <LogoImage src="https://www.sirite.gob.do/o/sirit-theme-1.20190411.66/images/sirit/sirit-logo.png" />
                    </ImageContainer>
                </Grid>

                <Grid item xs={6} sm={4} md={4}>
                    <ImageContainer onClick={() => alert('click')}>
                        <LogoImage src="https://www.cardnet.com.do/capp/images/logo_nuevo_x_2.png" />
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
                            <Grid alignItems="center" justifyContent="space-around" container direction="row" spacing={{ xs: 2, md: 3 }} columns={{ xs: 6, sm: 8, md: 12 }}>
                                <Grid item xs={6} sm={4} md={4}>
                                    <p>
                                        {payment.requestName}
                                    </p>
                                </Grid>

                                <Grid item xs={6} sm={4} md={4}>
                                    <p>
                                        {payment.confirmationID}
                                    </p>
                                </Grid>

                                <Grid item xs={6} sm={4} md={4}>
                                    <p>
                                        {payment.amount}
                                    </p>
                                </Grid>

                                <Grid item xs={6} sm={4} md={4}>
                                    <p>
                                        {payment.date}
                                    </p>
                                </Grid>

                            </Grid>
                        </CardContainer>
                        <SmallHeightDivider />

                    </Fragment>


                ))
            }

        </Container>
    );
}

export default Payment;
