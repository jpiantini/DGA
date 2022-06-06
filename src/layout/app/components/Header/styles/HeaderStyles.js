import { styled } from "@mui/system";
import { Button } from "@mui/material";
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

export const LineContainer = styled('div')({
  display: 'flex',
  position: 'relative',
  flexDirection: 'row',
  alignItems: 'center',
  width: '80%',
  maxWidth:'1920px',
  justifyContent: 'space-between',
});

export const MenuContainer = styled("div")({
  display: "flex",
  flexDirection: "row",
});

export const DrawerMenuContainer = styled("div")({
  display: "flex",
  flexDirection: "row",
});

export const MenuButton = styled(Button)({
  color: COLORS.black,
  fontFamily: FONTS_FAMILY.regular.title,
  "@media (min-width:768px)": {
    fontSize: "12.5px",
  },
  "@media (min-width:1200px)": {
    fontSize: "17px",
  },
});

export const MenuDivider = styled("div")({
  width: "18px",
});
export const Image = styled("img")({
  ':hover': {
    cursor: 'pointer',
  },
  "@media (min-width:320px)": {
    width: "170px",
    padding:'20px'
    },
  "@media (min-width:768px)": {
    width: "170px",
    padding:'20px'
    },
  "@media (min-width:1200px)": {
    width: "170px",
    padding:'20px'
  },
});
