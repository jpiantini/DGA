import { styled } from '@mui/system';
import { Button, List, ListItem } from '@mui/material';
import COLORS from '../../../theme/Colors';
import FONTS_FAMILY from '../../../theme/FontsFamily';

export const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: COLORS.white,
    textAlign: 'center',
    justifyContent:'center',
    alignSelf:'center',
    alignItems:'center',
    width: '100%',
    minHeight: '400px',
    '@media(max-width:768px)':{
        minHeight: '300px',
    },
});

export const Title = styled('h1')({
    fontFamily: FONTS_FAMILY.regular.title,
    fontSize: '35px',
    '@media(max-width:768px)':{
        fontSize: '20px',
    },
    color: COLORS.secondary,
});

export const ButtonsContainer = styled('div')({
    display:'flex',
    flexDirection: 'column',
    width:'300px',
    '@media(max-width:768px)':{
        width: '250px',
    },
});




