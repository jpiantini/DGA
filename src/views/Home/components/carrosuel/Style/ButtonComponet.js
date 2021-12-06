import { styled, width } from "@mui/system";
import COLORS from "../../../../../theme/Colors";

export const ButtonComponet = styled("div")((props) => ({
  width: "175px",
  position: "absolute",
  height: "35px",
  color: COLORS.white,
  fontFamily: "Fira Sans",
  borderRadius: "20px !important",

  "@media (max-width: 455px)": {
    borderRadius: "20px",
    position: "absolute",
    left: "5%",
    width: "150px",
    fontSize: "10px",
  },

  "@media (max-width: 1200px)": {
    borderRadius: "20px",
    position: "absolute",
    width: "150px",
    top: "62%",
    right: "80%",
  },
  "&:hover,&:focus,&:active": {
    color: COLORS.white,
    backgroundColor: COLORS.black,
    borderRadius: "20px",
  },
}));

/*
  position: absolute;
  width: 175px;
  height: 35px;
  color: #ffffff;
  background-color: #ed5f30;
  font-family: "Fira Sans";
  border-radius: 20px !important;
}
*/
