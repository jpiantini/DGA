import { styled } from "@mui/system";
import COLORS from "../../../../../theme/Colors";
import { TextField } from "@mui/material";
import { isMobile } from "react-device-detect";

export const Title = styled("h3")({
  margin: 0,
  fontSize: "25px",
  color: COLORS.secondary,
  fontFamily: "Source Sans Pro",
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
  fontSize: "12px",
  cursor: "pointer",
  fontFamily: "Quicksand",
  margin: "3px",
  textDecoration: "none",
  "&:hover,&:focus": {
    textDecoration: "underline",
  },
});

export const FooterText = styled("p")({
  color: COLORS.tertiary,
  fontSize: "12px",
  fontFamily: "Source Sans Pro",
});

export const CenterContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "80%",
});

export const TitleDivider = styled("div")({
  height: "30px",
});
