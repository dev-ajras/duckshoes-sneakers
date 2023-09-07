import creditCard from "/assets/info/duckCreditCard.svg";
import shipping from "/assets/info/duckShipping.svg";
import secure from "/assets/info/duckSecure.svg";

function Info() {
  return (
    <div className="bg-white flex justify-center w-full my-3 md:my-5 md:h-96">
      <div className="flex flex-col my-3 sm:my-5 md:flex-row md:items-center">
        <div className="flex flex-col items-center p-8 sm:p-12 md:p-5 lg:max-w-6xl basis-1/3">
          <img
            className="w-16 sm:w-24"
            src={creditCard}
            alt="creditCard info"
          />
          <h4 className="font-medium text-center mt-3 sm:text-2xl sm:mt-5">
            Pagos con tarjeta
          </h4>
          <p className="text-center sm:text-xl sm:mt-2">
            Tarjetas de crédito y débito
          </p>
        </div>
        <span className="flex m-auto bg-grayDuck h-[3px] w-32 sm:w-48 sm:h-1 lg:w-[3px] lg:h-20"></span>
        <div className="flex flex-col items-center p-8 sm:p-12 md:p-5 basis-1/3">
          <img className="w-16 sm:w-24" src={shipping} alt="shipping info" />
          <h4 className="font-medium text-center mt-3 sm:text-2xl sm:mt-5">
            Envío gratis
          </h4>
          <p className="text-center sm:text-xl sm:mt-2">
            En compras superiores a $150.000
          </p>
        </div>
        <span className="flex m-auto bg-grayDuck h-[3px] w-32 sm:w-48 sm:h-1 lg:w-[3px] lg:h-20"></span>
        <div className="flex flex-col items-center p-8 sm:p-12 md:p-5 basis-1/3">
          <img className="w-14 sm:w-20" src={secure} alt="secure info" />
          <h4 className="font-medium text-center mt-3 sm:text-2xl sm:mt-5">
            Compra segura
          </h4>
          <p className="text-center sm:text-xl sm:mt-2">
            Seguimiento durante todo el proceso
          </p>
        </div>
      </div>
    </div>
  );
}

export default Info;
