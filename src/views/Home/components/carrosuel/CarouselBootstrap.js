import React from "react";

import { Carousel } from "react-bootstrap";

import "./Style/style.css";
import "./Style/CarouselBootstrapStyle.scss";

import { HomeTextContainer, HomeTitle } from "../../styles/HomeStyles";
import { ImageContainer } from "./Style/CarouselBootstrapStyle";

export const CarouselBootstrap = (datos) => {
  console.log(datos);
  return (
    <div className="use-bootstrap">
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
    </div>
  );
};
