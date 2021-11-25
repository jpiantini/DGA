import  { useState } from 'react';
import { SliderData } from './SliderData';
import "./Style/CarrouselStyle.css";
import { MdChevronRight,MdChevronLeft } from "react-icons/md";

const ImageSlider = ({ children,slides }) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <section className='slider'>
      <MdChevronLeft className='left-arrow' onClick={prevSlide} />
      {children}
      <MdChevronRight className='right-arrow' onClick={nextSlide} />
      {SliderData.map((slide, index) => {
        return (
          <div
            className={index === current ? 'slide active' : 'slide'}
            key={index}
          >
            {index === current && (
             <img src={slide.image} alt='travel' className='img-responsive'  />
            )}
          </div>
        );
      })}
    </section>
  );
};

export default ImageSlider;