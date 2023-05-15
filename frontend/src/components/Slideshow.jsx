import React, { useState, useEffect } from 'react';

function Slideshow() {
  const [slides, setSlides] = useState
  (['Outstanding service! Your attention to detail and promptness were impressive.',
   'I am extremely satisfied with the service you provided. Thank you!',
    'Your service exceeded my expectations, delivering excellent results. Thank you!']);
  const [currentSlide, setCurrentSlide] = useState(0);

  function nextSlide() {
    setCurrentSlide((currentSlide + 1) % slides.length);
  }

  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 3000);

    return () => clearInterval(slideInterval);
  }, [currentSlide, slides.length]);

  return (
    <div className="slideshow-container">
      <div className='slide-wrapper'>
        {slides.map((slide, index) => (
          <p style={{fontSize:"1.5rem"}} key={index} className={`slide ${index === currentSlide ? 'active' : ''}`}>
            {slide}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Slideshow;