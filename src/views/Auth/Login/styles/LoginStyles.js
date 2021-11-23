import { styled } from '@mui/system';
import COLORS from '../../../../theme/Colors';
import { Button } from '@mui/material';
import { isMobile } from 'react-device-detect';
import { Link } from 'react-router-dom';

export const LoginContainer = styled('div')({
    display: 'flex',
    flexDirection: 'row',
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
    '@media (min-width:320px)': {
        width: '75%',
        margin: '10%',
    },
    '@media (min-width:768px)': {
        width: '75%',
        margin: '17%',

    },
    '@media (min-width:1200px)': {
        width: '50%',
        margin: '18%',

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
    '@media (min-width:320px)': {
        display: 'none',
    },
    '@media (min-width:768px)': {
        display: 'none',
    },
    '@media (min-width:1200px)': {
        display: 'flex',
    },
});

export const Title = styled('h1')({
    margin: 0,
    color: COLORS.secondary,
    fontFamily: 'Source Sans Pro',
    '@media (min-width:320px)': {
        fontSize: '18px',
    },
    '@media (min-width:768px)': {
        fontSize: '18px',
    },
    '@media (min-width:1200px)': {
        fontSize: '20px',
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

export const TextFieldContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
});

export const LinkText = styled(Link)({
    color: COLORS.black,
    fontSize: '14px',
    fontFamily: 'Source Sans Pro',
    fontWeight: '700',
    margin: '3px',
    textDecoration: 'underline',
});

export const BodyText = styled('p')({
    color: COLORS.black,
    fontSize: '14px',
    fontFamily: 'Source Sans Pro',
    margin: '0'
});

export const FooterContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    height: '100%',
});