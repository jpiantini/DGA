import React from "react";
import img1 from "../../../../assets/images/mockupImage1.jpg";
import { Carousel, Container, Row } from "react-bootstrap";
import "./Style/style.css";
import {
  DarkOverlay,
  HomeContainer,
  HomeTextContainer,
  HomeTitle,
} from "../../styles/HomeStyles";
export const CarouselBootstrap = (datos) => {
  console.log(datos);
  return (
    <Carousel className="carouselMain">
      {datos.datos.map((item, index) => {
        return (
          <Carousel.Item className="item">
            <div
              className="bg-img"
              id="imagenes"
              src={item.image}
              alt="First slide"
            ></div>

            <Carousel.Caption>
              <HomeTextContainer>
                <HomeTitle>{item.content}</HomeTitle>
              </HomeTextContainer>
            </Carousel.Caption>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
};
