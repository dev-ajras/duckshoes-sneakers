import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppContext } from '../../context/AppProvider';

function EditProduct() {
  const { user, setUser } = useContext(AppContext);

  const { productId } = useParams();

  const initialState = {
    sku: '',
    color: '',
    temporada: '',
    description: '',
    price: 0,
  };

  const [productOne, setProductOne] = useState(initialState);
  const [productOneConstant, setProductOneConstant] = useState({});

  const baseUrl = 'https://www.api.duckshoes.com.ar/';

  useEffect(() => {
    try {
      const getProductOne = async () => {
        const response = await axios.get(baseUrl + 'products/' + productId);
        setProductOne(response.data);
        setProductOneConstant(response.data);
      };
      getProductOne();
    } catch (error) {
      console.log(error);
    }
  }, [productId]);

  const handleSku = (e) => {
    const currentSku = e.target.value;
    setProductOne({ ...productOne, sku: currentSku });
  };

  const handleColor = (e) => {
    const currentColor = e.target.value;
    setProductOne({ ...productOne, color: currentColor });
  };

  const handleTemporada = (e) => {
    const currentTemporada = e.target.value;
    setProductOne({ ...productOne, temporada: currentTemporada });
  };

  const handleDescription = (e) => {
    const currentDescription = e.target.value;
    setProductOne({ ...productOne, description: currentDescription });
  };

  const handlePrice = (e) => {
    const currentPrice = parseFloat(e.target.value);
    setProductOne({ ...productOne, price: currentPrice });
  };

  const productEdited = (message) =>
    toast.success(message, {
      autoClose: 2000,
      hideProgressBar: true,
      pauseOnFocusLoss: false,
      pauseOnHover: false,
    });

  const productNoEdited = (message) =>
    toast.warning(message, {
      autoClose: 2000,
      hideProgressBar: true,
      pauseOnFocusLoss: false,
      pauseOnHover: false,
    });

  const tokenExpired = () =>
    toast.error('Tu token expiró, volvé a logearte', {
      autoClose: 2000,
      hideProgressBar: true,
      pauseOnFocusLoss: false,
      pauseOnHover: false,
    });

  const compareObjects = () => {
    const productDifferences = {};

    const keys = Object.keys(productOne);

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (productOne[key] !== productOneConstant[key]) {
        productDifferences[key] = productOne[key];
      }
    }
    return productDifferences;
  };

  const editProduct = (productDifferences) => {
    if (Object.keys(productDifferences).length === 0) {
      productNoEdited('No estas realizando cambios');
    } else {
      editProductServer(productDifferences);
    }
  };

  console.log(user.token);

  const editProductServer = async (productDifferences) => {
    console.log('differences: ', productDifferences);
    try {
      const response = await axios.put(
        baseUrl + 'products/update/' + productId,
        productDifferences,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (response.status === 201) {
        productEdited('Producto editado con éxito');
        setProductOne(initialState);
        setTimeout(() => {
          navigate('/admin/todos-productos');
        }, 1000);
      }
      console.log(response);
    } catch (error) {
      if (error.response.status === 403) {
        tokenExpired();
        setTimeout(() => {
          localStorage.removeItem('token');
          setUser('');
        }, 3000);
      }
    }
  };

  console.log('productOne: ', productOne);
  console.log('productOneConstant', productOneConstant);

  const handleForm = (e) => {
    e.preventDefault();
    const productDifferences = compareObjects();
    editProduct(productDifferences);
  };

  return (
    <form onSubmit={handleForm} className="grid grid-cols-2 gap-3">
      <div className="flex flex-col bg-white p-5 rounded shadow">
        <ToastContainer />
        <label htmlFor="sku" className="mb-2">
          SKU
        </label>
        <input
          value={productOne.sku}
          onChange={(e) => handleSku(e)}
          type="text"
          id="sku"
          placeholder="sku"
          className="p-2 outline-none border rounded"
        />
        <label htmlFor="color" className="mt-5 mb-2">
          Color
        </label>
        <input
          value={productOne.color}
          onChange={(e) => handleColor(e)}
          type="text"
          id="color"
          placeholder="color"
          className="p-2 outline-none border rounded"
        />
        <label htmlFor="temporada" className="mt-5 mb-2">
          Temporada
        </label>
        <select
          onChange={(e) => handleTemporada(e)}
          id="temporada"
          className="p-2 outline-none border rounded"
        >
          <option value="verano">Verano</option>
          <option value="invierno">Invierno</option>
        </select>
        <label htmlFor="description" className="mt-5 mb-2">
          Descripción
        </label>
        <textarea
          value={productOne.description}
          onChange={(e) => handleDescription(e)}
          maxLength={500}
          rows={4}
          type="text"
          id="description"
          placeholder="descripción"
          className="p-2 outline-none border rounded max-h-96"
        />
      </div>
      <div className="flex flex-col bg-white rounded shadow p-5">
        <label htmlFor="price" className="mb-2">
          Precio
        </label>
        <input
          value={productOne.price}
          onChange={(e) => handlePrice(e)}
          min={0}
          type="number"
          id="price"
          placeholder="precio"
          maxLength={10}
          className="p-2 outline-none border rounded"
        />
        <button className="bg-primaryDark text-white p-3 font-normal rounded mt-5">
          Editar Producto
        </button>
      </div>
    </form>
  );
}

export default EditProduct;
