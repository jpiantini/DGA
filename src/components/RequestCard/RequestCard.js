import { memo, useEffect, useState } from 'react';
import { BodyText, SmallHeightDivider, StyledButtonOutlined } from '../../theme/Styles';
import { replaceGuionToSlashFromString } from '../../utilities/functions/StringUtil';
import { statusColors, variantStatus } from './RequestCardConstants';
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

function RequestCard({ statusID, title, date, approvalNumber, requestCode, status, onClick, percent, actionRequired, solution, solutionColor, paymentData }) {

    const [localVariant, setLocalVariant] = useState(
        variantStatus.find((variant) => status === variant.id)
    );

    useEffect(() => {
        if(localVariant == undefined){
            setLocalVariant(variantStatus[2])
        }
    }, [localVariant]);
    /*
        if(localVariant == undefined){
            localVariant = "inProcess";
        }
    */
    return (
        <Container >
            <SmallHeightDivider />
            <SmallHeightDivider />
            {
                actionRequired != undefined &&
                <RowContainer>
                    <IconContainer>
                        <StyledWarningIcon />
                    </IconContainer>

                    <ActionRequiredTitle >
                        Esta solicitud requiere de tu acción para continuar.
                    </ActionRequiredTitle>
                </RowContainer>
            }

            {
                solution != undefined &&
                <RowContainer>
                    <IconContainer>
                        <StyledWarningIcon customColor={statusColors[solutionColor]} />
                    </IconContainer>

                    <ActionRequiredTitle >
                        {solution}.
                    </ActionRequiredTitle>
                </RowContainer>
            }

            <RowContainer style={{ justifyContent: 'space-between' }}>
                <Title>{title}</Title>
                <ButtonContainer>
                    <StyledButtonOutlined onClick={onClick} variant="outlined">
                        {actionRequired != undefined ?
                            'COMPLETAR' : 'VER DETALLE'
                        }
                    </StyledButtonOutlined>
                </ButtonContainer>
            </RowContainer>

            <RowContainer style={{ justifyContent: 'flex-start' }}>
                <BodyText>
                    Fecha: {new Date(replaceGuionToSlashFromString(date)).toLocaleDateString()}
                </BodyText>
            </RowContainer>
            {
                requestCode !== null &&
                <RowContainer style={{ justifyContent: 'flex-start' }}>
                    <BodyText>
                        Solicitud No.: {requestCode}
                    </BodyText>
                </RowContainer>

            }

            {approvalNumber != undefined ?
                <RowContainer style={{ justifyContent: 'flex-start' }}>
                    <BodyText>
                        Numero de aprobación: {approvalNumber}
                    </BodyText>
                </RowContainer>
                :
                <RowContainer style={{ justifyContent: 'flex-start' }}>
                    <BodyText>
                        Monto: {paymentData.payment_amount === '0.00' ?
                            "Gratis" : `DOP${paymentData.payment_amount}`}
                    </BodyText>
                </RowContainer>
            }

            <RowContainer style={{ justifyContent: 'flex-start' }}>
                <BodyText>
                    Estado : {status}
                </BodyText>
            </RowContainer>

            <SmallHeightDivider />
            <RowContainer>
                <ProgressBarContainer>
                    <ProgressBarTitle variant={localVariant?.variant}>
                        {   //STATUSID 8 IS REJECTED and 10 is canceled
                            statusID == 8 ?
                                'RECHAZADO'
                                :
                                statusID == 10 ?
                                    'CANCELADO'
                                    :
                                    percent + ' COMPLETADO'
                        }
                    </ProgressBarTitle>
                    <ProgressBarPercent variant={localVariant?.variant} percent={statusID == 8 || statusID == 10 ? '100' : percent} />
                </ProgressBarContainer>
            </RowContainer>
            <SmallHeightDivider />
        </Container>
    );
}

export default memo(RequestCard);
