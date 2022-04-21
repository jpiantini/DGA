import { styled } from '@mui/system';
import { Button,TextField } from '@mui/material';
import COLORS from './Colors';
import FONTS_FAMILY from './FontsFamily';
import Pagination from '@mui/material/Pagination';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

export const boxShadowConfig="5px 5px 50px -15px rgba(0,0,0,0.51)"

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
    borderRadius: '30px',
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
    fontFamily: FONTS_FAMILY.regular.body,
    '&:hover,&:focus,&:active': {
        color: COLORS.white,
        backgroundColor: COLORS.primary,
    }
});

export const StyledButtonOutlined = styled(Button)(props => ({
    minHeight: '38px',
    width: '100%',
    borderColor: COLORS.secondary,
    borderRadius: '30px',
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
    fontFamily: FONTS_FAMILY.regular.body,
    '&:hover,&:focus,&:active': {
        color: COLORS.white,
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    }
}));

export const StyledTextInput = styled(TextField)(props => ({
    width: '100%',
    alignSelf: 'center',
    borderWidth: props.hiddenBorder ? 0:'5px',
    '& .MuiInputBase-input ': {
      width: '100%',
      fontSize: '17px',
      backgroundColor: COLORS.white,
      padding:10
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: COLORS.secondary,
        borderRadius: '10px',
        minHeight: '45px',
        borderWidth: props.hiddenBorder ? 0:'1px',
      },
  
      '&:hover fieldset': {
    //    borderColor: COLORS.secondary,
      },
      '&.Mui-focused fieldset': {
        borderColor: COLORS.secondary,
        borderWidth: props.hiddenBorder ? 0:'1px',
      },
    },
  }));

export const BodyText = styled('p')({
    margin: 0,
    textAlign: 'left',
    fontSize: '15px',
    color: COLORS.black,
    fontFamily:FONTS_FAMILY.regular.body
});

export const BodyTextBold = styled('p')({
    margin: 0,
    textAlign: 'left',
    fontSize: '15px',
    color: COLORS.black,
    fontFamily:FONTS_FAMILY.regular.body,
    fontWeight: 'bold',
});

export const Title = styled('h1')({
    margin:0,
    fontFamily: FONTS_FAMILY.medium.title,
    fontSize: '40px',
    '@media(max-width:768px)':{
        fontSize: '30px',
    },
    color: COLORS.secondary,
});

export const SubTitle = styled('h4')({
    margin:0,
    fontFamily: FONTS_FAMILY.medium.title,
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
    fontFamily:FONTS_FAMILY.regular.title
});

export const ButtonsMenuContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    '@media (min-width:320px)': {
        width: '100%',
    },
    '@media (min-width:768px)': {
        width: '80%',
    },
    '@media (min-width:1200px)': {
        width: '70%',
    },
});

export const CardContainer = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    minHeight:'200px',
    justifyContent: 'center',
    boxShadow: boxShadowConfig,
});

export const CardBodyTitle = styled('p')({
    margin:0,
    fontFamily:FONTS_FAMILY.regular.body,
    color: COLORS.black,
    '@media(min-width:320px)':{
        fontSize: '12px',
    },
    '@media(min-width:768px)':{
        fontSize: '12px',
    },
    '@media(min-width:1200px)':{
        fontSize: '15px',
    },
});

export const CardBodyText = styled('p')({
    width:'100%',
    margin:0,
    fontFamily: FONTS_FAMILY.regular.body,
    color: COLORS.secondary,
    '@media(min-width:320px)':{
        fontSize: '13px',
    },
    '@media(min-width:768px)':{
        fontSize: '13px',
    },
    '@media(min-width:1200px)':{
        fontSize: '17px',
    },
});

export const CardTextContainer = styled('div')({
    display:'flex',
    flexDirection:'row',
    alignSelf:'center',
    width:'90%',
    padding:'2%'
});

export const FieldTitle = styled('p')({
    marginTop: '3px',
    color: COLORS.black,
    fontFamily: FONTS_FAMILY.regular.body,
    '@media (min-width:320px)': {
      fontSize: '11px',
    },
    '@media (min-width:768px)': {
      fontSize: '15px',
    },
    '@media (min-width:1200px)': {
      fontSize: '17px',
    }
  });

  export const StyledPagination = styled(Pagination)({
    '& .MuiPaginationItem-rounded':{
        '&:hover,&:focus':{
            backgroundColor:COLORS.primary,
            color:COLORS.white
        }
    },
    '& .Mui-selected':{
        backgroundColor:`${COLORS.primary} !important`,
        color:COLORS.white
    },
    '& .MuiPaginationItem-root':{
        '&:hover,&:focus':{
            backgroundColor:COLORS.primary,
            color:COLORS.white
        },
    }

});

export const StyledCheckCircleIcon = styled(CheckCircleIcon)({
    color: COLORS.success,
    '@media (min-width:320px)': {
        fontSize: '150px',
    },
    '@media (min-width:768px)': {
        fontSize: '200px',
    },
    '@media (min-width:1200px)': {
        fontSize: '250px',
    }
});

export const StyledCancelIcon = styled(CancelIcon)({
    color: COLORS.error,
    '@media (min-width:320px)': {
        fontSize: '150px',
    },
    '@media (min-width:768px)': {
        fontSize: '200px',
    },
    '@media (min-width:1200px)': {
        fontSize: '250px',
    }
});
