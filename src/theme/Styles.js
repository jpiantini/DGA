import { styled } from '@mui/system';
import { Button,TextField } from '@mui/material';
import COLORS from './Colors';


export const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column',
});

export const Row = styled('div')({
    display: 'flex',
    flexDirection: 'row',
});

export const StyledButton = styled(Button)({
    minHeight: '38px',
    width: '100%',
    borderRadius: '0',
    color: COLORS.white,
    backgroundColor: COLORS.secondary,
    '@media (min-width:320px)': {
        fontSize: '12px',
    },
    '@media (min-width:768px)': {
        fontSize: '13.5px',
    },
    '@media (min-width:1200px)': {
        fontSize: '15px',
    },
    fontFamily: 'Nunito Sans',
    '&:hover,&:focus,&:active': {
        color: COLORS.white,
        backgroundColor: COLORS.primary,
    }
});

export const StyledButtonOutlined = styled(Button)(props => ({
    minHeight: '38px',
    width: '100%',
    borderColor: COLORS.secondary,
    borderRadius: 0,
    color: props.active ? COLORS.white : COLORS.secondary,
    backgroundColor: props.active ? COLORS.secondary : COLORS.white,
    '@media (min-width:320px)': {
        fontSize: '12px',
    },
    '@media (min-width:768px)': {
        fontSize: '13.5px',
    },
    '@media (min-width:1200px)': {
        fontSize: '15px',
    },
    fontFamily: 'Nunito Sans',
    '&:hover,&:focus,&:active': {
        color: COLORS.white,
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    }
}));

export const StyledTextInput = styled(TextField)({
    width: '100%',
    alignSelf: 'center',
    borderWidth: '5px',
    '& .MuiInputBase-input ': {
      width: '100%',
      fontSize: '17px',
      backgroundColor: COLORS.white,
      padding:10
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: COLORS.secondary,
        borderRadius: '0',
        minHeight: '45px',
      },
  
      '&:hover fieldset': {
        borderColor: COLORS.secondary,
      },
      '&.Mui-focused fieldset': {
        borderColor: COLORS.secondary,
        borderWidth: '1px'
      },
    },
  });

export const BodyText = styled('p')({
    margin: 0,
    textAlign: 'left',
    fontSize: '15px',
    color: COLORS.black,
    fontFamily: 'Source Sans Pro',
    fontWeight: '400',
});

export const BodyTextBold = styled('p')({
    margin: 0,
    textAlign: 'left',
    fontSize: '15px',
    color: COLORS.black,
    fontFamily: 'Source Sans Pro',
    fontWeight: '700',
});

export const Title = styled('h1')({
    margin:0,
    fontFamily: 'Nunito Sans',
    fontSize: '40px',
    '@media(max-width:768px)':{
        fontSize: '30px',
    },
    color: COLORS.secondary,
});

export const SubTitle = styled('h4')({
    margin:0,
    fontFamily: 'Nunito Sans',
    fontSize: '30px',
    '@media(max-width:768px)':{
        fontSize: '20px',
    },
    color: COLORS.secondary,
});

export const RowBodyDivider = styled('div')({
    width:'7%'
});
export const SmallHeightDivider = styled('div')({
    height:'15px'
});

export const MediumHeightDivider = styled('div')({
    height:'60px'
});

export const WpRichTextContainer = styled('div')({
    fontFamily:'Fira Sans'
});
