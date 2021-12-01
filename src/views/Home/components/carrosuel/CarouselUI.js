import React from "react";
import { Slideshow, Slide, TextoSlide } from "./CarouselContainer";
import "./Style/style.css";
import styled from "styled-components";

import { HomeTextContainer, SubTitle } from "../../styles/HomeStyles";
export const CarouselUI = (datos) => {
  console.log("DATOS====", datos);
  /*const localToArray = (array) => {
    if (!Array.isArray(array)) {
      return [];
    }
    return array;
  };
*/

  //{ localToArray(datos.datos).map}
  /*
  const repApi = datos.data.map(({ content, date, image, title }) => {
    return { content, date, image, title };
  });
  console.log(repApi.content);
*/
  return (
    <main>
      <Slideshow
        controles={true}
        autoplay={true}
        velocidad="500"
        intervalo="500"
      >
        {datos.datos.map((slide, index) => {
          return (
            <>
              <Slide>
                <img src={slide.image} alt="" />

                <HomeTextContainer>
                  <Titulo>{slide.content}</Titulo>
                </HomeTextContainer>
              </Slide>
            </>
          );
        })}
      </Slideshow>
    </main>
  );
};

const Titulo = styled.h1`
  color: white;
  position: absolute;
  justify-conten: center;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 10px;
  margin: 10px;
  width: 45%;
  fontfamily: Fira Sans;
  bottom: 50%;
  z-index: 355;
`;
