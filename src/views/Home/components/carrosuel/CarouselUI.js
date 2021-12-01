import React from "react";
import { Slideshow, Slide, TextoSlide } from "./CarouselContainer";
import "./Style/style.css";
import styled from "styled-components";
import img1 from "../../../../assets/images/mockupImage3.png";
import img2 from "../../../../assets/images/mockupImage4.png";
import img3 from "../../../../assets/images/mockupImage5.png";
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
                  <SubTitle>{slide.content}</SubTitle>
                </HomeTextContainer>
              </Slide>
            </>
          );
        })}
      </Slideshow>
    </main>
  );
};

const Titulo = styled.h3`
  justify-conten: center;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 10px;

  z-index: 35;
`;
