import { fontSize, lineHeight, styled } from "@mui/system";
import COLORS from "../../../theme/Colors";
import { TextField, Button } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SearchIcon from "@mui/icons-material/Search";
import { Translate } from "@mui/icons-material";

export const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
});
export const HomeContainer = styled("div")({
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  width: "100%",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
});
export const ContainerBackground = styled("div")({
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  width: "100%",
  minHeight: "70vh",
  justifyContent: "center",
});

export const MediumContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  justifyContent: "center",
  "@media (min-width:360px)": {
    minHeight: "270px",
  },
  "@media (min-width:768px)": {
    minHeight: "300px",
  },
  "@media (min-width:1200px)": {
    minHeight: "380px",
  },
});

export const HomeTextContainer = styled("div")({
  flexDirection: "column",
  position: "relative",
  marginLeft: "15%",
  marginTop: "15%",
  height: "500px",
  alignSelf: "center",

  "@media (min-width:360px)": {
    width: "100%",
  },
  "@media (min-width:768px)": {
    width: "100%",
  },
  "@media (min-width:1200px)": {
    fontSize: "15px",

    width: "100%",
  },
});

export const DefaultButton = styled(Button)({
  color: COLORS.white,
  backgroundColor: COLORS.primary,

  "&:hover,&:focus,&:active": {
    color: COLORS.white,
    backgroundColor: COLORS.black,
  },
  "@media (min-width:360px)": {
    fontSize: "15px",
    borderRadius: "20px",
    width: "150px",
  },
  "@media (min-width:768px)": {
    fontSize: "15px",
    borderRadius: "20px",
    width: "150px",
  },
  "@media (min-width:1200px)": {
    fontSize: "15px",
    borderRadius: "20px",
    width: "230px",
  },
});

export const HomeTitle = styled("h1")({
  zIndex: 10,
  position: "absolute",

  top: "5%",
  width: "55%",
  color: COLORS.white,
  fontFamily: "Fira Sans",
  "@media (max-width:455px)": {
    fontSize: "25px",
    width: "80%",
    top: "15%",
    overflowX: "ellipsis",
    overflow: "hidden",
    color: COLORS.RED,
  },
  "@media (min-width:768px)": {
    fontSize: "30px",
  },
  "@media (max-width:1200px)": {
    fontSize: "50px",
  },
});

export const HomeSubTitle = styled("h3")({
  width: "50%",
  color: COLORS.white,
  fontFamily: "Nunito Sans",
  "@media (max-width:400px)": {
    fontSize: "10px",
  },
  "@media (min-width:360px)": {
    fontSize: "13px",
  },
  "@media (min-width:768px)": {
    fontSize: "14px",
  },
  "@media (min-width:1200px)": {
    fontSize: "18px",
  },
});

export const DarkOverlay = styled("div")({
  zIndex: 1,
  position: "relative",
  backgroundColor: "rgba(0, 0, 0, 0.35)",
  top: 0,
  left: 0,
  width: "100%",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-evenly",
});

export const Section = styled("section")({
  marginBlock: "0.67em",
  overflowX: "",
  position: "absolute",
  display: "inline-block",
  top: "30%",
  left: "20%",
  zIndex: 30,
  justifyContent: "center",
  flexDirection: "column",
  /* test*/
  height: "500px",
  textDecoration: "none",
  minHeight: "300px",
  width: "50%",
  "@media (max-width:360px)": {
    fontSize: "8px",
    display: "block",
  },
  "@media (min-width:768px)": {
    fontSize: "14px",
    top: "30%",
    left: "20%",
  },
  "@media (min-width:1200px)": {
    fontSize: "18px",
  },
  "@media (min-width:2048px)": {
    fontSize: "30px",
  },
  "@media (min-width:3840px)": {
    fontSize: "55px",
  },
});

export const SubtitleTest = styled("h3")({
  position: "relative",
  margin: 0,

  bottom: "2%",
  width: "50%",
  color: COLORS.white,
  fontFamily: "Nunito Sans",
  "@media (min-width:360px)": {
    fontSize: "13px",
  },
  "@media (min-width:768px)": {
    fontSize: "14px",
  },
  "@media (min-width:1200px)": {
    fontSize: "18px",
  },
  "@media (min-width:2048px)": {
    fontSize: "30px",
  },
  "@media (min-width:3840px)": {
    fontSize: "55px",
  },
});
export const StyledDescriptionIcon = styled(DescriptionIcon)({
  color: COLORS.primary,
  "@media (min-width:320px)": {
    fontSize: "50px",
  },
  "@media (min-width:768px)": {
    fontSize: "70px",
  },
  "@media (min-width:1200px)": {
    fontSize: "100px",
  },
});

export const StyledPersonAddIcon = styled(PersonAddIcon)({
  color: COLORS.primary,
  "@media (min-width:320px)": {
    fontSize: "50px",
  },
  "@media (min-width:768px)": {
    fontSize: "70px",
  },
  "@media (min-width:1200px)": {
    fontSize: "100px",
  },
});

