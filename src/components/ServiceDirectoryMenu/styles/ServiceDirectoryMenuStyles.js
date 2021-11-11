import { styled } from '@mui/system';
import COLORS from '../../../theme/Colors';

export const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: COLORS.snow,
    width:'300px',
});

export const MinDivider = styled('div')({
    height: '10px',
    '@media (max-width:768px)': {
        height: '2px',
    }
});

export const Title = styled('p')({
    color: COLORS.secondary,
    margin:0,
    fontSize: '20px',
    fontWeight:'700',
    textAlign:'left',
    '@media (max-width:768px)': {
        fontSize: '12px',
    },
    fontFamily:'Source Sans Pro'
});


export const Subtitle = styled('p')({
    color: COLORS.secondary,
    margin:'2px',
    fontSize: '14px',
    fontWeight:'700',
    textAlign:'left',
    '@media (max-width:768px)': {
        fontSize: '10px',
    },
    fontFamily:'Source Sans Pro'
});

export const LinkText = styled('a')({
    color: COLORS.secondary,
    margin:'2px',
    fontSize: '13px',
    display: 'inline-block',
    width:'100%',
    textAlign:'right',
    textDecoration: 'none',
    '&:hover,&:focus': {
        textDecoration: 'underline',
    },
    '@media (max-width:768px)': {
        fontSize: '9px',
    },
    fontFamily:'Source Sans Pro'
});
