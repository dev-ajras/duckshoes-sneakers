import { useParams } from "react-router-dom";

function EditProduct() {
  const { productId } = useParams();
  return (
    <div>
      <h3>Editar producto</h3>
      <h3>{productId}</h3>
    </div>
  );
}

export default EditProduct;
