import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppContext } from "../../context/AppProvider";

import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import { BiImageAdd } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { ImSpinner8 } from "react-icons/im";

function EditProduct() {
  const { user, setUser } = useContext(AppContext);

  const { productId } = useParams();

  const initialState = {
    id: productId,
    sku: "",
    color: "",
    temporada: "",
    description: "",
    images: [],
    price: 0,
  };

  const [previewImages, setPreviewImages] = useState([]);
  const [productOne, setProductOne] = useState(initialState);
  const [productOneConstant, setProductOneConstant] = useState({});
  const [loading, setLoading] = useState(false);

  const baseUrl = "https://ds.agenciagrvity.com/";

  useEffect(() => {
    try {
      const getProductOne = async () => {
        const response = await axios.get(baseUrl + "products/" + productId);
        setProductOne({ ...response.data, color: productOne.color });
        setProductOneConstant({ ...response.data, color: productOne.color });
      };
      getProductOne();
    } catch (error) {
      // console.log(error);
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

  const handleImages = (e) => {
    const currentImages = Array.from(e.target.files);
    setProductOne({ ...productOne, images: currentImages });

    const newPreviewImages = currentImages.map((image) =>
      URL.createObjectURL(image)
    );
    setPreviewImages([...previewImages, ...newPreviewImages]);
  };

  const handleRemoveImage = (e, index) => {
    e.preventDefault();
    const updatedImages = productOne.images.filter((_, i) => i !== index);
    const updatedPreview = previewImages.filter((_, i) => i !== index);
    setProductOne({ ...productOne, images: updatedImages });
    setPreviewImages(updatedPreview);
  };

  const handlePrice = (e) => {
    const currentPrice = e.target.value;
    if (currentPrice.length <= 10) {
      setProductOne({ ...productOne, price: parseInt(currentPrice) });
    }
  };

  const formDataImageColor = new FormData();

  formDataImageColor.append("productId", productOne.id);
  formDataImageColor.append("color", productOne.color);
  for (let i = 0; i < productOne.images.length; i++) {
    formDataImageColor.append("images", productOne.images[i]);
  }

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

  const colorRequired = () =>
    toast.warning("Selecciona un nuevo color", {
      autoClose: 2000,
      hideProgressBar: true,
      pauseOnFocusLoss: false,
      pauseOnHover: false,
    });

  const tokenExpired = () =>
    toast.error("Tu sesión expiró, ingresa nuevamente", {
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
      if (key !== "color" && productOne[key] !== productOneConstant[key]) {
        productDifferences[key] = productOne[key];
      }
    }
    return productDifferences;
  };

  const navigate = useNavigate();

  const editProduct = async (productDifferences) => {
    if (Object.keys(productDifferences).length === 0) {
      productNoEdited("No estás realizando cambios");
      return false;
    }
    if (
      Object.keys(productDifferences).length === 1 &&
      previewImages.length > 0
    ) {
      return false;
    }
    setLoading(true);
    try {
      const response = await axios.put(
        baseUrl + "products/update/" + productId,
        productDifferences,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.status === 200) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      if (error.response.status === 403) {
        tokenExpired();
        setTimeout(() => {
          localStorage.removeItem("token");
          setUser("");
        }, 4000);
      }
      console.error(error.response);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const editColor = async () => {
    if (productOne.images === productOneConstant.images) {
      return false;
    }
    if (
      productOne.color === "" ||
      productOne.color === null ||
      productOne.color === productOneConstant.color
    ) {
      colorRequired();
      return false;
    }

    try {
      const response = await axios.patch(
        `${baseUrl}products/add-colors`,
        formDataImageColor,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.status === 201) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const handleForm = async (e) => {
    e.preventDefault();
    const productDifferences = compareObjects();
    const productEditedSuccess = await editProduct(productDifferences);
    const editColorSuccess = await editColor();

    if (productEditedSuccess || editColorSuccess) {
      productEdited("Producto editado con éxito");
      setTimeout(() => {
        navigate("/admin/todos-productos");
      }, 3000);
    }
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(previewImages);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setPreviewImages(items);

    const updatedImages = Array.from(productOne.images);
    updatedImages.splice(
      result.destination.index,
      0,
      updatedImages.splice(result.source.index, 1)[0]
    );
    setProductOne({ ...productOne, images: updatedImages });
  };

  const colorsArray = [
    { value: "", name: "Seleccionar color" },
    { value: "negro", name: "Negro" },
    { value: "negro-charol", name: "Negro-charol" },
    { value: "blanco", name: "Blanco" },
    { value: "marron", name: "Marrón" },
    { value: "verde-militar", name: "Verde-militar" },
    { value: "mostaza", name: "Mostaza" },
    { value: "animal-print", name: "Animal Print" },
  ];

  const productOneColors =
    productOneConstant.images && Object.keys(productOneConstant.images);

  const filteredColors = colorsArray.filter(
    ({ value }) => productOneColors && !productOneColors.includes(value)
  );

  const handleDelete = () => {
    // console.log("delete!");
  };

  return (
    <form onSubmit={handleForm} className='grid sm:grid-cols-2 gap-3'>
      <div className='flex flex-col bg-white p-5 rounded shadow'>
        <ToastContainer />
        <label htmlFor='sku' className='mb-2'>
          SKU
        </label>
        <input
          value={productOne.sku}
          onChange={(e) => handleSku(e)}
          type='text'
          id='sku'
          placeholder='sku'
          className='p-2 outline-none border rounded'
        />
        <label htmlFor='color' className='mt-5 mb-2'>
          Color
        </label>
        <select
          onChange={(e) => handleColor(e)}
          id='color'
          className='p-2 outline-none border rounded'
          placeholder='seleccionar color'
        >
          {filteredColors.map(({ value, name }) => (
            <option key={value} value={value}>
              {name}
            </option>
          ))}
        </select>
        <label htmlFor='temporada' className='mt-5 mb-2'>
          Temporada
        </label>
        <select
          onChange={(e) => handleTemporada(e)}
          id='temporada'
          className='p-2 outline-none border rounded'
          value={productOne.temporada}
        >
          <option value='verano'>Verano</option>
          <option value='invierno'>Invierno</option>
        </select>
        <label htmlFor='description' className='mt-5 mb-2'>
          Descripción
        </label>
        <textarea
          value={productOne.description}
          onChange={(e) => handleDescription(e)}
          maxLength={500}
          rows={4}
          type='text'
          id='description'
          placeholder='descripción'
          className='p-2 outline-none border rounded max-h-96'
        />
      </div>
      <div className='flex flex-col bg-white rounded shadow p-5'>
        <h4>Images</h4>
        <div className='flex mt-2 gap-3'>
          <label
            htmlFor='images'
            className='cursor-pointer w-24 h-24 min-w-[96px] border-2 border-dashed border-primary md:hover:border-primaryDark flex justify-center items-center'
          >
            <div className='flex flex-col justify-center items-center text-center text-primary text-xs'>
              <BiImageAdd className='w-8 h-8' />
              Agregar fotos
            </div>
          </label>
          <input
            onChange={(e) => handleImages(e)}
            type='file'
            multiple
            id='images'
            accept='/image/*'
            className='hidden'
          />
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId='images' direction='horizontal'>
              {(provided) => (
                <div
                  className='flex overflow-auto'
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
                          className='relative mr-3'
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          <img
                            className='object-contain max-w-[100px] max-h-[100px] p-2 border h-full'
                            key={index}
                            src={previewImage}
                            alt={`Preview ${index}`}
                          />
                          <div
                            onClick={(e) => handleRemoveImage(e, index)}
                            className='cursor-pointer absolute top-1.5 right-1.5 bg-red-500 md:hover:bg-red-600 md:transition-colors text-white p-1 w-5 h-5 rounded-full flex justify-center items-center'
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
        <div>
          {productOneConstant.images &&
            Object.keys(productOneConstant.images).map((color) => (
              <div key={color}>
                <h4 className='mt-2 mb-1'>
                  {color.slice(0, 1).toUpperCase()}
                  {color.slice(1)}
                </h4>
                <div>
                  <div>
                    <div className='flex overflow-auto'>
                      {productOneConstant.images[color].map(
                        (previewImage, index) => (
                          <div key={index} index={index}>
                            <div className='relative mr-1 sm:mr-3 w-[60px] h-[60px] sm:w-[90px] sm:h-[90px]'>
                              <img
                                className='object-contain w-full h-full p-1 sm:p-3 border '
                                key={index}
                                src={previewImage}
                                alt={`Preview ${index}`}
                              />
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <label htmlFor='price' className='mt-5 mb-2'>
          Precio
        </label>
        <input
          value={productOne.price}
          onChange={(e) => handlePrice(e)}
          min={0}
          type='number'
          id='price'
          placeholder='precio'
          className='p-2 outline-none border rounded'
        />
        <button className='flex justify-center text-center bg-primaryDark md:hover:bg-primaryExtraDark md:transition-colors text-white p-3 font-normal rounded mt-5'>
          {loading ? (
            <ImSpinner8 className='animate-spin w-6 h-6' />
          ) : (
            "Editar Producto"
          )}
        </button>
        {/* <div
          onClick={() => handleDelete()}
          className='cursor-pointer flex justify-center text-center bg-red-500 md:hover:bg-red-600 md:transition-colors text-white p-3 font-normal rounded mt-5'
        >
          Eliminar Producto
        </div> */}
      </div>
    </form>
  );
}

export default EditProduct;
