import React, { useEffect } from 'react';
import axios from 'axios';

function SearchProduct() {
  useEffect(() => {
    // fetchData();
  }, []);

  const fetchData = async () => {
    // Agregar la palabra clave "async" aquí
    const options = {
      method: 'GET',
      url: 'https://amazon-web-scraping-api.p.rapidapi.com/products/search',
      params: {
        criteria: 'AMD Ryzen',
        page: '1',
        countryCode: 'US',
        languageCode: 'EN',
      },
      headers: {
        'X-RapidAPI-Key': 'f65d7545b0mshe6e2de75ad32175p1c8dc9jsn5e60d66ba2fb',
        'X-RapidAPI-Host': 'amazon-web-scraping-api.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form>
      <label>
        Buscar producto
        <input type="text" />
      </label>
    </form>
  );
}

export default SearchProduct;
