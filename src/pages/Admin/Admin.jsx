import { useState } from "react";
import { BiImageAdd } from "react-icons/bi";

function Admin() {
  const initialState = {
    productName: "",
    sku: "",
    color: "",
    season: "",
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

  const handleSeason = (e) => {
    const currentSeason = e.target.value;
    setProductData({ ...productData, season: currentSeason });
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

  const handlePrice = (e) => {
    const currentPrice = e.target.value;
    setProductData({ ...productData, price: currentPrice });
  };

  return (
    <section className="flex flex-col items-center justify-center">
      <div className="max-w-6xl m-5">
        <h3 className="text-start self-start place-self-start justify-self-start self  font-medium text-lg mb-3 sm:mb-5 sm:text-2xl">
          Admin
        </h3>
        <div className="flex gap-3">
          <article className="bg-white p-5 rounded shadow">
            <ul>
              <li>Agregar producto</li>
              <li>Editar producto</li>
              <li>Todos los productos</li>
              <li>Pedidos</li>
              <li>Configuración</li>
            </ul>
          </article>
          <article>
            <form className="grid grid-cols-2 gap-3">
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
                  onChange={(e) => handleSeason(e)}
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
                  <div className="flex gap-1 overflow-auto">
                    {previewImages.map((previewImage, index) => (
                      <img
                        className="max-w-[100px] max-h-[100px] mr-[5px] p-2 border rounded"
                        key={index}
                        src={previewImage}
                        alt={`Preview ${index}`}
                      />
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
              </div>
            </form>
          </article>
        </div>
      </div>
    </section>
  );
}

export default Admin;
