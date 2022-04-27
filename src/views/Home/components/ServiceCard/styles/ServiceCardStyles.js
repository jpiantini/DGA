import { styled } from '@mui/system';
import { Button, List, ListItem } from '@mui/material';
import COLORS from '../../../../../theme/Colors';
import { boxShadowConfig } from '../../../../../theme/Styles';
import FONTS_FAMILY from '../../../../../theme/FontsFamily';
import CottageIcon from '@mui/icons-material/Cottage';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import HandymanIcon from '@mui/icons-material/Handyman';

export const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: COLORS.white,
    textAlign: 'center',
    justifyContent:'center',
    width: '100%',
    height: '300px',
   // boxShadow: boxShadowConfig,
    borderRadius: '10px',
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    transition: '0.3s',
    padding: '10px',
    '&:hover': {
        boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)'
    }
});

export const CenterContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    width:'85%',
    alignItems: 'center',
    alignSelf:'center',
    justifyContent:'center',
});

export const Title = styled('h1')({
    margin:0,
    fontFamily: FONTS_FAMILY.bold.title,
    textAlign:'left',
    width: '100%',
    fontSize: '20px',
    fontWeight:'bold',
    color: COLORS.secondary,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 2, /* number of lines to show */
    '-webkit-box-orient': 'vertical',
});

export const Separator = styled('div')({
    width: '80%',
    height: '1px',
    backgroundColor: COLORS.secondary,
});

export const BodyText = styled('p')({
    fontFamily: FONTS_FAMILY.regular.body,
    textAlign:'left',
    fontSize: '15px',
    color: COLORS.secondary,
    marginTop:'20px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 3, /* number of lines to show */
    '-webkit-box-orient': 'vertical',
});

export const FirstIcon = styled(CottageIcon)({
    alignSelf:'flex-end',
    marginRight:'30px',
    color:COLORS.secondary,
    '@media (min-width:320px)': {
        fontSize: '100px',
    },
    '@media (min-width:768px)': {
        fontSize: '100px',
    },
    '@media (min-width:1200px)': {
        fontSize: '100px',
    }
});

export const SecondIcon = styled(HandymanIcon)({
    alignSelf:'flex-end',
    marginRight:'30px',
    color:COLORS.secondary,
    '@media (min-width:320px)': {
        fontSize: '100px',
    },
    '@media (min-width:768px)': {
        fontSize: '100px',
    },
    '@media (min-width:1200px)': {
        fontSize: '100px',
    }
});

export const ThirdIcon = styled(HomeWorkIcon)({
    alignSelf:'flex-end',
    marginRight:'30px',
    color:COLORS.secondary,
    '@media (min-width:320px)': {
        fontSize: '100px',
    },
    '@media (min-width:768px)': {
        fontSize: '100px',
    },
    '@media (min-width:1200px)': {
        fontSize: '100px',
    }
});

export const LinkText = styled('a')({
    color: COLORS.primary,
    width:'100%',
    padding:'3px',
    textDecoration: 'none',
    textAlign:'left',
    '&:hover,&:focus': {
        textDecoration: 'underline',
        cursor:'pointer'
    },
    '@media (min-width:320px)': {
        fontSize: '9px',
    },
    '@media (min-width:768px)': {
        fontSize: '11px',
    },
    '@media (min-width:1200px)': {
        fontSize: '13px',
    },
    fontFamily:FONTS_FAMILY.medium.body,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 1, /* number of lines to show */
    '-webkit-box-orient': 'vertical',
});
