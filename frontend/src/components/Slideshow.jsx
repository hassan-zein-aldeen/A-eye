import React, { useState, useEffect } from 'react';

function Slideshow() {
  const [slides, setSlides] = useState(['Shop 1', 'Shop 2', 'Shop 3']);
  const [currentSlide, setCurrentSlide] = useState(0);

  function nextSlide() {
    setCurrentSlide((currentSlide + 1) % slides.length);
  }

  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 4000);

    return () => clearInterval(slideInterval);
  }, [currentSlide, slides.length]);

  return (
    <div className="slideshow-container">
      <div className='slide-wrapper'>
        {slides.map((slide, index) => (
          <p key={index} className={`slide ${index === currentSlide ? 'active' : ''}`}>
            {slide}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Slideshow;