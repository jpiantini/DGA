import  { useState } from 'react';
import { SliderData } from './SliderData';
import "./Style/CarrouselStyle.css";
import { MdChevronRight,MdChevronLeft } from "react-icons/md";
import Icon from '@mui/material/Icon';
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
     
      <span className="material-icons"  id="back" onClick={prevSlide}>
arrow_back_ios
</span>
<span className="material-icons" id="forward" onClick={nextSlide}>
arrow_forward_ios
</span>

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