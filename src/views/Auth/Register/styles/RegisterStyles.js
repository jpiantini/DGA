import { styled } from '@mui/system';
import COLORS from '../../../../theme/Colors';
import { Button } from '@mui/material';
import { isMobile } from 'react-device-detect';

export const RegisterContainer = styled('div')({
    display: 'flex',
    flexDirection: 'row',
});

export const FormContainer = styled('div')({
    width:'100%',
    height:'100%'
});

export const LeftPanelContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent:'center',
    minHeight: '100vh',
    '@media (min-width:320px)': {
        width: '100%',
    },
    '@media (min-width:768px)': {
        width: '100%',
    },
    '@media (min-width:1200px)': {
        width: '50%',
    },
});

export const LogoImage = styled('img')({
    width: '35%',
        margin: '8%',
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
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '75%',
    alignSelf:'center',
    alignItems:'flex-start',
    justifySelf:'center',
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