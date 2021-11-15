import { styled } from '@mui/system';
import { Button,List,ListItem } from '@mui/material';
import COLORS from '../../../../../theme/Colors';

export const Container = styled('div')({
    zIndex:5,
    display: 'flex',
    flexDirection: 'row',
    alignSelf:'flex-end',
    marginTop:'40px',
    marginRight:'14vw',
    '@media (max-width:768px)': {
        right:'3vw',
    },
    '@media (min-width:1200px)': {
        marginTop:'40px',
    },
    '@media (min-width:2048px)': {
        marginTop:'60px',
    },
    '@media (min-width:3840px)': {
        marginTop:'60px',
    },
});

export const MenuButton = styled(Button)({
    '@media (min-width:1200px)': {
        fontSize:'15px',
    },
    '@media (min-width:2048px)': {
        fontSize:'25px',
    },
    '@media (min-width:3840px)': {
        fontSize:'40px',
    },
    color:COLORS.white,
});

export const DrawerList = styled(List)({
    flex:1,
    width:'200px',
    backgroundColor: COLORS.secondary,
    alignSelf:'center',
});
export const DrawerListItemContainer = styled(ListItem)({
    flex:1,
    color: COLORS.white,
    '&:hover': {
        color: COLORS.black,
        backgroundColor:COLORS.white
    },
});
export const DrawerListItemButton = styled(Button)({
        width:'100%',
});



