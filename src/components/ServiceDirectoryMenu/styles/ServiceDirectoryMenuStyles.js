import { styled } from '@mui/system';
import COLORS from '../../../theme/Colors';
import FONTS_FAMILY from '../../../theme/FontsFamily';

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
    fontFamily:FONTS_FAMILY.regular.title
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
    '&:hover,&:focus': {
        textDecoration: 'underline',
        cursor:'pointer'
    },
    fontFamily:FONTS_FAMILY.regular.title
});

export const LinkText = styled('a')({
    color: COLORS.secondary,
    width:'100%',
    padding:'3px',
    textDecoration: 'none',
    '&:hover,&:focus': {
        textDecoration: 'underline',
        cursor:'pointer'
    },
    '@media (min-width:320px)': {
        fontSize: '9px',
    },
    '@media (min-width:768px)': {
        fontSize: '11px',
    },
    '@media (min-width:1200px)': {
        fontSize: '13px',
    },
    fontFamily:FONTS_FAMILY.regular.body,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 1, /* number of lines to show */
    '-webkit-box-orient': 'vertical',
});
