import { styled } from '@mui/system';
import { Button } from '@mui/material';
import COLORS from '../../../../../theme/Colors';
import FONTS_FAMILY from '../../../../../theme/FontsFamily';

export const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign:'center',
    height:'220px',
    width:'100%',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',

});

export const DarkOverlay = styled('div')({
    zIndex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    top: 0,
    left: 0,
    width: '100%',
    height:'100%',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    justifyContent: 'center',
});

export const Image = styled('img')({
    width: '20%',
    heigth: '5vh',
    '@media (max-width:768px)': {
        width: '170px'  ,
    },
});

export const Title = styled('h1')({
    margin:0,
   // textShadow: '2px 2px 10px #000000',
    color: COLORS.white,
    fontFamily:FONTS_FAMILY.regular.title,
    '@media (min-width:320px)': {
        fontSize: '30px',
    },
    '@media (min-width:768px)': {
        fontSize: '35px',
    },
    '@media (min-width:1200px)': {
        fontSize: '50px',
    },
});