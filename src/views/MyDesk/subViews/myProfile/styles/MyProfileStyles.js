import { styled } from '@mui/system';
import COLORS from '../../../../../theme/Colors';
import Button from '@mui/material/Button';

export const CardContainer = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    boxShadow: '1px 2px 22px 2px rgba(0,0,0,0.31)',
});

export const SectionTitle = styled('h1')({
    marginTop: '3px',
    color: COLORS.secondary,
    fontFamily: 'Fira Sans',
    textAlign: 'left',
    '@media (min-width:320px)': {
        fontSize: '12px',
    },
    '@media (min-width:768px)': {
        fontSize: '18px',
    },
    '@media (min-width:1200px)': {
        fontSize: '20px',
    },
});

export const SectionTextDivider = styled('h1')({
    width: '5%',
});

export const SectionLink = styled(Button)({
    margin:0,
    color: COLORS.primary,
    fontFamily: 'Nunito Sans',
    textAlign: 'left',
    textTransform:'none',
    '@media (min-width:320px)': {
        fontSize: '9px',
    },
    '@media (min-width:768px)': {
        fontSize: '10px',
    },
    '@media (min-width:1200px)': {
        fontSize: '12px',
    },
    '&:hover': {
        textDecoration: 'underline'
    }
});

export const ProfileImage = styled('img')({
    '@media (min-width:320px)': {
        width: '100px',
        height:'100%'
    },
    '@media (min-width:768px)': {
        width: '125px',
        height:'100%'

    },
    '@media (min-width:1200px)': {
        width: '150px',
        height:'100%'
    },
});

export const ProfileContainer = styled('div')({
    position:'relative',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height:'100%',
    justifyContent: 'flex-start',
    boxShadow: '1px 2px 22px 2px rgba(0,0,0,0.31)',
});

export const CardBodyTitle = styled('p')({
    margin:0,
    fontFamily: 'Source Sans Pro',
    color: COLORS.black,
    '@media(min-width:320px)':{
        fontSize: '8px',
    },
    '@media(min-width:768px)':{
        fontSize: '10px',
    },
    '@media(min-width:1200px)':{
        fontSize: '15px',
    },
});

export const CardBodyText = styled('p')({
    margin:0,
    fontFamily: 'Nunito Sans',
    color: COLORS.secondary,
    '@media(min-width:320px)':{
        fontSize: '7px',
    },
    '@media(min-width:768px)':{
        fontSize: '11px',
    },
    '@media(min-width:1200px)':{
        fontSize: '17px',
    },
});

export const CardTextContainer = styled('div')({
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    width:'90%',
    padding:'2%'
});

export const Column = styled('div')({
    display:'flex',
    flexDirection:'column',
    width:'100%',
    textAlign:'left',
    alignItems:'flex-start'
 });
