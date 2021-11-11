import { styled } from '@mui/system';
import { Button,List,ListItem } from '@mui/material';
import COLORS from '../../../../../theme/Colors';
export const Container = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    justifyContent: 'space-around',
    alignItems:'center',
    height:'100px',
    width:'100%',

});

export const MenuContainer = styled('div')({
    display: 'flex',
    flexDirection: 'row',
  
});

export const MenuButton = styled(Button)({
    fontSize:'17px',
    color:COLORS.black,
    fontFamily:'Source Sans Pro'
});

export const MenuDivider = styled('div')({
   width:'18px'
  
});
export const Image = styled('img')({
    width: '20%',
    heigth: '5vh',
    '@media (max-width:768px)': {
        width: '170px'  ,
    },
});

export const DrawerList = styled(List)({
    flex:1,
    width:'200px',
    backgroundColor: COLORS.white,
    alignSelf:'center',
});

export const DrawerListItemContainer = styled(ListItem)({
    flex:1,
    color: COLORS.black,
});

export const DrawerListItemButton = styled(Button)({
        width:'100%',
});
