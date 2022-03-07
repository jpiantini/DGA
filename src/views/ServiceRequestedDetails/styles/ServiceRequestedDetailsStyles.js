import { styled } from '@mui/system';
import COLORS from '../../../theme/Colors';
import { boxShadowConfig } from '../../../theme/Styles';

export const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    width:'100%'
});


export const ButtonContainer = styled('div')({
    marginTop:'20px',
    '@media (min-width: 320px)':{
        width:'100%',
    },
    '@media (min-width: 768px)':{
        width:'250px',
    }
    ,
    '@media (min-width: 1200px)':{
        width:'300px',
    }
});

export const ImageContainer = styled('div')({
    position:'relative',
    display:'flex',
    flexDirection:'column',
    width: '100%',
    height:'220px',
    border:` 1px solid ${COLORS.secondary}`,
    alignItems:'center',
    justifyContent:'center',
    cursor : 'pointer',
    '@media (min-width:320px)': {
        width: '200px',
    },
    '@media (min-width:768px)': {
        width: '280px',
    },
    '@media (min-width:1200px)': {
        width: '300px',
    },
    '&:hover':{
        boxShadow: boxShadowConfig,
        borderColor: COLORS.primary,
    }
});

export const LogoImage = styled('img')({

    '@media (min-width:320px)': {
        width: '100px',
    },
    '@media (min-width:768px)': {
        width: '120px',
    },
    '@media (min-width:1200px)': {
        width: '150px',
    },
});
