import { BsCashStack } from "react-icons/bs";
import { BsCreditCard } from "react-icons/bs";
import { AiOutlineBank } from "react-icons/ai";
import { LiaPaypal } from "react-icons/lia";
import { BiWallet } from "react-icons/bi";

function PaymentMethods() {
  return (
    <section className="md:flex md:mr-36">
      <div className="">
        <h3 className="font-semibold text-lg mb-3 sm:mb-5 sm:text-3xl">
          Métodos de pago
        </h3>
        <p className="md:text-lg opacity-75">
          Nos dedicamos a ofrecer a nuestros apreciados clientes una variedad de
          opciones de pago para adaptarnos a sus preferencias. A continuación,
          te presentamos los métodos de pago que tenemos disponibles:
        </p>
        <div className="my-3 sm:my-5 text-lg">
          <div className="flex items-center gap-3 ">
            <span className="bg-white p-2.5 rounded-full ring-2 ring-primaryDark">
              <BsCashStack className="text-3xl fill-primaryDark" />
            </span>
            <h5 className="font-medium">Pago en efectivo</h5>
          </div>
          <p className="mt-2 opacity-75">
            Si prefieres abonar en efectivo, te ofrecemos la opción de hacerlo
            en persona al recibir tu pedido. Asegúrate de tener el monto exacto
            listo para que nuestra entrega sea ágil y sin contratiempos.
          </p>
        </div>
        <div className="my-3 sm:my-5 text-lg">
          <div className="flex items-center gap-3 ">
            <span className="bg-white p-2.5 rounded-full ring-2 ring-primaryDark">
              <BsCreditCard className="text-3xl fill-primaryDark" />
            </span>
            <h5 className="font-medium">Tarjeta de crédito o débito</h5>
          </div>
          <p className="mt-2 opacity-75">
            Puedes introducir de manera segura los datos de tu tarjeta para
            realizar una transacción rápida y sin complicaciones. Este método es
            ideal para aquellos que desean efectuar pagos en línea de forma
            eficiente.
          </p>
        </div>
        <div className="my-3 sm:my-5 text-lg">
          <div className="flex items-center gap-3 ">
            <span className="bg-white p-2.5 rounded-full ring-2 ring-primaryDark">
              <LiaPaypal className="text-3xl fill-primaryDark" />
            </span>
            <h5 className="font-medium">PayPal</h5>
          </div>
          <p className="mt-2 opacity-75">
            Utiliza tu cuenta de PayPal para disfrutar de una experiencia de
            pago fluida. PayPal es reconocido por su seguridad y facilidad de
            uso, lo que lo convierte en una excelente elección para los
            compradores en línea.
          </p>
        </div>
        <div className="my-3 sm:my-5 text-lg">
          <div className="flex items-center gap-3 ">
            <span className="bg-white p-2.5 rounded-full ring-2 ring-primaryDark">
              <AiOutlineBank className="text-3xl fill-primaryDark" />
            </span>
            <h5 className="font-medium">Transferencia bancaria</h5>
          </div>
          <p className="mt-2 opacity-75">
            Si prefieres efectuar una transferencia bancaria, elige esta opción
            y sigue las instrucciones proporcionadas. Resulta adecuada para
            aquellos que desean realizar pagos directamente desde sus cuentas
            bancarias.
          </p>
        </div>
        <div className="my-3 sm:my-5 text-lg">
          <div className="flex items-center gap-3 ">
            <span className="bg-white p-2.5 rounded-full ring-2 ring-primaryDark">
              <BiWallet className="text-3xl fill-primaryDark" />
            </span>
            <h5 className="font-medium">Billeteras digitales</h5>
          </div>
          <p className="mt-2 opacity-75">
            También aceptamos varias billeteras digitales, como Apple Pay y
            Google Pay, para brindarte mayor comodidad. Vincula tu billetera
            digital preferida y realiza pagos rápidos y seguros.
          </p>
        </div>
      </div>
    </section>
  );
}

export default PaymentMethods;
