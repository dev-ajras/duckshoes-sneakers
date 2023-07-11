import { useContext } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ProductsContext } from '../context/ProductsProvider';

function Carousel() {
  const products = useContext(ProductsContext);
  const [emblaRef] = useEmblaCarousel({ dragFree: true });

  return (
    <div className="" ref={emblaRef}>
      <div className="flex ">
        {products.slice(20, 30).map((product) => (
          <div className="w-full flex-[0_0_43%]" key={product.id}>
            <img
              className="w-full"
              src={product.grid_picture_url}
              alt={product.name}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Carousel;
