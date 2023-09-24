import axios from "axios";
import { useContext, useState } from "react";
import { AppContext } from "../../context/AppProvider";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { BiImageAdd } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { ImSpinner8 } from "react-icons/im";

function AddProduct() {
  const { user, setUser } = useContext(AppContext);

  const initialState = {
    sku: "",
    color: "negro",
    temporada: "verano",
    description: "",
    images: [],
    price: 0,
  };

  const [productData, setProductData] = useState(initialState);
  const [previewImages, setPreviewImages] = useState([]);
  const [loading, setLoading] = useState(false);

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
    const updatedImages = productData.images.concat(currentImages);

    // Agregar las nuevas imágenes a la copia

    setProductData({ ...productData, images: updatedImages });

    const newPreviewImages = currentImages.map((image) =>
      URL.createObjectURL(image)
    );
    setPreviewImages([...previewImages, ...newPreviewImages]);
  };

  const handleRemoveImage = (e, index) => {
    e.preventDefault();
    const updatedImages = productData.images.filter((_, i) => i !== index);
    const updatedPreview = previewImages.filter((_, i) => i !== index);
    setProductData({ ...productData, images: updatedImages });
    setPreviewImages(updatedPreview);
  };

  const handlePrice = (e) => {
    const currentPrice = parseInt(e.target.value);
    if (currentPrice.length <= 10 && !isNaN(currentPrice)) {
      setProductOne({ ...productOne, price: currentPrice });
    }
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

  const tokenExpired = () =>
    toast.error("Tu token expiró, volvé a logearte", {
      autoClose: 2000,
      hideProgressBar: true,
      pauseOnFocusLoss: false,
      pauseOnHover: false,
    });

  const productCreated = (message) =>
    toast.success(message, {
      autoClose: 2000,
      hideProgressBar: true,
      pauseOnFocusLoss: false,
      pauseOnHover: false,
    });

  const navigate = useNavigate();

  const baseUrl = "https://www.api.duckshoes.com.ar/";

  const addProduct = async () => {
    setLoading(true);
    try {
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
      if (response.status === 201) {
        productCreated(response.data.message);
        setProductData(initialState);
        setPreviewImages([]);
        setTimeout(() => {
          navigate("/admin/todos-productos");
        }, 3000);
      }
    } catch (error) {
      if (error.response.status === 403) {
        tokenExpired();
        setTimeout(() => {
          localStorage.removeItem("token");
          setUser("");
        }, 3000);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(previewImages);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setPreviewImages(items);

    const updatedImages = Array.from(productData.images);
    updatedImages.splice(
      result.destination.index,
      0,
      updatedImages.splice(result.source.index, 1)[0]
    );
    setProductData({ ...productData, images: updatedImages });
  };

  return (
    <form onSubmit={handleForm} className="grid sm:grid-cols-2 gap-3">
      <div className="flex flex-col bg-white p-5 rounded shadow">
        <ToastContainer />
        <label htmlFor="sku" className="mb-2">
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
        <label htmlFor="temporada" className="mt-5 mb-2">
          Color
        </label>
        <select
          onChange={(e) => handleColor(e)}
          id="color"
          className="p-2 outline-none border rounded"
        >
          <option value="negro">Negro</option>
          <option value="negro-charol">Negro Charol</option>
          <option value="blanco">Blanco</option>
          <option value="marron">Marron</option>
          <option value="verde-militar">Verde Militar</option>
          <option value="mostaza">Mostaza</option>
        </select>
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
          maxLength={2500}
          rows={8}
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
            className="cursor-pointer w-24 h-24 min-w-[96px] border-2 border-dashed border-primary md:hover:border-primaryDark flex justify-center items-center"
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
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="images" direction="horizontal">
              {(provided) => (
                <div
                  className="flex overflow-auto"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {previewImages.map((previewImage, index) => (
                    <Draggable
                      key={index}
                      draggableId={`image-${index}`}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          className="relative mr-3"
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          <img
                            className="object-contain max-w-[100px] max-h-[100px] p-2 border h-full"
                            key={index}
                            src={previewImage}
                            alt={`Preview ${index}`}
                          />
                          <div
                            onClick={(e) => handleRemoveImage(e, index)}
                            className="cursor-pointer absolute top-1.5 right-1.5 bg-red-400 md:hover:bg-red-500 md:transition-colors text-white p-1 w-5 h-5 rounded-full flex justify-center items-center"
                          >
                            <IoClose />
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
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
          maxLength={10}
          className="p-2 outline-none border rounded"
        />
        <button className="flex justify-center items-center bg-primaryDark md:hover:bg-primaryExtraDark md:transition-colors text-white p-3 font-normal rounded mt-5">
          {loading ? (
            <ImSpinner8 className="animate-spin w-6 h-6" />
          ) : (
            "Agregar Producto"
          )}
        </button>
      </div>
    </form>
  );
}

export default AddProduct;
