import { useState } from 'react';
import {
    Title,
    Container,
    ItemsContainer,
    RowContainer
} from './styles/CollapsableStyles';
import { BodyText } from '../../theme/Styles';
import Icon from '@mui/material/Icon';

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
                    <Icon style={{ fontSize: '40px'}}>{open ? "expand_less" : "expand_more"}</Icon>
                </RowContainer>

                {
                    open &&
                    <BodyText>
                        {content}
                    </BodyText>
                }
            </ItemsContainer>
        </Container>
    );
}

export default Collapsable;