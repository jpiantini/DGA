import { useState, memo } from 'react';
import {
    Title,
    Container,
    ItemsContainer,
    RowContainer,
    BodyText
} from './styles/CollapsableStyles';
import Icon from '@mui/material/Icon';
import { SmallHeightDivider } from '../../theme/Styles';
function Collapsable({ title, content }) {

    const [open, setOpen] = useState(false);

    const handleOnClick = () => {
        setOpen(!open);
    }
    return (
        <Container onClick={handleOnClick}>
            <ItemsContainer>
                <RowContainer>
                    <Title>{title}</Title>
                    <Icon style={{ fontSize: '40px' }}>{open ? 'expand_less' : 'expand_more'}</Icon>
                </RowContainer>
                {
                    open &&
                    <BodyText>
                        {content}
                    </BodyText>
                }
            </ItemsContainer>
            <div style={{ height: '5px' }} />
        </Container>
    );
}

export default memo(Collapsable);