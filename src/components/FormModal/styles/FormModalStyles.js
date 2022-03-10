import { styled } from '@mui/system';
import COLORS from '../../../theme/Colors';
import CloseIcon from '@mui/icons-material/Close';

export const Container = styled('div')(props => ({
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: COLORS.white,
    minHeight:'350px',
    '@media(min-width:320px)':{
        minWidth: '300px',
    },
    '@media(min-width:768px)':{
        minWidth: '700px',
    },
    '@media(min-width:1200px)':{
        minWidth:props.maxWidth === 'xl' ? '1000px' : '800px',
    },
}));

export const ContentContainer = styled('div')({
    marginTop:'10px',
    alignSelf:'center',
    width:'90%',
});

export const StyledBackdrop = styled('div')({
    position:'absolute',
    width:'100%',
    height:'100%',
    backdropFilter:'blur(8px)'
});

export const StyledCloseIcon = styled(CloseIcon)({
    alignSelf:'center',
    color:COLORS.gray,
    '@media (min-width:320px)': {
        fontSize: '18px',
    },
    '@media (min-width:768px)': {
        fontSize: '20px',
    },
    '@media (min-width:1200px)': {
        fontSize: '23px',
    }
});