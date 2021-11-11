import { styled } from '@mui/system';
import COLORS from '../../../theme/Colors';
import { TextField } from '@mui/material';
import { isMobile } from 'react-device-detect';

export const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
});

export const ContainerBackground = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '100%',
    minHeight: '70vh',
    justifyContent: 'center'
});

export const MediumContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    minHeight: '380px',
    justifyContent: 'center'
});

export const Image = styled('img')({
    margin: '10px',
    width: '20%',
    '@media (max-width:768px)': {
        width: '170px',
    },
});

export const CentralTextContainer = styled('div')({
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    justifySelf: 'center',
    width: '70vw',
    minHeight: isMobile ? '400px' : '500px'

});

export const CentralText = styled('div')({
    fontSize: '100px',
    textAlign: 'center',
    color: COLORS.white,
    fontFamily: 'Source Sans Pro',
    textShadow: '2px 2px 10px #000000',
    '@media (max-width:1050px)': {
        fontSize: '30px'
    },
});

export const DarkOverlay = styled('div')({
    zIndex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    top: 0,
    left: 0,
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
});

export const Title = styled('h1')({
    margin: 0,
    fontSize: '50px',
    textAlign: 'center',
    color: COLORS.white,
    fontFamily: 'Source Sans Pro',
    '@media (max-width:768px)': {
        fontSize: '30px'
    },
});
export const TitleBold = styled('h1')({
    fontSize: '50px',
    textAlign: 'center',
    color: COLORS.white,
    fontFamily: 'Source Sans Pro',
    '@media (max-width:768px)': {
        fontSize: '30px'
    },
});

export const SubTitle = styled('h3')({
    margin: 0,
    fontSize: '25px',
    textAlign: 'center',
    color: COLORS.white,
    fontFamily: 'Source Sans Pro',
    '@media (max-width:768px)': {
        fontSize: '20px'
    },
});

export const AnalyticsContainer = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
    width: '100%',
    justifyContent: 'space-evenly'
});

export const SelectorsContainer = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
    width: '80%',
    justifyContent: 'space-evenly',
    '@media (max-width:830px)': {
        flexDirection: 'column',
    },
});

export const SearchTextInput = styled(TextField)({
    width: '76%',
    alignSelf: 'center'
});

export const SearchSelect = styled(TextField)({
    width: '80%',
    alignSelf: 'center',
    '@media (max-width:830px)': {
        width: '70%',
        paddingBottom: '5px'
    },
});

export const ServicesListContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '100%',
    minHeight: '100vh',
});

export const ServicesTitle = styled('h1')({
    fontSize: '50px',
    textAlign: 'center',
    color: COLORS.white,
    fontFamily: 'Source Sans Pro',
    textShadow: '2px 2px 10px #000000',
    '@media (max-width:768px)': {
        fontSize: '30px'
    },
});

export const ServicesSubtitle = styled('h1')({
    fontSize: '30px',
    textAlign: 'center',
    color: COLORS.white,
    fontFamily: 'Source Sans Pro',
    textShadow: '2px 2px 10px #000000',
    '@media (max-width:768px)': {
        fontSize: '20px'
    },
});

export const FooterContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    background: `linear-gradient(to left bottom,${COLORS.tertiary},${COLORS.secondary})`,
    width: '100%',
    minHeight: '50vh',
    justifyContent: 'center'
});


export const LinkText = styled('a')({
    color: COLORS.white,
    fontSize: '12px',
    fontFamily: 'Quicksand',
    margin: '3px',
    textDecoration: 'none',
    '&:hover,&:focus': {
        textDecoration: 'underline',
    }
});

export const FooterText = styled('p')({
    color: COLORS.white,
    fontSize: '12px',
    fontFamily: 'Source Sans Pro'
});

export const CenterContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center'
});

