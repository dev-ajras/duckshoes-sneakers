import { useEffect, useState } from "react";
import axios from "axios";
import { BiSolidEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

function AllProducts() {
  const [adminProducts, setAdminProducts] = useState([]);

  const baseUrl = "https://www.api.duckshoes.com.ar/";

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get(baseUrl + "products?page=1");
      console.log(response);
      setAdminProducts(response.data.products);
    };
    fetchProducts();
  }, []);

  return (
    <div className="shadow">
      <div className="grid grid-cols-9 bg-gray-50 p-5 font-normal">
        <div className="text-center col-span-2">Imágen</div>
        <div className="text-center col-span-2">Sku</div>
        <div className="text-center col-span-2">Precio</div>
        <div className="text-center col-span-2">Estado</div>
      </div>
      {adminProducts.map((product) => (
        <div
          key={product.id}
          className="grid grid-cols-9 place-items-center bg-white p-2 mb-0.5"
        >
          <div className="flex justify-center items-center col-span-2">
            <img
              className="w-20 h-20 object-contain"
              src={product.image}
              alt={product.sku}
            />
          </div>
          <div className="text-center col-span-2">{product.sku}</div>
          <div className="text-center col-span-2">{product.price}</div>
          <div className="text-center col-span-2">
            {product.active && (
              <div className="flex justify-evenly items-center">
                <span className="bg-green-100 p-3 text-green-800 rounded">
                  Publicado
                </span>
              </div>
            )}
          </div>
          <div className="flex gap-3">
            <Link to={`/admin/editar-producto/${product.id}`}>
              <BiSolidEdit className="w-7 h-7" />
            </Link>
            <span>
              <MdDelete className="w-7 h-7 fill-red-600" />
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AllProducts;
