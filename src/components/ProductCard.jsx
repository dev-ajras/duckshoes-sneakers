import { Link } from 'react-router-dom';

import { MdFavoriteBorder } from 'react-icons/md';
import { AiOutlinePlusCircle } from 'react-icons/ai';

function ProductCard({ product }) {
  return (
    <Link
      to={`/products/${product.name}`}
      className="drop-shadow-md rounded-md bg-white p-2"
    >
      <img src={product.grid_picture_url} alt={product.name} />
      <h3>
        {product.name.length > 30
          ? `${product.name.substring(0, 30)}...`
          : product.name}
      </h3>
      <div className="flex justify-between mt-1">
        <strong>${product.retail_price_cents / 100}</strong>
        <div className="flex gap-2">
          <MdFavoriteBorder />
          <AiOutlinePlusCircle />
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
