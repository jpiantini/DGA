import { styled } from '@mui/system';
import COLORS from '../../../theme/Colors';

export const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    width:'100%'
});

export const ButtonContainer = styled('div')({
    '@media (min-width:320px)':{
        marginTop:0,
    },
    '@media (min-width:768px)':{
        marginTop:'17px',
    },
    '@media (min-width:320px)':{
        marginTop:'20px',
    },
});


export const ListContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems:'center'
});




