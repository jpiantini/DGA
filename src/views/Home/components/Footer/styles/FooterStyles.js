import { styled } from "@mui/system";
import COLORS from "../../../../../theme/Colors";
import FONTS_FAMILY from "../../../../../theme/FontsFamily";

export const Title = styled("h3")({
  margin: 0,
  fontSize: "25px",
  color: COLORS.secondary,
  fontFamily: FONTS_FAMILY.regular.title,
  "@media (max-width:768px)": {
    fontSize: "20px",
  },
});

export const FooterContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  textAlign: "left",
  alignItems: "center",
  backgroundColor: COLORS.white,
  width: "100%",
  minHeight: "50vh",
  justifyContent: "center",
});

export const LinkText = styled("a")({
  color: COLORS.black,
  fontSize: "16px",
  cursor: "pointer",
  fontFamily: FONTS_FAMILY.regular.body,
  margin: "3px",
  textDecoration: "none",
  "&:hover,&:focus": {
    textDecoration: "underline",
  },
});

export const FooterText = styled("p")({
  color: COLORS.tertiary,
  fontSize: "15px",
  fontFamily: FONTS_FAMILY.regular.title,
});

export const CenterContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "80%",
  maxWidth:'1920px',
});

export const TitleDivider = styled("div")({
  height: "30px",
});
