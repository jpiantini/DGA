import { styled } from '@mui/system';
import COLORS from '../../../../theme/Colors';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column',
});

export const ButtonsContainer = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between'
});

export const ButtonContainer = styled('div')({
    width: '30%',
});

export const StyledCheckCircleIcon = styled(CheckCircleIcon)({
    color: COLORS.success,
    '@media (min-width:320px)': {
        fontSize: '150px',
    },
    '@media (min-width:768px)': {
        fontSize: '200px',
    },
    '@media (min-width:1200px)': {
        fontSize: '250px',
    }
});