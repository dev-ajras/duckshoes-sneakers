import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BiImageAdd } from "react-icons/bi";
import { IoClose } from "react-icons/io5";

function EditProduct() {
  const { productId } = useParams();

  const initialState = {
    sku: "",
    color: "",
    temporada: "",
    description: "",
    images: [],
    price: 0,
  };

  const [productOne, setProductOne] = useState(initialState);

  const baseUrl = "https://www.api.duckshoes.com.ar/";

  useEffect(() => {
    try {
      const getProductOne = async () => {
        const response = await axios.get(baseUrl + "products/" + productId);
        console.log(response);
        setProductOne(response.data);
      };
      getProductOne();
    } catch (error) {
      console.log(error);
    }
  }, [productId]);

  const [previewImages, setPreviewImages] = useState([]);

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

  const handleImages = (e) => {
    const currentImages = Array.from(e.target.files);
    setProductOne({ ...productOne, images: currentImages });

    const newPreviewImages = currentImages.map((image) =>
      URL.createObjectURL(image)
    );
    setPreviewImages([...previewImages, ...newPreviewImages]);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = productOne.images.filter((_, i) => i !== index);
    const updatedPreview = previewImages.filter((_, i) => i !== index);
    setProductOne({ ...productOne, images: updatedImages });
    setPreviewImages(updatedPreview);
  };

  const handlePrice = (e) => {
    const currentPrice = e.target.value;
    setProductOne({ ...productOne, price: currentPrice });
  };

  const productEdited = (message) =>
    toast.success(message, {
      autoClose: 2000,
      hideProgressBar: true,
      pauseOnFocusLoss: false,
      pauseOnHover: false,
    });

  const handleForm = (e) => {
    e.preventDefault();
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
        <h4>Images</h4>
        <div className="flex mt-2 gap-3">
          <label
            htmlFor="images"
            className="w-24 h-24 min-w-[96px] border-2 border-dashed border-primary flex justify-center items-center"
          >
            <div className="flex flex-col justify-center items-center text-center text-primary text-xs">
              <BiImageAdd className="w-8 h-8" />
              Agregar fotos
            </div>
          </label>
          <input
            onChange={(e) => handleImages(e)}
            type="file"
            multiple
            id="images"
            accept="/image/*"
            className="hidden"
          />
          <div className="flex gap-3 overflow-auto">
            <img
              className="object-contain max-w-[100px] max-h-[100px] p-2 border h-full"
              key={productOne.id}
              src={productOne.images.red}
              alt={`Preview ${productOne.sku}`}
            />
            <button
              onClick={() => handleRemoveImage(productOne.id)}
              className="absolute top-1.5 right-1.5 bg-red-400 text-white p-1 w-5 h-5 rounded-full flex justify-center items-center"
            >
              <IoClose />
            </button>
          </div>
        </div>
        <label htmlFor="price" className="mt-5 mb-2">
          Precio
        </label>
        <input
          value={productOne.price}
          onChange={(e) => handlePrice(e)}
          min={0}
          type="number"
          id="price"
          placeholder="precio"
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
