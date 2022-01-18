import { styled } from '@mui/system';
import FONTS_FAMILY from '../../../theme/FontsFamily';
import COLORS from '../../../theme/Colors';
import { Button, Drawer, List, ListItem } from "@mui/material";

export const Container = styled("div")(props =>({
  zIndex: 11,
  position: props.layout === 'app' ? 'relative' : "absolute",
  display: "flex",
  flexDirection: "row",
  alignSelf: "flex-end",
  right: "3vw",
}));

export const MenuButton = styled(Button)(props => ({
  fontSize: "15px",
  fontFamily: FONTS_FAMILY.regular.body,
  color: props.layout === 'public' ? COLORS.white : COLORS.black,
}));

export const DrawerList = styled(List)({
  flex: 1,
  width: "200px",
  alignSelf: "center",
});

export const StyledDrawer = styled(Drawer)(props => ({
  '.MuiPaper-root': {
    backgroundColor: props.layout === 'public' ? COLORS.secondary : COLORS.white,
  }
}));

export const DrawerListItemContainer = styled(ListItem)(props => ({
  flex: 1,
  color: props.layout === 'public' ? COLORS.white : COLORS.black,
  "&:hover": {
    color: COLORS.white,
    backgroundColor: COLORS.primary,
  },
}));
export const DrawerListItemButton = styled(Button)({
  width: "100%",
});

export const ProfileImage = styled('img')({
  alignSelf: 'center',
  width: '100px',
  height: '100px',
  borderRadius: '100%',
  marginTop: '5px',
  backgroundColor: COLORS.white
});