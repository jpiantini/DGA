import { useLayoutEffect, useEffect, useState } from 'react';
import {
    SmallHeightDivider,
    StyledButton,
    MediumHeightDivider,
    SubTitle
} from '../../../theme/Styles';
import { useHistory } from 'react-router';
import { useDispatch } from "react-redux";
import { UpdateAppSubHeaderTitle, ShowGlobalLoading, HideGlobalLoading } from '../../../redux/actions/UiActions';
import {
    ButtonContainer,
    Container,
    StyledCheckCircleIcon,
    CenterContainer,
    StyledCancelIcon,
} from './styles/ActivateAccountStyles';
import { useSnackbar } from 'notistack';
import { useParams } from "react-router-dom";

function ActivateAccount() {
    const history = useHistory();
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    let { activationToken } = useParams();
    const [accountSuccessActivated, setAccountSuccessActivated] = useState()

    const handleAccountActivation = () => {
        dispatch(ShowGlobalLoading('Activando cuenta'));
        setTimeout(() => { //Mockup async timing for account activation
            if (activationToken === 'TOKEN') {
                setAccountSuccessActivated(true);
            } else {
                setAccountSuccessActivated(false);
            }
            dispatch(HideGlobalLoading());
        }, 3000);
    }


    useLayoutEffect(() => {
        handleAccountActivation();
        //UPDATE APP HEADER SUBTITLE
        dispatch(UpdateAppSubHeaderTitle('Activacion de cuenta')) // TITLE OF SUBHEADER APP
    }, []);

    useEffect(() => {
        
    }, []);

    return (
        <Container >
            <SmallHeightDivider />
            {
                accountSuccessActivated == undefined ? 
                null
                :
                <div>
                <CenterContainer>
                    
                    {
                      accountSuccessActivated? <StyledCheckCircleIcon /> : <StyledCancelIcon />
                    }
                    <SmallHeightDivider />
                    <SubTitle>
                    {
                      accountSuccessActivated? 
                      "¡Su cuenta ha sido activada satisfactoriamente!" 
                      :
                      "¡Enlace expirado!" 
                    }
                       
                    </SubTitle>
    
                </CenterContainer>
                <MediumHeightDivider />
                <MediumHeightDivider />
    
                <ButtonContainer>
                    <StyledButton onClick={() => history.push('/public')}>
                        Ir a inicio
                    </StyledButton>
    
                </ButtonContainer>
                </div>
            }
            <MediumHeightDivider />
            <MediumHeightDivider />

        </Container >
    );
}

export default ActivateAccount;