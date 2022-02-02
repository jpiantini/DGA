import { useLayoutEffect, useEffect, useState } from 'react';
import {
    SmallHeightDivider,
    StyledButton,
    MediumHeightDivider,
    SubTitle
} from '../../theme/Styles';
import { useHistory } from 'react-router';
import { useDispatch } from "react-redux";
import { UpdateAppSubHeaderTitle, ShowGlobalLoading, HideGlobalLoading } from '../../redux/actions/UiActions';
import {
    ButtonContainer,
    Container,
    StyledCheckCircleIcon,
    CenterContainer,
    StyledCancelIcon,
} from './styles/ValidatePaymentStyles';

function ValidatePayment() {
    const history = useHistory();
    const dispatch = useDispatch();
    const [paymentSuccess, setPaymentSuccess] = useState()

    const handlePaymentValidation = () => {
        dispatch(ShowGlobalLoading('Verificando pago'));
        const urlParams = new URLSearchParams(window.location.search)
        let data;
        if (urlParams.has('numAprobacion') && urlParams.has('idAutorizacionPortal')) {
            data = {
                numero_aprobacion: urlParams.get('numAprobacion'),
                id_autorizacion_portal: urlParams.get('idAutorizacionPortal'),
            }
            setTimeout(() => { //Mockup async timing for SEND POST TO BACKEND AND IF SUCCESS
                setPaymentSuccess(true);
                dispatch(HideGlobalLoading());
            }, 3000);
        } else {
            setPaymentSuccess(false);
            dispatch(HideGlobalLoading());
        }
    }

    useLayoutEffect(() => {
        //UPDATE APP HEADER SUBTITLE
        dispatch(UpdateAppSubHeaderTitle('Verificacion de pago')) // TITLE OF SUBHEADER APP
    }, []);

   useEffect(() => {
        handlePaymentValidation();
    },[]);

    return (
        <Container >
            <SmallHeightDivider />
            {
                paymentSuccess == undefined ?
                    null
                    :
                    <div>
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

                        </CenterContainer>
                        <MediumHeightDivider />
                        <MediumHeightDivider />

                        <ButtonContainer>
                            <StyledButton onClick={() => history.push('/app/myDesk')}>
                                Ir a mi escritorio
                            </StyledButton>

                        </ButtonContainer>
                    </div>
            }
            <MediumHeightDivider />
            <MediumHeightDivider />

        </Container >
    );
}

export default ValidatePayment;