import { useState, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';

function CarouselDetails({ arrayDetails }) {
  const [emblaRef] = useEmblaCarousel({ dragFree: true });

  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const [searchParams, setSearchParams] = useSearchParams();
  const sizeParam = searchParams.get('size');
  const colorParam = searchParams.get('color');

  const handleSize = (detail) => {
    navigate(`${pathname}?color=${colorParam}&size=${detail}`);
  };

  function compare(a, b) {
    return a - b;
  }

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <ul className="flex gap-3 my-2 px-3">
        {arrayDetails &&
          arrayDetails.sort(compare).map((detail, idx) => (
            <li
              className={
                detail == sizeParam
                  ? 'p-3 bg-white border-black border ring ring-blue-500 ring-offset-2 rounded-md border-opacity-30'
                  : 'p-3 bg-white border-black border rounded-md border-opacity-30'
              }
              key={idx}
              onClick={() => handleSize(detail)}
            >
              <p className="">{detail}</p>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default CarouselDetails;
