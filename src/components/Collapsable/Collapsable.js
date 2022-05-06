import { useState, memo } from 'react';
import {
    Title,
    Container,
    ItemsContainer,
    RowContainer,
    BodyText
} from './styles/CollapsableStyles';
import Icon from '@mui/material/Icon';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
                    {
                        open ?
                        <ExpandLessIcon sx={{ fontSize: '40px' }}/>
                        :
                        <ExpandMoreIcon sx={{ fontSize: '40px' }}/>
                    }
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