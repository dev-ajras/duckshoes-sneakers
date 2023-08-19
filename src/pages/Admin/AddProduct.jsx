import axios from "axios";
import { useContext, useState } from "react";
import { AppContext } from "../../context/AppProvider";

import { BiImageAdd } from "react-icons/bi";
import { IoClose } from "react-icons/io5";

function AddProduct() {
  const { user } = useContext(AppContext);

  const initialState = {
    productName: "",
    sku: "",
    color: "",
    temporada: "",
    description: "",
    images: [],
    price: 0,
  };

  const [productData, setProductData] = useState(initialState);
  const [previewImages, setPreviewImages] = useState([]);

  const handleProductName = (e) => {
    const currentProductName = e.target.value;
    setProductData({ ...productData, productName: currentProductName });
  };

  const handleSku = (e) => {
    const currentSku = e.target.value;
    setProductData({ ...productData, sku: currentSku });
  };

  const handleColor = (e) => {
    const currentColor = e.target.value;
    setProductData({ ...productData, color: currentColor });
  };

  const handleTemporada = (e) => {
    const currentTemporada = e.target.value;
    setProductData({ ...productData, temporada: currentTemporada });
  };

  const handleDescription = (e) => {
    const currentDescription = e.target.value;
    setProductData({ ...productData, description: currentDescription });
  };

  const handleImages = (e) => {
    const currentImages = Array.from(e.target.files);
    setProductData({ ...productData, images: currentImages });

    const newPreviewImages = currentImages.map((image) =>
      URL.createObjectURL(image)
    );
    setPreviewImages([...previewImages, ...newPreviewImages]);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = productData.images.filter((_, i) => i !== index);
    const updatedPreview = previewImages.filter((_, i) => i !== index);
    setProductData({ ...productData, images: updatedImages });
    setPreviewImages(updatedPreview);
  };

  const handlePrice = (e) => {
    const currentPrice = e.target.value;
    setProductData({ ...productData, price: currentPrice });
  };

  const formDataProducts = new FormData();

  formDataProducts.append("sku", productData.sku);
  formDataProducts.append("color", productData.color);
  formDataProducts.append("temporada", productData.temporada);
  formDataProducts.append("description", productData.description);
  formDataProducts.append("price", productData.price);

  for (let i = 0; i < productData.images.length; i++) {
    formDataProducts.append("images", productData.images[i]);
  }

  const handleForm = (e) => {
    e.preventDefault();
    addProduct();
  };

  const baseUrl = "https://www.api.duckshoes.com.ar/";

  const addProduct = async () => {
    const response = await axios.post(
      baseUrl + "products/create",
      formDataProducts,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response);
  };

  return (
    <form onSubmit={handleForm} className="grid grid-cols-2 gap-3">
      <div className="flex flex-col bg-white p-5 rounded shadow">
        <label htmlFor="productName" className="mb-2">
          Nombre de producto
        </label>
        <input
          value={productData.productName}
          onChange={(e) => handleProductName(e)}
          type="text"
          id="productName"
          placeholder="nombre de producto"
          className="p-2 outline-none border rounded"
        />
        <label htmlFor="sku" className="mt-5 mb-2">
          SKU
        </label>
        <input
          value={productData.sku}
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
          value={productData.color}
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
          value={productData.description}
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
            {previewImages.map((previewImage, index) => (
              <div key={index} className="relative">
                <img
                  className="object-contain max-w-[100px] max-h-[100px] p-2 border h-full"
                  key={index}
                  src={previewImage}
                  alt={`Preview ${index}`}
                />
                <button
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-1.5 right-1.5 bg-red-400 text-white p-1 w-5 h-5 rounded-full flex justify-center items-center"
                >
                  <IoClose />
                </button>
              </div>
            ))}
          </div>
        </div>
        <label htmlFor="price" className="mt-5 mb-2">
          Precio
        </label>
        <input
          value={productData.price}
          onChange={(e) => handlePrice(e)}
          min={0}
          type="number"
          id="price"
          placeholder="precio"
          className="p-2 outline-none border rounded"
        />
        <button className="bg-primaryDark text-white p-3 font-normal rounded mt-5">
          Agregar Producto
        </button>
      </div>
    </form>
  );
}

export default AddProduct;