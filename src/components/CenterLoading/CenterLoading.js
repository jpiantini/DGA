import {memo} from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Container} from './styles/CenterLoadingStyles';

function CenterLoading() {
    return (

        <Container>
            <CircularProgress size='10em' />
        </Container>
    );
}

export default memo(CenterLoading);