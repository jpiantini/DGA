import { useLayoutEffect, useEffect, useState } from 'react';
import {
    SmallHeightDivider,
    StyledButton,
    MediumHeightDivider,
    SubTitle,
    StyledCheckCircleIcon,
    StyledCancelIcon
} from '../../../theme/Styles';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from "react-redux";
import { UpdateAppSubHeaderTitle, ShowGlobalLoading, HideGlobalLoading } from '../../../redux/actions/UiActions';
import {
    ButtonContainer,
    Container,
    CenterContainer,
} from './styles/ActivateAccountStyles';
import { useParams } from "react-router-dom";
import { confirmAccount } from '../../../api/ActivateAccount';

function ActivateAccount() {
    const history = useHistory();
    const dispatch = useDispatch();
    const { authenticated } = useSelector((state) => state.authReducer);
    let { activationToken } = useParams();

    const [accountSuccessActivated, setAccountSuccessActivated] = useState()

    const handleAccountActivation = async () => {
        dispatch(ShowGlobalLoading('Activando cuenta'));
        let response = await confirmAccount(activationToken);
        if (response.success) {
            setAccountSuccessActivated(true);
        } else {
            setAccountSuccessActivated(false);
        }
        dispatch(HideGlobalLoading());
    }

    useLayoutEffect(() => {
        //UPDATE APP HEADER SUBTITLE
        dispatch(UpdateAppSubHeaderTitle('Activacion de cuenta')) // TITLE OF SUBHEADER APP
    }, []);

    useEffect(() => {
        if(authenticated){
            history.push('/app/myDesk')
            return;
        }
        handleAccountActivation();
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
                                accountSuccessActivated ? <StyledCheckCircleIcon /> : <StyledCancelIcon />
                            }
                            <SmallHeightDivider />
                            <SubTitle>
                                {
                                    accountSuccessActivated ?
                                        "¡Su cuenta ha sido activada satisfactoriamente!"
                                        :
                                        "Ha ocurrido un error!"
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