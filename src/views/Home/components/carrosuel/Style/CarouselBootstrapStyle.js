import { styled } from "@mui/system";

export const ImageContainer = styled("div")((props) => ({
  minHeight: "100vh",
  background: `url(${props.image})`,
  backgroundSize: "cover",
  boxShadow: "inset 0 0 0 2000px rgba(0, 0, 0, 0.5)",
}));
