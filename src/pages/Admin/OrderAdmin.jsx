import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppProvider";
import { ImSpinner8 } from "react-icons/im";

function OrderAdmin() {
  const { user } = useContext(AppContext);
  const { idPedido } = useParams();

  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState();
  const [condition, setCondition] = useState(false);

  const baseUrl = "https://www.api.duckshoes.com.ar/";

  useEffect(() => {
    setLoading(true);
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`${baseUrl}orders/${idPedido}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setOrder(response.data.order);
        setStatus(response.data.order.status);
        setCondition(response.data.order.active);
        console.log(response);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, []);

  const handleStatus = async (currentStatus) => {
    const response = await axios.put(
      `${baseUrl}orders/status/${idPedido}`,
      {
        status: currentStatus,
      },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    console.log(response);
    if (response.status === 200) {
      setStatus(currentStatus);
    }
  };

  const onChangeStatus = (e) => {
    const currentStatus = e.target.value;
    handleStatus(currentStatus);
    console.log(currentStatus);
  };

  const handleCondition = async () => {
    const response = await axios.put(
      `${baseUrl}orders/pay/${idPedido}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    if (response.status === 200) {
      setCondition(!condition);
    }
  };

  return (
    <section className="flex justify-center">
      <div className="max-w-6xl w-full">
        <div>
          {loading ? (
            <div className="flex justify-center bg-white min-h-screen">
              <ImSpinner8 className="animate-spin w-12 h-12 mt-12 fill-primaryExtraDark" />
            </div>
          ) : order.products ? (
            <div className="flex flex-col lg:flex-row lg:gap-5">
              <div className="bg-white rounded-t-md w-full">
                {order.products.map((filteredProduct, idx) => (
                  <div key={idx}>
                    <div className="flex gap-3 my-3 p-3 md:gap-5 md:my-5">
                      <div className="flex items-center w-28 sm:w-36 md:w-48 p-3 md:p-5">
                        <img
                          src={filteredProduct.images[0]}
                          alt="imagen de producto"
                        />
                      </div>
                      <div className="w-full">
                        <h4 className="font-semibold text-lg line-clamp-2 leading-6 sm:text-lg sm:leading-10">
                          {filteredProduct.sku}
                        </h4>
                        <div className="flex gap-2 font-semibold text-sm my-1 sm:gap-3 sm:text-lg">
                          <p>
                            <span className="opacity-60">Color: </span>
                            <span>{filteredProduct.color}</span>
                          </p>
                        </div>
                        <div className="font-bold text-xl mt-1 mb-3 sm:text-2xl">
                          <span>
                            $
                            {parseInt(
                              filteredProduct.price * filteredProduct.quantity
                            ).toLocaleString("es-ES")}
                          </span>
                        </div>
                      </div>
                    </div>
                    <hr />
                  </div>
                ))}
              </div>
              <div className="bg-white rounded-b-md lg:rounded-md h-full lg:w-[450px] lg:sticky md:top-28 p-5 text-lg">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium text-lg sm:text-xl">
                    Pedido: {idPedido}
                  </h4>
                  {status === "pending" ? (
                    <span className="bg-[#FFA625]/30 text-[#CB7800] py-2 px-3 rounded-sm font-medium">
                      Pendiente
                    </span>
                  ) : status === "processing" ? (
                    <span className="bg-[#0033EA]/30 text-[#042CB9] py-2 px-3 rounded-sm font-medium">
                      En proceso
                    </span>
                  ) : status === "completed" ? (
                    <span className="bg-[#209551]/30 text-[#008A3A] py-2 px-3 rounded-sm font-medium">
                      Despachado
                    </span>
                  ) : status === "cancelled" ? (
                    <span className="bg-[#FF3535]/30 text-[#B51A1A] py-2 px-3 rounded-sm font-medium">
                      Cancelado
                    </span>
                  ) : (
                    <span className="bg-[#FF3535]/30 text-[#B51A1A] py-2 px-3 rounded-sm font-medium">
                      Error
                    </span>
                  )}
                </div>
                {order.products.map((product, idx) => (
                  <div className="flex justify-between" key={idx}>
                    <span className="font-medium opacity-60">
                      sku x{product.quantity}
                    </span>
                    <span className="font-medium opacity-60 sm:text-lg">
                      $
                      {parseInt(
                        product.price * product.quantity
                      ).toLocaleString("es-ES")}
                    </span>
                  </div>
                ))}
                <div className="border-t-[1px] my-2"></div>
                <div className="flex justify-between">
                  <span className="font-medium sm:text-xl">Total: </span>
                  <span className="font-medium sm:text-xl">
                    ${parseInt(order.value).toLocaleString("es-ES")}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-3 md:mt-5">
                  <span className="font-medium sm:text-xl">Estado:</span>
                  <select
                    onChange={(e) => onChangeStatus(e)}
                    className="p-2 outline-none border rounded"
                    name="status"
                    id="status"
                    value={status}
                  >
                    <option value="pending">Pendiente</option>
                    <option value="processing">En proceso</option>
                    <option value="completed">Despachado</option>
                    <option value="cancelled">Cancelado</option>
                  </select>
                </div>
                <div className="flex justify-between items-center mt-3 md:mt-5">
                  <span className="font-medium sm:text-xl">Condición:</span>
                  {condition ? (
                    <button
                      onClick={() => handleCondition()}
                      className="bg-[#209551]/30 text-[#008A3A] md:hover:bg-[#209551]/50 md:transition-colors py-2 px-3 rounded-sm font-medium"
                    >
                      Pagado
                    </button>
                  ) : (
                    <button
                      onClick={() => handleCondition()}
                      className="bg-[#FF3535]/30 md:hover:bg-[#FF3535]/50 md:transition-colors text-[#B51A1A] py-2 px-3 rounded-sm font-medium"
                    >
                      No pagado
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center m-2 sm:m-3 sm:mt-12">
              <h5 className="bg-primaryLight text-lg font-medium px-2 py-1 mb-1 sm:px-3 sm:py-2 sm:mb-2">
                Carrito vacío
              </h5>
              <p className="font-medium">Añade productoss (+)</p>
              <img
                className="my-5 w-80 sm:my-8 sm:w-96"
                src="/assets/illustrations/cartEmpty.svg"
                alt="cartEmpty"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default OrderAdmin;
