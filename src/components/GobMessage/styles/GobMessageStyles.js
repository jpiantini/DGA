import { styled } from '@mui/system';
import COLORS from '../../../theme/Colors';
export const Container = styled('div')({
    zIndex:3,
    display: 'flex',
    position:'relative',
    flexDirection: 'row',
    backgroundColor: COLORS.secondary,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height:'30%',
    width:'100%',
    '@media (max-width:768px)': {
        flexDirection: 'column',
        height:'55px',
    }
});

export const TextContainer = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    '@media (max-width:768px)': {
        flexDirection: 'column',
    }
});

export const URLDivider = styled('div')({
    width: '5px',
    '@media (max-width:768px)': {
        width: '2px',
    }
});

export const Text = styled('p')({
    color: COLORS.white,
    fontSize: '1vw',
    '@media (max-width:768px)': {
        fontSize: '6.5px',
    },
    fontFamily:'Quicksand'
});

export const LinkText = styled('a')({
    color: COLORS.primary,
    fontSize: '1vw',
    alignSelf:'center',
    '@media (max-width:768px)': {
        fontSize: '6.5px',
    },
    fontFamily:'Quicksand'
});

export const Image = styled('img')({
    width: '15vw',
    heigth: '5vh',
    '@media (max-width:768px)': {
        width: '170px'  ,
    },
});