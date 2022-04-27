import { styled } from "@mui/system";
import { Button } from "@mui/material";
import COLORS from "../../../../../theme/Colors";
import FONTS_FAMILY from "../../../../../theme/FontsFamily";

export const Container = styled("div")({
  zIndex: 11,
  position: "absolute",
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  textAlign: 'center',
  justifyContent: 'space-evenly',
  width: '100%',
  "@media (min-width:320px)": {
    marginTop: "130px",
  },
  "@media (min-width:768px)": {
    marginTop: "100px",
  },
  "@media (min-width:1200px)": {
    marginTop: "70px",
  },
});

export const LineContainer = styled('div')({
  display: 'flex',
  position: 'relative',
  flexDirection: 'row',
  alignItems: 'center',
  width: '80%',
  maxWidth:'1920px',
  justifyContent: 'space-between',
  '@media (min-width:320px)': {
      flexDirection: 'row',
  },
  '@media (min-width:768px)': {
      flexDirection: 'row',
  },
  '@media (min-width:1200px)': {
      flexDirection: 'row',
  }
});


export const MenuButton = styled(Button)({
  fontFamily: FONTS_FAMILY.regular.title,
  color: COLORS.white,
  "@media (min-width:768px)": {
    fontSize: "12.5px",
  },
  "@media (min-width:1200px)": {
    fontSize: "17px",
  },
});

export const DrawerMenuContainer = styled("div")({
  display: "flex",
  zIndex: 11,
  position: "absolute",
  display: "flex",
  flexDirection: "row",
  alignSelf: "flex-end",
  alignItems:'center',
  marginTop: "130px",

});

export const Image = styled("img")({
  ':hover': {
    cursor: 'pointer',
  },
  "@media (min-width:320px)": {
    width: "200px",
    marginBottom:'10px',
  },
  "@media (min-width:768px)": {
    width: "220px",
  },
  "@media (min-width:1200px)": {
    width: "320px",
  },
});
