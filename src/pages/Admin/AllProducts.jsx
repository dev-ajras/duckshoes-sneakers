import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { BiSolidEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppProvider";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AllProducts() {
  const { user } = useContext(AppContext);

  const [adminProducts, setAdminProducts] = useState([]);

  const baseUrl = "https://www.api.duckshoes.com.ar/";

  useEffect(() => {
    try {
      const fetchProducts = async () => {
        const response = await axios.get(
          baseUrl + "products?page=1&pageSize=16"
        );
        setAdminProducts(response.data.products);
      };
      fetchProducts();
    } catch (error) {
      console.log(error.response.status);
    }
  }, []);

  const productDeleted = () =>
    toast.success("Producto Eliminado", {
      autoClose: 2000,
      hideProgressBar: true,
      pauseOnFocusLoss: false,
      pauseOnHover: false,
    });

  const deleteProduct = async (productId) => {
    const response = await axios.delete(baseUrl + "products/" + productId, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    if (response.status === 200) {
      setAdminProducts(
        adminProducts.filter((product) => product.id !== productId)
      );
      productDeleted();
    }
  };

  return (
    <div className="shadow">
      <ToastContainer />
      <div className="grid grid-cols-9 bg-gray-50 p-5 font-normal">
        <div className="text-center col-span-2">Imágen</div>
        <div className="text-center col-span-2">Sku</div>
        <div className="text-center col-span-2">Precio</div>
        <div className="text-center col-span-2">Estado</div>
      </div>
      {adminProducts.length > 0 ? (
        adminProducts.map((product) => (
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
              <button onClick={() => deleteProduct(product.id)}>
                <MdDelete className="w-7 h-7 fill-red-600" />
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="p-3 flex flex-col items-center sm:p-5 sm:py-12 bg-white">
          <h5 className="font-semibold text-lg bg-primaryLight px-3 p-1 mb-2 sm:px-5 sm:p-2 sm:mb-3">
            No hay productos
          </h5>
          <Link to="/admin/agregar-producto" className="font-semibold">
            Añadir producto +
          </Link>
        </div>
      )}
    </div>
  );
}

export default AllProducts;
