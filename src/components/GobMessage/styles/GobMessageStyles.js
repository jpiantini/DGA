import { styled } from '@mui/system';
import COLORS from '../../../theme/Colors';
import FONTS_FAMILY from '../../../theme/FontsFamily';

export const Container = styled('div')({
    zIndex: 3,
    display: 'flex',
    position: 'relative',
    flexDirection: 'row',
    backgroundColor: COLORS.secondary,
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'space-evenly',
    width: '100%'
});

export const LineContainer = styled('div')({
    display: 'flex',
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    maxWidth:'1920px',
    justifyContent: 'space-between',
    '@media (min-width:320px)': {
        flexDirection: 'column',
    },
    '@media (min-width:768px)': {
        flexDirection: 'column',
    },
    '@media (min-width:1200px)': {
        flexDirection: 'row',
    }
});

export const TextContainer = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    '@media (max-width:768px)': {
        flexDirection: 'column',
    }
});

export const URLDivider = styled('div')({
    width: '5px',
    '@media (max-width:768px)': {
        width: '2px',
    }
});

export const Text = styled('p')({
    color: COLORS.white,
    fontFamily: FONTS_FAMILY.regular.body,
    '@media (min-width:320px)': {
        fontSize: '9px',
    },
    '@media (min-width:768px)': {
        fontSize: '11px',
    },
    '@media (min-width:1200px)': {
        fontSize: '13px',
    }
});

export const LinkText = styled('a')({
    color: COLORS.primary,
    fontFamily: FONTS_FAMILY.regular.body,
    '@media (min-width:320px)': {
        fontSize: '9px',
    },
    '@media (min-width:768px)': {
        fontSize: '11px',
    },
    '@media (min-width:1200px)': {
        fontSize: '13px',
    }
});

export const Image = styled('img')({
    '@media (min-width:320px)': {
        width: '170px',
    },
    '@media (min-width:768px)': {
        width: '230px',
    },
    '@media (min-width:1200px)': {
        width: '250px',
    }
});