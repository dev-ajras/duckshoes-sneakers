import useEmblaCarousel from 'embla-carousel-react';

function CarouselDetails({ arrayDetails }) {
  const [emblaRef] = useEmblaCarousel({ dragFree: true });

  function compare ( a, b ){ return a - b; }

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <ul className="flex gap-3 my-2 px-3">
        {
        arrayDetails &&
          arrayDetails.sort(compare).map((detail, idx) => (
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
