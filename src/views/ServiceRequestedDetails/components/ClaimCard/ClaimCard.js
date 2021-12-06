import { memo } from 'react';
import { BodyText, SmallHeightDivider} from '../../../../theme/Styles';
import {
    Container,
    Title,
    SubTitle
} from './styles/ClaimCardStyles';

function ClaimCard({ claimID, date,claimReason,claimMessage }) {

    return (
        <Container >
            <SmallHeightDivider />
            <Title>Reclamación no. {claimID}</Title>
            <SubTitle>{date}</SubTitle>
            <BodyText>{claimReason}</BodyText>
            <BodyText>{claimMessage}</BodyText>
            <SmallHeightDivider />
        </Container>
    );
}

export default memo(ClaimCard);
