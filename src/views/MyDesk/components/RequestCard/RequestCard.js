import { Fragment, useRef, useEffect } from 'react';
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

function RequestCard({ variant, title, onClick, percent }) {

    const widthRef = useRef(null);
    const { width } = useContainerDimensions(widthRef);

    useEffect(() => {

    }, [width]);

    const ProgressBar = ({ variant, percent }) => {
        return ( //VARIANTS : success,rejected,inProcess,actionRequired
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
            <Container >
                <SmallHeightDivider />
                <SmallHeightDivider />
                {
                    variant === 'actionRequired' &&
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
                            {variant === 'actionRequired' ?
                                'COMPLETAR' : 'VER DETALLE'
                            }
                        </StyledButtonOutlined>
                    </ButtonContainer>
                </RowContainer>

                <SmallHeightDivider />
                <RowContainer>
                    <ProgressBar variant={variant} percent={percent} />
                </RowContainer>
                <SmallHeightDivider />
            </Container>
    );
}

export default RequestCard;
