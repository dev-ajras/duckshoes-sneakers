import { MdFavoriteBorder } from 'react-icons/md';
import { AiOutlinePlusCircle } from 'react-icons/ai';

function ProductCard({ product }) {
  return (
    <article className="drop-shadow-md rounded-md bg-white p-2">
      <img src={product.main_picture_url} alt={product.name} />
      <h3>{product.name}</h3>
      <div className="flex justify-between">
        <strong>${product.retail_price_cents / 100}</strong>
        <div className="flex gap-2">
          <MdFavoriteBorder />
          <AiOutlinePlusCircle />
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
