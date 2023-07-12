import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ProductDetails() {
  const { productName } = useParams();
  const [productFound, setProductFound] = useState({})

  useEffect (() => {
    fetchData()
  }, [])

  const fetchData = async () => {

    try{
      const response = await axios.get('/sneakers.json')
      const {data} = response
      const productNameDetails = data.find((dat) => dat.name === productName )
      setProductFound(productNameDetails || {})
  
    } catch (error) {
      console.log(error)
    }
  }

  console.log(productFound)

  return (
    <div className='p-2'>
      <h2 className='font-bold'>{productFound.name} </h2>
      <img src={productFound.main_picture_url} alt="" />
      <h3 className='my-3 font-semibold'>Size</h3>
      <ul className='flex'>

        {productFound.size_range.map((size, idx) => (
          <li key={idx}>
            {size}
          </li>
        ))}
      </ul>
      <h3 className='my-3 font-semibold'>Product details</h3>
      <table className='border-collapse table-fixed w-full'>
        <tbody>
          <tr className='bg-primaryLight'>
            <td className='w-1/2 rounded-l-lg p-2'>Brand</td>
            <td className='w-1/2 rounded-r-lg p-2 text-right'>{productFound.brand_name}</td>
          </tr>
          <tr>
            <td className='w-1/2 rounded-l-lg p-2'>Color</td>
            <td className='w-1/2 rounded-r-lg p-2 text-right'>{productFound.color}</td>
          </tr>
          <tr className='bg-primaryLight'>
            <td className='w-1/2 rounded-l-lg p-2'>Release year</td>
            <td className='w-1/2 rounded-r-lg p-2 text-right'>{productFound.release_year}</td>
          </tr>
          {/* <tr>
            <td>Size</td>
            <td>{productFound.size_range ? productFound.size_range.join(', ') : ''}</td>
          </tr> */}
          <tr>
            <td className='w-1/2 rounded-l-lg p-2'>Upper material</td>
            <td className='w-1/2 rounded-r-lg p-2 text-right'>{productFound.upper_material}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ProductDetails;
