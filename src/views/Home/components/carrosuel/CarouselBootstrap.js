import { Carousel } from "react-bootstrap";
import "./Style/style.css";
import "./Style/CarouselBootstrapStyle.scss";
import { HomeTextContainer, HomeTitle } from "../../styles/HomeStyles";
import { ImageContainer } from "./Style/CarouselBootstrapStyle";

export const CarouselBootstrap = (datos) => {
  const directionButtons = (direction) => {
    if (direction === "Next") {
      return (
        <span id="next" aria-hidden="true" className="material-icons">
          {" "}
          arrow_forward_ios
        </span>
      );
    } else if (direction === "Previous") {
      return (
        <span id="back" aria-hidden="true" className="material-icons">
          {" "}
          arrow_back_ios
        </span>
      );
    }
  };

  return (
    <div className="use-bootstrap">
      <Carousel
        className="carouselMain"
        nextLabel={"Next"}
        prevLabel={"Previous"}
        nextIcon={directionButtons("Next")}
        prevIcon={directionButtons("Previous")}
      >
        {datos.datos.map((item, index) => {
          return (
            <Carousel.Item className="item">
              <ImageContainer image={item.image} />

              <Carousel.Caption>
                <HomeTextContainer>
                  <HomeTitle>{item.content}</HomeTitle>
                </HomeTextContainer>
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
};
