import { styled } from "@mui/system";
import COLORS from "../../../../../theme/Colors";
import FONTS_FAMILY from "../../../../../theme/FontsFamily";

export const ImageContainer = styled("div")((props) => ({
  display:'flex',
  position:'relative',
  minHeight: "100vh",
  background: `url(${props.image})`,
  backgroundSize: "cover",
  boxShadow: "inset 0 0 0 2000px rgba(0, 0, 0, 0.5)",
}));


export const ButtonContainer = styled("div")({
  marginRight:'100% !important'
});

export const Title = styled("h1")({
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
    fontSize: "28px !important",
    height: "280px",
    WebkitLineClamp: 8, /* number of lines to show */
  },
  "@media (min-width:768px)": {
    fontSize: "35px !important",
    WebkitLineClamp: 6, /* number of lines to show */
    height: "250px",
  },
  "@media (min-width:1200px)": {
    fontSize: "50px !important",
    height: "280px",
    WebkitLineClamp: 5, /* number of lines to show */
  },
});

export const SubTitle = styled("h1")({
  zIndex: 10,
  width: "100%",
  color: COLORS.white,
  fontFamily: FONTS_FAMILY.regular.title,
  textAlign:'left',
  "@media (min-width:320px)": {
    fontSize: "18px !important",
  },
  "@media (min-width:768px)": {
    fontSize: "22px !important",
  },
  "@media (min-width:1200px)": {
    fontSize: "30px !important",

  },
});
