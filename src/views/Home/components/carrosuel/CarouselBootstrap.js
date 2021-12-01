import React from "react";
import img1 from "../../../../assets/images/mockupImage1.jpg";
import { Carousel, Container, Row } from "react-bootstrap";
import "./Style/style.css";
import {
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
            <img className="d-block w-100" src={item.image} alt="First slide" />
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
