import { styled } from '@mui/system';
import COLORS from '../../../theme/Colors';
import { TextField, Button } from '@mui/material';
import { isMobile } from 'react-device-detect';

export const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
});
export const HomeContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
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

export const HomeTextContainer = styled('div')({
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
    justifyContent: 'center',
    width: '90%',
    minHeight: isMobile ? '400px' : '500px'

});

export const DefaultButton = styled(Button)({
    height: '35px',
    width: '200px',
    borderRadius: '20px',
    color: COLORS.white,
    backgroundColor: COLORS.primary,
    '&:hover,&:focus,&:active': {
        color: COLORS.white,
        backgroundColor: COLORS.black
    }
});

export const HomeTitle = styled('h1')({
    margin: 0,
    width: '50%',
    fontSize: '50px',
    color: COLORS.white,
    fontFamily: 'Fira Sans',
    //  textShadow: '2px 2px 10px #000000',
    '@media (max-width:1050px)': {
        fontSize: '30px'
    },
});


export const HomeSubTitle = styled('h3')({
    margin: 0,
    width: '50%',
    fontSize: '18px',
    color: COLORS.white,
    fontFamily: 'Nunito Sans',
    // textShadow: '2px 2px 10px #000000',
    '@media (max-width:1050px)': {
        fontSize: '12px'
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
    alignItems: 'center'
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

export const SearcherSubTitle = styled('h3')({
    color: COLORS.secondary,
    marginBottom: '10px',
    textAlign: 'left',
    fontSize: '18px',
    fontFamily: 'Nunito Sans',
    '@media (max-width:768px)': {
        fontSize: '15px'
    },
});

export const SearcherTitle = styled('h3')({
    color: COLORS.secondary,
    margin:'0',
    textAlign: 'left',
    fontSize: '30px',
    fontFamily: 'Nunito Sans',
    '@media (max-width:768px)': {
        fontSize: '23px'
    },
});

export const AnalyticsContainer = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
    width: '100%',
    justifyContent: 'space-evenly'
});

export const SearcherContainer = styled('div')({
    width: '83%',
    alignItems: 'flex-start',
    alignSelf: 'center'
});

export const SelectorContainer = styled('div')({
    width: '100%',
    alignItems: 'flex-start',
    alignSelf: 'center',
    padding: '1%'
});

export const SelectorsSearcherContainer = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
    width: '85%',
    justifyContent: 'space-evenly',
    '@media (max-width:830px)': {
        flexDirection: 'column',
    },
});

export const SearchTextInput = styled(TextField)({
    width: '100%',
    alignSelf: 'center',
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: COLORS.secondary,
          borderRadius:0,
        },
        '&:hover fieldset': {
          borderColor: COLORS.secondary,
          borderRadius:0,
        },
        '&.Mui-focused fieldset': {
          borderColor: COLORS.secondary,
          borderWidth: '1px',
          borderRadius:0,
        },
      },
        '@media (max-width:830px)': {
            width: '100%',
            paddingBottom: '5px'
        },
});

export const SearchSelect = styled(TextField)({
    alignSelf: 'start',
    width: '100%',
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: COLORS.secondary,
      borderRadius:0,
    },
    '&:hover fieldset': {
      borderColor: COLORS.secondary,
      borderRadius:0,
    },
    '&.Mui-focused fieldset': {
      borderColor: COLORS.secondary,
      borderWidth: '1px',
      borderRadius:0,
    },
  },
    '@media (max-width:830px)': {
        width: '100%',
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
    //   textShadow: '2px 2px 10px #000000',
    '@media (max-width:768px)': {
        fontSize: '30px'
    },
});

export const ServicesSubtitle = styled('h1')({
    fontSize: '30px',
    textAlign: 'center',
    color: COLORS.white,
    fontFamily: 'Source Sans Pro',
    //  textShadow: '2px 2px 10px #000000',
    '@media (max-width:768px)': {
        fontSize: '20px'
    },
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

export const CenterContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    width: '70%',
    justifyContent:'center',
    alignItems: 'left',
    alignSelf:'center',
    textAlign:'left'
});

