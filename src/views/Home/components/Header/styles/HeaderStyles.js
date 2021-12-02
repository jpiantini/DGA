import { styled } from "@mui/system";
import { Button, List, ListItem } from "@mui/material";
import COLORS from "../../../../../theme/Colors";

export const Container = styled("div")({
  zIndex: 11,
  position: "absolute",
  display: "flex",
  flexDirection: "row",
  alignSelf: "flex-end",
  marginTop: "40px",
  marginRight: "14vw",
  "@media (min-width:360px)": {
    right: "3vw",
    marginTop: "80px",
  },
  "@media (min-width:768px)": {
    right: "3vw",
    marginTop: "100px",
  },
  "@media (min-width:1200px)": {
    marginTop: "70px",
  },
});

export const MenuButton = styled(Button)({
  "@media (min-width:1200px)": {
    fontSize: "15px",
  },
  color: COLORS.white,
});

export const DrawerList = styled(List)({
  flex: 1,
  width: "200px",
  backgroundColor: COLORS.secondary,
  alignSelf: "center",
});
export const DrawerListItemContainer = styled(ListItem)({
  flex: 1,
  color: COLORS.white,
  "&:hover": {
    color: COLORS.black,
    backgroundColor: COLORS.white,
  },
});
export const DrawerListItemButton = styled(Button)({
  width: "100%",
});
