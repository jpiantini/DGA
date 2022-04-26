import { styled } from "@mui/system";
import COLORS from "../../../theme/Colors";
import FONTS_FAMILY from "../../../theme/FontsFamily";

export const Image = styled("img")({
  margin: "25px",
  width: "130px",
});

export const CertificationsImage = styled("img")({
  width: "80px",
  height: '100px'
});

export const CertificationsContainer = styled("div")({
  display: "flex",
  flexDirection: "row",
  justifyContent: 'center',
  alignItems: 'center',
  alignSelf: 'center',
  
});

export const LogosContainer = styled("div")({
  display: "flex",

});

export const TextDivider = styled("div")({
  backgroundColor: COLORS.white,
  alignSelf: 'center',
  display: "flex",
  flexDirection: "column",
  width: '1px',
  height: '10px'
});

export const Divider = styled("div")({
  backgroundColor: COLORS.lightGray,
  alignSelf: 'center',
  display: "flex",
  flexDirection: "column",
  width: '1px',
  height: '100px'
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
  fontFamily: FONTS_FAMILY.regular.body,
  margin: "3px",
  textDecoration: "underline",
});

export const FooterText = styled("p")({
  margin: '4px',
  color: COLORS.white,
  fontSize: "15px",
  fontFamily: FONTS_FAMILY.regular.body
});

export const CenterContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  maxWidth: '1920px',
  alignSelf: 'center',
  alignItems: "center",
});
