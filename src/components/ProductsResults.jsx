import React from 'react';
import queryString from 'query-string';

function ProductsResults() {
  const { q } = queryString.parse(location.search);
  console.log(q);

  return (
    <>
      <h3>Resultados de "{q}":</h3>
    </>
  );
}

export default ProductsResults;
