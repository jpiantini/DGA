import { Carousel } from "react-bootstrap";
import "./Style/style.css";
import "./Style/CarouselBootstrapStyle.scss";
import {
  DefaultButton,
  HomeTextContainer,
  HomeTitle,
} from "../../styles/HomeStyles";
import { ImageContainer } from "./Style/CarouselBootstrapStyle";

export const CarouselBootstrap = (data) => {
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
        {data.data.map((item, index) => {
          return (
            <Carousel.Item key={index} className="item">
              <ImageContainer image={item.image}>
                <HomeTextContainer>
                  <HomeTitle>{item.content}</HomeTitle>
                  <div className="containerBtn">
                    
                    <DefaultButton className="btnMore">
                      SABER MÁS
                    </DefaultButton>
                  </div>
                </HomeTextContainer>
              </ImageContainer>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
};
