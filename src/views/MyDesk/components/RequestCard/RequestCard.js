import { Fragment, useRef } from 'react';
import { SmallHeightDivider, StyledButtonOutlined } from '../../../../theme/Styles';
import { useContainerDimensions } from '../../../../utilities/hooks/useContainerDimensions/useContainerDimensions';
import {
    Container,
    RowContainer,
    ActionRequiredTitle,
    StyledWarningIcon,
    IconContainer,
    Title,
    ButtonContainer,
    ProgressBarContainer,
    ProgressBarPercent,
    ProgressBarTitle
} from './styles/RequestCardStyles';

function RequestCard({ variant,title, onClick,percent, actionRequired }) {

    const widthRef = useRef(null);
    const { width } = useContainerDimensions(widthRef);

    const ProgressBar = ({variant,percent}) => {
        return ( //VARIANTS : completed,rejected,inProcess
            <ProgressBarContainer ref={widthRef}>
                <ProgressBarTitle width={width} variant={variant}>
                        {
                        variant != 'rejected' ? 
                        percent + ' COMPLETADO'
                        :
                        'RECHAZADO'
                        }
                </ProgressBarTitle>
                <ProgressBarPercent variant={variant} percent={percent} />
            </ProgressBarContainer>
        )
    }

    return (
        <Fragment>
            <SmallHeightDivider />
        <Container >
            <SmallHeightDivider />
            {
                actionRequired &&
                <RowContainer>
                    <IconContainer>
                        <StyledWarningIcon />
                    </IconContainer>

                    <ActionRequiredTitle >
                        Esta solicitud requiere de tu acción para continuar.
                    </ActionRequiredTitle>
                </RowContainer>
            }

            <RowContainer style={{ justifyContent: 'space-between' }}>
                <Title>{title}</Title>
                <ButtonContainer>
                    <StyledButtonOutlined onClick={onClick} variant="outlined">
                        {actionRequired ? 'COMPLETAR' : 'VER DETALLE'}
                    </StyledButtonOutlined>
                </ButtonContainer>
            </RowContainer>

            <SmallHeightDivider />
            <RowContainer>
                <ProgressBar variant={variant} percent={percent}/>
            </RowContainer>
            <SmallHeightDivider />

        </Container>
        </Fragment>
    );
}

export default RequestCard;
