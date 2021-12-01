import React from "react";

import Carousel from "react-bootstrap/Carousel";

import "./Style/style.css";
import { HomeTextContainer, HomeTitle } from "../../styles/HomeStyles";
import { ImageContainer } from "./CarouselBootstrapStyle";
export const CarouselBootstrap = (datos) => {
  console.log(datos);
  return (
    <Carousel className="carouselMain">
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
  );
};
