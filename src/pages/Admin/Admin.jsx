function Admin() {
  return (
    <section>
      <h3>Add product</h3>
      <form>
        <label htmlFor="productName">nombre de producto</label>
        <input type="text" id="productName" placeholder="Nombre de producto " />
        <label htmlFor="sku">sku</label>
        <input type="text" id="sku" placeholder="sku" />
        <label htmlFor="color">color</label>
        <input type="text" id="color" placeholder="color" />
        <label htmlFor="temporada">temporada</label>
        <input type="text" id="temporada" placeholder="temporada" />
        <label htmlFor="description">descripción</label>
        <input type="text" id="description" placeholder="Descripción" />
        <label htmlFor="images">images</label>
        <input type="file" id="images" />
      </form>
    </section>
  );
}

export default Admin;
