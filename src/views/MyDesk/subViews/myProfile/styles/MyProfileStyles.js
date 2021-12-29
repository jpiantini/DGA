import { styled } from '@mui/system';
import COLORS from '../../../../../theme/Colors';
import Button from '@mui/material/Button';
import { boxShadowConfig } from '../../../../../theme/Styles';
import FONTS_FAMILY from '../../../../../theme/FontsFamily';


export const SectionLink = styled(Button)({
    margin:0,
    color: COLORS.primary,
    fontFamily:FONTS_FAMILY.regular.body,
    textAlign: 'left',
    textTransform:'none',
    '@media (min-width:320px)': {
        fontSize: '11px',
    },
    '@media (min-width:768px)': {
        fontSize: '12px',
    },
    '@media (min-width:1200px)': {
        fontSize: '12px',
    },
    '&:hover': {
        textDecoration: 'underline'
    }
});

export const ProfileImage = styled('img')({
    alignSelf:'center',
    '@media (min-width:320px)': {
        width: '100px',
        height:'100%',
        borderRadius:'100%',
        marginTop:'5px',
    },
    '@media (min-width:768px)': {
        width: '125px',
        height:'100%',
        borderRadius:0,
        marginTop:0,
    },
    '@media (min-width:1200px)': {
        width: '150px',
        height:'100%',
        borderRadius:0,
        marginTop:0,
    },
});

export const ProfileContainer = styled('div')({
    display: 'flex',
    width: '100%',
    boxShadow: boxShadowConfig,
    '@media (min-width:320px)': {
        flexDirection: 'column',
        minHeight:'100%',
        justifyContent: 'center',
    },
    '@media (min-width:768px)': {
        flexDirection: 'row',
        height:'100%',
        justifyContent: 'flex-start',
    },
    '@media (min-width:1200px)': {
        flexDirection: 'row',
        height:'100%',
        justifyContent: 'flex-start',
    },
    
});
