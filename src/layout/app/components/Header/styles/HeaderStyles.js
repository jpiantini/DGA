import { styled } from "@mui/system";
import { Button, List, ListItem } from "@mui/material";
import COLORS from "../../../../../theme/Colors";
import FONTS_FAMILY from "../../../../../theme/FontsFamily";

export const Container = styled("div")({
  display: "flex",
  flexDirection: "row",
  backgroundColor: COLORS.white,
  justifyContent: "space-around",
  alignItems: "center",
  minHeight: "90px",
  width: "100%",
});

export const MenuContainer = styled("div")({
  display: "flex",
  flexDirection: "row",
});

export const MenuButton = styled(Button)({
  fontSize: "17px",
  color: COLORS.black,
  fontFamily:FONTS_FAMILY.regular.title,
});

export const MenuDivider = styled("div")({
  width: "18px",
});
export const Image = styled("img")({
  "@media (min-width:320px)": {
    width: "200px",
  },
  "@media (min-width:768px)": {
    width: "220px",
  },
  "@media (min-width:1200px)": {
    width: "320px",
  },
});

export const DrawerList = styled(List)({
  flex: 1,
  width: "200px",
  backgroundColor: COLORS.white,
  alignSelf: "center",
});

export const DrawerListItemContainer = styled(ListItem)({
  flex: 1,
  color: COLORS.black,
});

export const DrawerListItemButton = styled(Button)({
  width: "100%",
});
