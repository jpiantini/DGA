import React from "react";
import { Slideshow, Slide, TextoSlide } from "./CarouselContainer";
import "./Style/style.css";
import styled from "styled-components";
import img1 from "../../../../assets/images/mockupImage3.png";
import img2 from "../../../../assets/images/mockupImage4.png";

export const CarouselUI = () => {
  return (
    <main>
      <Slideshow
        controles={true}
        autoplay={true}
        velocidad="3000"
        intervalo="5000"
      >
        <Slide>
          <a href="https://www.falconmaters.com">
            <img src={img1} alt="" />
          </a>
          <TextoSlide colorFondo="navy">
            <p>15% descuento en productos Apple</p>
          </TextoSlide>
        </Slide>
        <Slide>
          <a href="https://www.falconmaters.com">
            <img src={img2} alt="" />
          </a>
          <TextoSlide>
            <p>15% descuento en productos Apple</p>
          </TextoSlide>
        </Slide>
      </Slideshow>
    </main>
  );
};

const Titulo = styled.p`
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 10px;
`;
