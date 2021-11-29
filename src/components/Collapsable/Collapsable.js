import { useState } from 'react';
import {
    Title,
    Container,
    ItemsContainer,
    RowContainer,
    BodyText
} from './styles/CollapsableStyles';
import Icon from '@mui/material/Icon';

function Collapsable({ title, content }) {

    const [open, setOpen] = useState(false);

    const handleOnClick = () => {
        setOpen(!open);
    }
    return (
        <Container onClick={handleOnClick}>
            <ItemsContainer open={open}>
                <RowContainer>
                    <Title>{title}</Title>
                    <Icon style={{ fontSize: '40px'}}>{open ? "expand_less" : "expand_more"}</Icon>
                </RowContainer>

                    <BodyText open={open}>
                        {content}
                    </BodyText>
           
            </ItemsContainer>
        </Container>
    );
}

export default Collapsable;