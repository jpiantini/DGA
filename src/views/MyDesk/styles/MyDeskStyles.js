import { styled } from '@mui/system';
import COLORS from '../../../theme/Colors';

export const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
});

export const MetricsContainer = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    boxShadow: '1px 2px 22px 2px rgba(0,0,0,0.31)',

});

export const MetricsTextContainer = styled('div')({
    textAlign: 'center',
    width: '24%',
    padding: '2%'
});

export const MetricsTitle = styled('p')({
    margin: 0,
    fontFamily: 'Source Sans Pro',
    color: COLORS.secondary,
    '@media (min-width:320px)': {
        fontSize: '13px',
    },
    '@media (min-width:768px)': {
        fontSize: '18px',
    },
    '@media (min-width:1200px)': {
        fontSize: '25px',
    },
});

export const MetricsValue = styled('h1')({
    margin: 0,
    fontFamily: 'Nunito Sans',
    color: COLORS.secondary,
    '@media (min-width:320px)': {
        fontSize: '30px',
    },
    '@media (min-width:768px)': {
        fontSize: '50px',
    },
    '@media (min-width:1200px)': {
        fontSize: '90px',
    },

});

export const MetricsContentDivider = styled('div')({
    backgroundColor: COLORS.tertiary,
    width: '1px',
    height: '60%',
    alignSelf: 'center'
});

export const ButtonsMenuContainer = styled('div')({
    display:'flex',
    flexDirection:'column',
    alignSelf:'center',
    '@media (min-width:320px)': {
        width: '100%',
    },
    '@media (min-width:768px)': {
        width: '80%',
    },
    '@media (min-width:1200px)': {
        width:'70%',
    },
});


