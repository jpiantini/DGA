import { styled } from '@mui/system';
import { Button, List, ListItem } from '@mui/material';
import COLORS from '../../../../../theme/Colors';

export const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: COLORS.white,
    minHeight:'300px',
    '@media(min-width:320px)':{
        width: '300px',
    },
    '@media(min-width:768px)':{
        width: '400px',
    },
    '@media(min-width:1200px)':{
        width:'600px',
    },
});

export const ContentContainer = styled('div')({
    marginTop:'10px',
    alignSelf:'center',
    width:'90%',
});

export const Column = styled('div')({
   display:'flex',
   flexDirection:'column',
   width:'50%',
   textAlign:'left',
   alignItems:'flex-start'
});

export const TextContainer = styled('div')({
    width:'90%',
    textAlign:'left',

});

export const ButtonContainer = styled('div')({
    width:'100%',
    textAlign:'left',

});

export const Title = styled('h1')({
    margin:0,
    fontFamily: 'Nunito Sans',
    color: COLORS.black,
    '@media(min-width:320px)':{
        fontSize: '11px',
    },
    '@media(min-width:768px)':{
        fontSize: '12px',
    },
    '@media(min-width:1200px)':{
        fontSize: '15px',
    },
});

export const Text = styled('p')({
    fontFamily: 'Nunito Sans',
    color: COLORS.black,
    margin:0,
    '@media(min-width:320px)':{
        fontSize: '11px',
    },
    '@media(min-width:768px)':{
        fontSize: '12px',
    },
    '@media(min-width:1200px)':{
        fontSize: '15px',
    },
});

export const StyledBackdrop = styled('div')({
    position:'absolute',
    width:'100%',
    height:'100%',
    backdropFilter:'blur(8px)'
});





