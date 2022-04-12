import { useLayoutEffect, useEffect, useState } from 'react';
import {
    SmallHeightDivider,
    StyledButton,
    MediumHeightDivider,
    SubTitle,
    StyledCheckCircleIcon,
    StyledCancelIcon
} from '../../theme/Styles';
import { useHistory } from 'react-router';
import { useDispatch } from "react-redux";
import { UpdateAppSubHeaderTitle, ShowGlobalLoading, HideGlobalLoading } from '../../redux/actions/UiActions';
import {
    ButtonContainer,
    ButtonsContainer,
    Container,
    CenterContainer,
} from './styles/ValidatePaymentStyles';
import { useParams } from "react-router-dom";
import { paymentValidation } from '../../api/ValidatePayment';
import { useSnackbar } from 'notistack';

function ValidatePayment() {
    const history = useHistory();
    const dispatch = useDispatch();
    let { requestID } = useParams();
    const { enqueueSnackbar } = useSnackbar();

    const [paymentSuccess, setPaymentSuccess] = useState()

    const handlePaymentValidation = async () => {
        try {
            dispatch(ShowGlobalLoading('Verificando pago'));
            const urlParams = new URLSearchParams(window.location.search)
            let data;
            if (urlParams.has('numAprobacion') && urlParams.has('idAutorizacionPortal')) {
                data = {
                    requestId: requestID,
                    numAprobacion: urlParams.get('numAprobacion'),
                    idAutorizacionPortal: urlParams.get('idAutorizacionPortal'),
                }
                let response = await paymentValidation(data)
                if (response.success) {
                    setPaymentSuccess(true);
                    dispatch(HideGlobalLoading());
                } else {
                    setPaymentSuccess(false);
                    dispatch(HideGlobalLoading());
                }
            } else {
                //         history.push(`/app/serviceRequestedDetails/${requestID}`)
                setPaymentSuccess(false);
                dispatch(HideGlobalLoading());
            }
        } catch (error) {
            setPaymentSuccess(true);
            //     enqueueSnackbar('Ha ocurrido un error, contacte a soporte', { variant: 'error' });
            //      history.push(`/app/serviceRequestedDetails/${requestID}`)
            //This time is for test because the backend call is canceled for the time
            setTimeout(() => {
                dispatch(HideGlobalLoading());
            }, 180000);
        }
    }

    useLayoutEffect(() => {
        //UPDATE APP HEADER SUBTITLE
        dispatch(UpdateAppSubHeaderTitle('Verificacion de pago')) // TITLE OF SUBHEADER APP
    }, []);

    useEffect(() => {
        handlePaymentValidation();
    }, []);

    return (
        <Container >
            <SmallHeightDivider />
            {
                paymentSuccess == undefined ?
                    null
                    :
                    <CenterContainer>
                        {
                            paymentSuccess ? <StyledCheckCircleIcon /> : <StyledCancelIcon />
                        }
                        <SmallHeightDivider />
                        <SubTitle>
                            {
                                paymentSuccess ?
                                    "¡Pago realizado satisfactoriamente!"
                                    :
                                    "¡Ha ocurrido un error durante la validacion del pago!"
                            }

                        </SubTitle>
                        <MediumHeightDivider />
                        <MediumHeightDivider />
                        <ButtonsContainer>
                            <ButtonContainer>
                                <StyledButton onClick={() => history.push('/app/myDesk')}>
                                    Ir a mi escritorio
                                </StyledButton>
                            </ButtonContainer>
                            <ButtonContainer>
                                <StyledButton onClick={() => history.push(`/app/serviceRequestedDetails/${requestID}`)}>
                                    Ver detalle de solicitud
                                </StyledButton>
                            </ButtonContainer>
                        </ButtonsContainer>
                    </CenterContainer>
            }
            <MediumHeightDivider />
            <MediumHeightDivider />

        </Container >
    );
}

export default ValidatePayment;