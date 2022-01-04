import { useLayoutEffect, useEffect } from 'react';
import {
    SmallHeightDivider,
    StyledButton,
    MediumHeightDivider,
    SubTitle
} from '../../../theme/Styles';
import { useHistory } from 'react-router';
import { useDispatch } from "react-redux";
import { UpdateAppSubHeaderTitle } from '../../../redux/actions/UiActions';
import {
    ButtonContainer,
    Container,
    StyledCheckCircleIcon,
    CenterContainer,
} from './styles/ActivateAccountStyles';
import { useSnackbar } from 'notistack';
import { useParams } from "react-router-dom";

function ActivateAccount() {
    const history = useHistory();
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    let { activationToken } = useParams();

    useLayoutEffect(() => {
        //UPDATE APP HEADER SUBTITLE
        dispatch(UpdateAppSubHeaderTitle('Activacion de cuenta')) // TITLE OF SUBHEADER APP
    }, []);

    useEffect(() => {

    }, []);


    return (
        <Container >
            <SmallHeightDivider />

            <CenterContainer>
                <StyledCheckCircleIcon />
                <SmallHeightDivider />
                <SubTitle>
                    ¡Su cuenta ha sido activada satisfactoriamente!
                </SubTitle>

            </CenterContainer>
            <MediumHeightDivider />
            <MediumHeightDivider />

            <ButtonContainer>
                <StyledButton onClick={() => history.push('/public')}>
                    Ir a inicio
                </StyledButton>

            </ButtonContainer>
            <MediumHeightDivider />
            <MediumHeightDivider />

        </Container >
    );
}

export default ActivateAccount;