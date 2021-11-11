import { styled } from '@mui/system';
import { Button,List,ListItem } from '@mui/material';
import COLORS from '../../../../../theme/Colors';

export const Container = styled('div')({
    zIndex:5,
    display: 'flex',
    flexDirection: 'row',
    marginTop:'40px',
    alignSelf:'flex-end',
    marginRight:'10vw',
    '@media (max-width:768px)': {
        right:'3vw',
    },
});

export const Text = styled('p')({
    fontSize:'18px',
    textAlign:'center',
    color: COLORS.white,
    textShadow:'1px 1px #000000',
    '@media (max-width:768px)': {
    },
    fontFamily:'Nunito Sans'
});

export const MenuButton = styled(Button)({
    fontSize:'15px',
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



