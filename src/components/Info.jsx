function Info() {
  return (
    <div className="bg-white flex justify-center w-full my-3 md:my-5 md:h-96">
      <div className="flex flex-col my-3 sm:my-5 md:flex-row md:items-center">
        <div className="flex flex-col items-center p-8 sm:p-12 md:p-5 lg:max-w-6xl basis-1/3">
          <img
            className="w-16 sm:w-24"
            src="/assets/info/duckshoes-carrito.svg"
            alt="shipping info"
          />
          <h4 className="font-medium text-center mt-3 sm:text-2xl sm:mt-5">
            Añadir al carrito
          </h4>
          <p className="text-center sm:text-xl sm:mt-2">
            Selecciona tus productos
          </p>
        </div>
        <span className="flex m-auto bg-grayDuck h-[3px] w-32 sm:w-48 sm:h-1 md:w-[3px] md:h-20"></span>
        <div className="flex flex-col items-center p-8 sm:p-12 md:p-5 basis-1/3">
          <img
            className="w-16 sm:w-24"
            src="/assets/info/duckshoes-notificacion.svg"
            alt="shipping info"
          />
          <h4 className="font-medium text-center mt-3 sm:text-2xl sm:mt-5">
            Notificaciones
          </h4>
          <p className="text-center sm:text-xl sm:mt-2">
            Seguimiento durante todo el proceso
          </p>
        </div>
        <span className="flex m-auto bg-grayDuck h-[3px] w-32 sm:w-48 sm:h-1 md:w-[3px] md:h-20"></span>
        <div className="flex flex-col items-center p-8 sm:p-12 md:p-5 basis-1/3">
          <img
            className="w-16 sm:w-24"
            src="/assets/info/duckshoes-despachado.svg"
            alt="secure info"
          />
          <h4 className="font-medium text-center mt-3 sm:text-2xl sm:mt-5">
            Pedido realizado
          </h4>
          <p className="text-center sm:text-xl sm:mt-2">
            Listo! Lo estamos preparando
          </p>
        </div>
      </div>
    </div>
  );
}

export default Info;
