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
    <div>
      <img src={productFound.main_picture_url} alt="" />
      <h2>{productFound.name} </h2>
      <h3>Product details</h3>
      <table>
        <tbody>
          <tr>
            <td>Brand</td>
            <td>{productFound.brand_name}</td>
          </tr>
          <tr>
            <td>Color</td>
            <td>{productFound.color}</td>
          </tr>
          <tr>
            <td>Release year</td>
            <td>{productFound.release_year}</td>
          </tr>
          <tr>
            <td>Size</td>
            <td>{productFound.size_range.join(', ')}</td>
          </tr>
          <tr>
            <td>Upper material</td>
            <td>{productFound.upper_material}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ProductDetails;
