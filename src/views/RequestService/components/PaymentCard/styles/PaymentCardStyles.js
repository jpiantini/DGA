import { Button } from '@mui/material';
import { styled } from '@mui/system';
import COLORS from '../../../../../theme/Colors'
import FONTS_FAMILY from '../../../../../theme/FontsFamily';

export const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    border: ` 1px solid ${COLORS.tertiary}`,
    '@media (min-width:320px)': {
        width:'270px',
        minHeight:'250px'
    },
    '@media (min-width:768px)': {
        width:'380px',
        minHeight:'250px'
    },
    '@media (min-width:1200px)': {
        width:'425px',
        minHeight:'250px'
    }
});


export const Header = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    width:'100%',
    backgroundColor:COLORS.secondary,
    textAlign:'center',
    justifyContent:'center',
    alignItems:'center',
    '@media (min-width:320px)': {
        height:'100px'
    },
    '@media (min-width:768px)': {
        height:'100px'
    },
    '@media (min-width:1200px)': {
        height:'100px'
    }
});

export const Body = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    minHeight:'135px',
    alignItems:'center',
    justifyContent:'center',
    textAlign:'center'
});

export const HeaderTitle = styled('h1')({
    color: COLORS.white,
    margin:0,
    fontFamily: FONTS_FAMILY.bold.title,
    '@media (min-width:320px)': {
        fontSize: '30px',
    },
    '@media (min-width:768px)': {
        fontSize: '30px',
    },
    '@media (min-width:1200px)': {
        fontSize: '30px',
    }
});

export const HeaderSubTitle = styled('h4')({
    color: COLORS.white,
    margin:0,
    fontFamily: FONTS_FAMILY.bold.title,
    '@media (min-width:320px)': {
        fontSize: '15px',
    },
    '@media (min-width:768px)': {
        fontSize: '16px',
    },
    '@media (min-width:1200px)': {
        fontSize: '18px',
    }
});

export const BodyTitle = styled('p')({
    color: COLORS.gray,
    margin:'0',
    fontFamily: FONTS_FAMILY.bold.title,
    '@media (min-width:320px)': {
        fontSize: '15px',
    },
    '@media (min-width:768px)': {
        fontSize: '16px',
    },
    '@media (min-width:1200px)': {
        fontSize: '18px',
    }
});

export const BodySubTitle = styled('p')({
    color: COLORS.gray,
    margin:'0',
    fontFamily: FONTS_FAMILY.bold.title,
    '@media (min-width:320px)': {
        fontSize: '11px',
    },
    '@media (min-width:768px)': {
        fontSize: '13px',
    },
    '@media (min-width:1200px)': {
        fontSize: '14px',
    }
});

export const ButtonsContainer = styled('div')({
    flexDirection: 'column',
    width:'100%',
    overflow: 'hidden',
});

export const CardButton = styled(Button)({
    height:'40px',
    width:'100%',
    color: COLORS.white,
    backgroundColor:COLORS.secondary,
    borderTop:` 1px solid ${COLORS.white}`,
    borderRadius:0,
    '&:hover,&:focus,&:active': {
        backgroundColor: COLORS.primary,
        color: COLORS.white,
        borderColor:COLORS.primary
    }
});
