import useEmblaCarousel from 'embla-carousel-react';

function CarouselDetails({ arrayDetails }) {
  const [emblaRef] = useEmblaCarousel({ dragFree: true });

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <ul className="flex gap-3 my-2 px-3">
        {arrayDetails &&
          arrayDetails.map((detail, idx) => (
            <li
              className="p-3 bg-white border-black border rounded-md border-opacity-30"
              key={idx}
            >
              <p className="">{detail}</p>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default CarouselDetails;
