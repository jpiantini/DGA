import { styled } from '@mui/system';
import COLORS from '../../../../theme/Colors';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

export const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column',
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

export const StyledCancelIcon = styled(CancelIcon)({
    color: COLORS.error,
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



export const CenterContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    alignSelf: 'center',
    alignItems: 'center'
});