import React from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from './ProductCard';

function ProductDetails() {
  const { productName } = useParams();

  // Aquí puedes utilizar el nombre del producto para realizar la consulta o cargar los detalles del producto

  return (
    <div>
      <h2>Detalles del producto: {productName} </h2>
    </div>
  );
}

export default ProductDetails;
