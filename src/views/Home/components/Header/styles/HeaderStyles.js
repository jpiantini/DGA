import { styled } from "@mui/system";
import { Button} from "@mui/material";
import COLORS from "../../../../../theme/Colors";
import FONTS_FAMILY from "../../../../../theme/FontsFamily";

export const Container = styled("div")({
  zIndex: 11,
  position: "absolute",
  display: "flex",
  flexDirection: "row",
  alignSelf: "flex-end",
  marginTop: "40px",
  marginRight: "7%",
  "@media (min-width:360px)": {
    right: "3%",
    marginTop: "80px",
  },
  "@media (min-width:768px)": {
    right: "3%",
    marginTop: "100px",
  },
  "@media (min-width:1200px)": {
    marginTop: "70px",
  },
});


export const MenuButton = styled(Button)({
    fontSize: "15px",
    fontFamily: FONTS_FAMILY.regular.body,
    color: COLORS.white,
});

export const DrawerMenuContainer = styled("div")({
  display: "flex",
  zIndex: 11,
  position: "absolute",
  display: "flex",
  flexDirection: "row",
  alignSelf: "flex-end",
  marginTop: "130px",

});