export const StyledSearchIcon = styled(SearchIcon)({
  color: COLORS.primary,
  "@media (min-width:320px)": {
    fontSize: "50px",
  },
  "@media (min-width:768px)": {
    fontSize: "70px",
  },
  "@media (min-width:1200px)": {
    fontSize: "100px",
  },
});

export const Title = styled("h1")({
  margin: 0,
  textAlign: "center",
  color: COLORS.white,
  fontFamily: "Source Sans Pro",
  "@media (min-width:320px)": {
    fontSize: "30px",
  },
  "@media (min-width:768px)": {
    fontSize: "40px",
  },
  "@media (min-width:1200px)": {
    fontSize: "50px",
  },
});

export const SubTitle = styled("h3")({
  margin: 0,
  textAlign: "center",
  color: COLORS.white,
  fontFamily: "Source Sans Pro",
  "@media (min-width:320px)": {
    fontSize: "15px",
  },
  "@media (min-width:768px)": {
    fontSize: "18px",
  },
  "@media (min-width:1200px)": {
    fontSize: "20px",
  },
});

export const SearcherSubTitle = styled("h3")({
  color: COLORS.secondary,
  marginBottom: "10px",
  textAlign: "left",
  fontFamily: "Nunito Sans",
  "@media (min-width:320px)": {
    fontSize: "15px",
  },
  "@media (min-width:768px)": {
    fontSize: "15px",
  },
  "@media (min-width:1200px)": {
    fontSize: "16px",
  },
});

export const SearcherTitle = styled("h3")({
  color: COLORS.secondary,
  margin: "0",
  textAlign: "left",
  fontSize: "30px",
  fontFamily: "Nunito Sans",
  "@media (max-width:768px)": {
    fontSize: "23px",
  },
});

export const AnalyticsContainer = styled("div")({
  display: "flex",
  flexDirection: "row",
  alignSelf: "center",
  width: "100%",
  justifyContent: "space-evenly",
});

export const SearcherContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "83%",
  alignItems: "flex-start",
  alignSelf: "center",
});

export const SelectorContainer = styled("div")({
  width: "100%",
  alignItems: "flex-start",
  alignSelf: "center",
  padding: "1%",
});

export const SelectorsSearcherContainer = styled("div")({
  display: "flex",
  flexDirection: "row",
  alignSelf: "center",
  width: "85%",
  justifyContent: "space-evenly",
  "@media (max-width:830px)": {
    flexDirection: "column",
  },
});

export const StyledSearchIconForSearcher = styled(SearchIcon)({});

export const SearchTextInput = styled(TextField)({
  width: "100%",
  alignSelf: "center",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: COLORS.secondary,
      borderRadius: 0,
    },
    "&:hover fieldset": {
      borderColor: COLORS.secondary,
      borderRadius: 0,
    },
    "&.Mui-focused fieldset": {
      borderColor: COLORS.secondary,
      borderWidth: "1px",
      borderRadius: 0,
    },
  },
});

export const SearchSelect = styled(TextField)({
  alignSelf: "start",
  width: "100%",
  "& .MuiMenuItem-root": {
    fontSize: "100px",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: COLORS.secondary,
      borderRadius: 0,
    },
    "&:hover fieldset": {
      borderColor: COLORS.secondary,
      borderRadius: 0,
    },
    "&.Mui-focused fieldset": {
      borderColor: COLORS.secondary,
      borderWidth: "1px",
      borderRadius: 0,
    },
  },
  "@media (max-width:830px)": {
    width: "100%",
    paddingBottom: "5px",
  },
});

export const ServicesListContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  width: "100%",
  minHeight: "100vh",
});

export const ServicesTitle = styled("h1")({
  fontSize: "50px",
  textAlign: "center",
  color: COLORS.white,
  fontFamily: "Source Sans Pro",
  //   textShadow: '2px 2px 10px #000000',
  "@media (max-width:768px)": {
    fontSize: "30px",
  },
});

export const ServicesSubtitle = styled("h1")({
  fontSize: "30px",
  textAlign: "center",
  color: COLORS.white,
  fontFamily: "Source Sans Pro",
  //  textShadow: '2px 2px 10px #000000',
  "@media (max-width:768px)": {
    fontSize: "20px",
  },
});

export const LinkText = styled("a")({
  color: COLORS.white,
  fontSize: "12px",
  fontFamily: "Quicksand",
  margin: "3px",
  textDecoration: "none",
  "&:hover,&:focus": {
    textDecoration: "underline",
  },
});

export const CenterContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "85%",
  alignSelf: "center",
  padding: "10px",
});

export const CardsContainer = styled("div")({
  display: "flex",
  flexDirection: "row",
  "@media (min-width:320px)": {
    flexDirection: "column",
  },
  "@media (min-width:768px)": {
    flexDirection: "row",
  },
  "@media (min-width:1200px)": {
    flexDirection: "row",
  },
});

export const CardsDivider = styled("div")({
  "@media (min-width:320px)": {
    height: "25px",
  },
  "@media (min-width:768px)": {
    width: "10%",
  },
  "@media (min-width:1200px)": {
    width: "10%",
  },
});
