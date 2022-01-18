import { memo } from 'react';
import { BodyText, SmallHeightDivider, StyledButtonOutlined } from '../../theme/Styles';
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

    const ProgressBar = ({ variant, percent }) => {
        return ( //VARIANTS : success,rejected,inProcess,actionRequired
            <ProgressBarContainer>
                <ProgressBarTitle variant={variant}>
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

            <RowContainer style={{ justifyContent: 'flex-start' }}>
                <BodyText>
                    Fecha: 24/12/2021
                </BodyText>
            </RowContainer>

            <RowContainer style={{ justifyContent: 'flex-start' }}>
                <BodyText>
                    Empresa: Construcciones K
                </BodyText>
            </RowContainer>

            <RowContainer style={{ justifyContent: 'flex-start' }}>
                <BodyText>
                    Solicitud No.:599595944
                </BodyText>
            </RowContainer>

            <RowContainer style={{ justifyContent: 'flex-start' }}>
                <BodyText>
                    Estado :En Proceso
                </BodyText>
            </RowContainer>

            <SmallHeightDivider />
            <RowContainer>
                <ProgressBar variant={variant} percent={percent} />
            </RowContainer>
            <SmallHeightDivider />
        </Container>
    );
}

export default memo(RequestCard);
