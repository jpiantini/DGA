import { styled } from '@mui/system';
import COLORS from '../../../../theme/Colors';
import { Button } from '@mui/material';
import { isMobile } from 'react-device-detect';

export const RegisterContainer = styled('div')({
    display: 'flex',
    flexDirection: 'row',
});

export const LeftPanelContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems:'center',
    minHeight:'100vh',
    width: '50%',
    '@media (max-width:768px)': {
        width: '100%',
    }
});

export const LogoImage = styled('img')({
    width: '150px',
    '@media (max-width:768px)': {
        width: '150px',
    },
});

export const Image = styled('div')({
    display: 'flex',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '100%',
    minHeight: '100vh',
    justifyContent: 'center',
    '@media (max-width:768px)': {
        display: 'none',
    }
});

export const Title = styled('h1')({
    margin: 0,
    fontSize: '45px',
    color: COLORS.tertiary,
    fontFamily: 'Source Sans Pro',
    '@media (max-width:768px)': {
        fontSize: '30px'
    },
});


export const FlexStartContainer = styled('div')({
    display:'flex',
    flexDirection:'column',
    width: '80%',
    height:'100%',
    alignItems: 'flex-start'
});

export const LinkText = styled('a')({
    color: COLORS.black,
    fontSize: '14px',
    fontFamily: 'Source Sans Pro',
    fontWeight:'700',
    margin: '3px',
    textDecoration: 'none',
    '&:hover,&:focus': {
        textDecoration: 'underline',
    }
});

export const BodyText = styled('p')({
    color: COLORS.black,
    fontSize: '14px',
    fontFamily: 'Source Sans Pro',
    margin: '3px'
});

export const FooterContainer = styled('div')({
    display:'flex',
    flexDirection:'column',
    justifyContent:'flex-end',
    height:'100%',
});