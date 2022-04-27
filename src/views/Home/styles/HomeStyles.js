import { fontSize, lineHeight, styled } from "@mui/system";
import COLORS from "../../../theme/Colors";
import { TextField, Button } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SearchIcon from "@mui/icons-material/Search";
import { Translate } from "@mui/icons-material";
import FONTS_FAMILY from "../../../theme/FontsFamily";
import {StyledTextInput} from "../../../theme/Styles";

export const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
});

export const HomeContainer = styled("div")((props) => ({
  display:'flex',
  flexDirection:'column',
  position:'relative',
  minHeight: "100vh",
  //paddingTop:'300px',
 // paddingBottom:'100px',
  background: `url(${props.image})`,
  backgroundSize: "cover",
  boxShadow: "inset 0 0 0 2000px rgba(0, 0, 0, 0.5)",
  alignItems:'center',
  justifyContent:'center',
  textAlign:'center'
}));

export const HomeCenterContent = styled("div")((props) => ({
  display:'flex',
  flexDirection:'column',
  height:'600px',
  alignItems:'center',
  justifyContent:'center'

}));

export const ContainerVideo = styled("div")(props => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  maxWidth:'1920px',
  alignSelf:'center',
  minHeight: "70vh",
  justifyContent: "center",
}));

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
    minHeight: "600px",
  },
});

export const HomeTextContainer = styled("div")({
  display:'flex',
  flexDirection: "column",
  position: "relative",
  marginLeft: "15%",
  marginTop: "8%",
  height: "500px",
  alignSelf: "center",
  fontSize: "15px",
  width: "100%",
  justifyContent:'center'
});
 
export const DefaultButton = styled(Button)({
  color: COLORS.white,
  backgroundColor: COLORS.primary,
  borderRadius: "20px",
  fontSize: "15px !important",
  fontFamily:`${FONTS_FAMILY.regular.body} !important`,
  height:'38px',
  "&:hover,&:focus,&:active": {
    color: COLORS.white,
    backgroundColor: COLORS.black,
  },
  "@media (min-width:320px)": {
    width: "180px",
  },
  "@media (min-width:768px)": {
    width: "230px",
  },
  "@media (min-width:1200px)": {
    width: "230px",
  },
});

export const HomeTitle = styled("h1")({
  zIndex: 10,
  width: "55%",
  color: COLORS.white,
  fontFamily: FONTS_FAMILY.regular.title,
  textAlign:'left',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  '-webkit-box-orient': 'vertical',
  "@media (min-width:320px)": {
    fontSize: "25px",
    height: "280px",
    WebkitLineClamp: 8, /* number of lines to show */
  },
  "@media (min-width:768px)": {
    fontSize: "30px",
    WebkitLineClamp: 6, /* number of lines to show */
    height: "250px",
  },
  "@media (min-width:1200px)": {
    fontSize: "50px",
    height: "200px",
    WebkitLineClamp: 5, /* number of lines to show */
  },
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
  wordWrap:'break-word',
  margin: 0,
  textAlign: "center",
  color: COLORS.white,
  fontFamily: FONTS_FAMILY.bold.title,
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
  fontFamily: FONTS_FAMILY.bold.title,
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

export const SearcherSubTitle = styled("p")({
  color: COLORS.secondary,
  textAlign: "center",
  marginBottom: "10px",
  alignSelf:'center',
  fontFamily: FONTS_FAMILY.regular.body,
  "@media (min-width:320px)": {
    fontSize: "15px",
    width:'350px',
  },
  "@media (min-width:768px)": {
    fontSize: "15px",
    width:'500px',
  },
  "@media (min-width:1200px)": {
    fontSize: "16px",
    width:'700px',
  },
});

export const SearcherTitle = styled("h3")({
  color: COLORS.secondary,
  margin: "0",
  textAlign: "center",
  fontSize: "30px",
  fontFamily: FONTS_FAMILY.regular.title,
  "@media (max-width:768px)": {
    fontSize: "23px",
  },
});

export const AnalyticsContainer = styled("div")({
  display: "flex",
  flexDirection: "row",
  alignSelf: "center",
  width: "100%",
  maxWidth: "1920px",
  justifyContent: "space-evenly",
});

export const SearcherContainer = styled("div")({
  borderRadius:'10px',
  "@media (min-width:320px)": {
    width:'300px',
  },
  "@media (min-width:768px)": {
    width:'600px',
  },
  "@media (min-width:1200px)": {
    width:'800px',
  },
});

export const SelectorContainer = styled("div")({
  width: "100%",
  alignItems: "flex-start",
  alignSelf: "center",
  padding: "1%",
});

export const StyledSearchIconForSearcher = styled(SearchIcon)({
  color:COLORS.white
});

export const SearchTextInput = styled(TextField)({
  width: '100%',
  alignSelf: 'center',
  borderWidth: '5px',
  color:COLORS.white,
  '& .MuiInputBase-input ': {
    width: '100%',
    fontSize: '17px',
 //   backgroundColor: COLORS.white,
    padding:10,
    color:COLORS.white,
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: COLORS.white,
      borderRadius: '50px',
      minHeight: '45px',
      color:COLORS.white,
    },
    '&:hover fieldset': {
      borderColor: COLORS.white,
      color:COLORS.white,
    },
    '&.Mui-focused fieldset': {
      borderColor: COLORS.white,
      borderWidth: '1px',
    },
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

export const WhiteTitle = styled("h1")({
  margin: "10px",
  fontSize: "50px",
  textAlign: "center",
  color: COLORS.white,
  fontFamily: FONTS_FAMILY.regular.title,
  "@media (min-width:320px)": {
    fontSize: "40px",
  },
  "@media (min-width:768px)": {
    fontSize: "50px",
  },
  "@media (min-width:1200px)": {
    fontSize: "60px",
  },
});

export const WhiteSubtitle = styled("h1")({
  margin: "10px",
  fontSize: "20px",
  textAlign: "center",
  color: COLORS.white,
  fontFamily: FONTS_FAMILY.regular.body,
  //  textShadow: '2px 2px 10px #000000',
  "@media (max-width:768px)": {
    fontSize: "20px",
  },
});

export const CenterContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "85%",
  maxWidth: "1920px",
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
