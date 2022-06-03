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
import GlobalLoading from '../../components/GlobalLoading/GlobalLoading'

function ValidatePayment() {
    const history = useHistory();
    const dispatch = useDispatch();
    let { requestID } = useParams();
    const { enqueueSnackbar } = useSnackbar();

    const [paymentSuccess, setPaymentSuccess] = useState()
    const [isLoading, setIsLoading] = useState(true);

    const handlePaymentValidation = async () => {
        try {
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
                    setIsLoading(false);
                } else {
                    setPaymentSuccess(false);
                    setIsLoading(false);
                }
            } else {
                //history.push(`/app/serviceRequestedDetails/${requestID}`)
                setPaymentSuccess(false);
                setIsLoading(false);
            }
        } catch (error) {
            setPaymentSuccess(false);
            enqueueSnackbar('Ha ocurrido un error, contacte a soporte', { variant: 'error' });
            //history.push(`/app/serviceRequestedDetails/${requestID}`)
            setIsLoading(false);
        }
    }

    useLayoutEffect(() => {
        //UPDATE APP HEADER SUBTITLE
        dispatch(UpdateAppSubHeaderTitle('Verificacion de pago')) // TITLE OF SUBHEADER APP
        handlePaymentValidation();
    }, []);

    return (
        <Container >
            <GlobalLoading showByProp={isLoading} textByProp={"Verificando pago"} />
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
                                    "¡Pago realizado satisfactoriamente! Los cambios se reflejara en unos minutos."
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