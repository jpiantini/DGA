import { Carousel } from "react-bootstrap";
import "./Style/style.css";
import "../../../../theme/BootstrapStyles.scss";
import {
  DefaultButton,
  HomeTextContainer,
} from "../../styles/HomeStyles";
import { ButtonContainer, ImageContainer,Title,SubTitle} from "./Style/CarouselBootstrapStyle";
import { format,parse  } from 'date-fns'
import { es } from 'date-fns/locale'

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
                  <SubTitle>
                  {format(new Date(item.date.replace(" ", "T")), "dd 'de' MMMM yyyy" ,{ locale: es })  }
                  </SubTitle>
                  <Title>
                    {item.content}
                  </Title>
                  <ButtonContainer>
                    <DefaultButton onClick={() => window.open(item.notice_url, '_blank')} className="btnMore">
                      SABER MÁS
                    </DefaultButton>
                  </ButtonContainer>
                </HomeTextContainer>
              </ImageContainer>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
};
