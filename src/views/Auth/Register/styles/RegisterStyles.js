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

export const PaymentMethodsContainer = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between'


});

export const ImageContainer = styled('div')({
    position:'relative',
    display:'flex',
    flexDirection:'column',
    width: '100%',
    minHeight:'250px',
    border:` 1px solid ${COLORS.secondary}`,
    alignItems:'center',
    justifyContent:'center',
    cursor : 'pointer',
    '@media (min-width:320px)': {
        width: '100%',
    },
    '@media (min-width:768px)': {
        width: '100%',
    },
    '@media (min-width:1200px)': {
        width: '350px',
    },
    '&:hover':{
        boxShadow: '0 8px 10px 0 rgba(0, 0, 0, 0.4), 0 6px 20px 0 rgba(0, 0, 0, 0.30)',
        borderColor: COLORS.primary,
    }
});

export const LogoImage = styled('img')({
    width: '80%',
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