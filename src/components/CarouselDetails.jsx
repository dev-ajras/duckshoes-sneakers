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
    navigate(`${pathname}?color=${colorParam}&size=${detail}`, {
      replace: true,
    });
  };

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <ul className="flex gap-3 my-2 px-3 sm:gap-5 sm:my-3 sm:px-5">
        {arrayDetails &&
          arrayDetails.map((detail, idx) => (
            <li
              className={
                detail == sizeParam
                  ? 'p-3 bg-white border-black border ring ring-blue-500 ring-offset-2 rounded-md border-opacity-30 sm:p-5 sm:text-2xl sm:ring-offset-4'
                  : 'p-3 bg-white border-black border rounded-md border-opacity-30 sm:p-5 sm:text-2xl'
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
