import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

import "./Slider.scss";
import { useState } from "react";

function Slider({ images }) {
  const [imageIndex, setImageIndex] = useState(null);

  const changeSlide = (direction) => {
    setImageIndex((prev) => {
      if (direction === "left") {
        return prev === 0 ? images.length - 1 : prev - 1;
      } else {
        return prev === images.length - 1 ? 0 : prev + 1;
      }
    });
  };

  return (
    <div className="slider">
      {imageIndex !== null && (
        <div className="fullSlider">
          <div className="arrow">
            <FaArrowLeft className="icon" onClick={() => changeSlide("left")} />
          </div>

          <div className="imageContainer">
            <img src={images[imageIndex]} alt="" />
          </div>

          <div className="arrow">
            <FaArrowRight
              className="icon"
              onClick={() => changeSlide("right")}
            />
          </div>
          <RxCross2 className="close" onClick={() => setImageIndex(null)} />
        </div>
      )}
      <div className="bigImage">
        <img src={images[0]} alt="" onClick={() => setImageIndex(0)} />
      </div>
      <div className="smallImages">
        {images.slice(1).map((image, index) => (
          <img
            src={image}
            alt=""
            key={index}
            onClick={() => setImageIndex(index + 1)}
          />
        ))}
      </div>
    </div>
  );
}

export default Slider;
