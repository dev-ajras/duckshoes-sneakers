import axios from "axios";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppProvider";

function Order() {
  const { user } = useContext(AppContext);
  const { idPedido } = useParams();

  const baseUrl = "https://www.api.duckshoes.com.ar/";

  useEffect(() => {
    const fetchOrder = async () => {
      const response = await axios.get(`${baseUrl}orders/${idPedido}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      console.log(response);
    };
    fetchOrder();
  }, []);

  return (
    <section>
      <article>id:{idPedido}</article>
    </section>
  );
}

export default Order;
