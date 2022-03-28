import { styled } from "@mui/system";
import COLORS from "../../../../../theme/Colors";
import FONTS_FAMILY from "../../../../../theme/FontsFamily";

export const Image = styled("img")({
  margin: "25px",
  width: "20%",
  "@media (min-width:320px)": {
    width: "200px",
  },
  "@media (min-width:768px)": {
    width: "240px",
  },
  "@media (min-width:1200px)": {
    width: "300px",
  },
});

export const FooterContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  backgroundColor: COLORS.secondary,
  width: "100%",
  minHeight: "100%",
  justifyContent: "center",
  alignSelf: "flex-end",
});

export const LinkText = styled("a")({
  color: COLORS.white,
  fontSize: "12px",
  cursor: "pointer",
  fontFamily:FONTS_FAMILY.regular.body,
  margin: "3px",
  textDecoration: "none",
  "&:hover,&:focus": {
    textDecoration: "underline",
  },
});

export const FooterText = styled("p")({
  color: COLORS.white,
  fontSize: "12px",
  fontFamily:FONTS_FAMILY.regular.body
});

export const CenterContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  maxWidth:'1920px',
  alignSelf:'center',
  alignItems: "center",
});
