import  { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ImageCarousel = ({ images, mode = 'fade' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = images.length;

  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);
  
  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const getSlideClass = (index) => {
    switch (mode) {
      case 'fade':
        return `absolute inset-0 transition-opacity duration-500 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`;
      case 'scale':
        return `absolute inset-0 transition-transform duration-500 ${index === currentIndex ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`;
      case 'slide':
        return `transform transition-transform duration-500 ${index === currentIndex ? 'translate-x-0' : 'translate-x-full'}`;
        default:
        return '';
    }
  };

  return (
    <div className="relative w-full max-w-lg mx-auto overflow-hidden rounded-2xl shadow-lg">
       
      <div className="relative h-64">
        {images.map((image, index) => (
          <div key={index} className={getSlideClass(index)}>
            <img src={image} alt={`Slide ${index + 1}`} className="w-full h-64 object-cover" />
          </div>
        ))}
      </div>

      {/* Controls */}
      <button onClick={goToPrevious} className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full hover:bg-opacity-75">
        <ChevronLeft />
      </button>
      <button onClick={goToNext} className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full hover:bg-opacity-75">
        <ChevronRight />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-white' : 'bg-gray-400'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;