import { styled } from '@mui/system';
import COLORS from '../../../theme/Colors';
import { boxShadowConfig } from '../../../theme/Styles';

export const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    '@media (min-width:320px)': {
        width: '320px',
    },
    '@media (min-width:768px)': {
        width: "768px",
    },
    '@media (min-width:1200px)': {
        width: "1000px",
    },
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
        boxShadow: boxShadowConfig,
        borderColor: COLORS.primary,
    }
});

export const LogoImage = styled('img')({
    width: '80%',
});

export const SuccessContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    alignSelf: 'center',
    alignItems: 'center'
});

export const PricesContainer = styled('div')({
    display:'flex',
    flexDirection:'column',
    minHeight:'100vh',
    position:'relative',
    width:'100%',
    alignSelf:'center',
    alignItems:'center',
    justifyContent:'center'
});

export const PricesItemContainer = styled('div')({
    display:'flex',width:'100%',justifyContent:'center'
});