import { styled } from '@mui/system';
import COLORS from '../../../../../theme/Colors';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import CancelIcon from '@mui/icons-material/Cancel';
import CloseIcon from '@mui/icons-material/Close';

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

export const IconContainer = styled('div')({
    width: '5%',
});

export const StyledCheckCircleIcon = styled(CheckCircleIcon)({
    color:COLORS.success,
    '@media (min-width:320px)': {
        fontSize: '18x',
    },
    '@media (min-width:768px)': {
        fontSize: '20px',
    },
    '@media (min-width:1200px)': {
        fontSize: '23px',
    }
});

export const StyledWarningIcon = styled(WarningIcon)({
    color:'#ffa500',
    borderColor:'#000000',
    '@media (min-width:320px)': {
        fontSize: '18x',
    },
    '@media (min-width:768px)': {
        fontSize: '20px',
    },
    '@media (min-width:1200px)': {
        fontSize: '23px',
    }
});

export const StyledCancelIcon = styled(CancelIcon)({
    color:COLORS.red,
    '@media (min-width:320px)': {
        fontSize: '18x',
    },
    '@media (min-width:768px)': {
        fontSize: '20px',
    },
    '@media (min-width:1200px)': {
        fontSize: '23px',
    }
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

export const HeaderMessageContainer = styled('div')(props =>({
    display: 'flex',
    flexDirection: 'row',
    backgroundColor:props.variant === 'rejected' ? COLORS.notificationError : 
    props.variant === 'actionRequired' ? COLORS.notificationWarning :  COLORS.notificationSuccess,
    width:'100%',
    alignItems:'center',
    justifyContent:'space-between',
    '@media (min-width:320px)': {
        flexDirection: 'column',
    },
    '@media (min-width:768px)': {
        flexDirection: 'column',
    },
    '@media (min-width:1200px)': {
        flexDirection: 'row',
    }
}));

export const HeaderMessageTextContainer = styled('div')({
    padding:'1%',
    width:'90%',
    display: 'flex',
    flexDirection: 'row',
    '@media (max-width:768px)': {
        flexDirection: 'column',
    },
    alignItems:'center',
});

export const HeaderMessageBodyText = styled('p')({
    fontFamily: 'Nunito Sans',
    color: COLORS.black,
    margin:0,
    '@media(min-width:320px)':{
        fontSize: '10px',
        textAlign:'center',
    },
    '@media(min-width:768px)':{
        fontSize: '11.5px',
        textAlign:'left',
    },
    '@media(min-width:1200px)':{
        fontSize: '13px',
        textAlign:'left',
    },
});