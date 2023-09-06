import { BsCartCheck } from "react-icons/bs";
import { FaRegHandPointer } from "react-icons/fa";
import { FaShippingFast } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";
import { LuPackageOpen } from "react-icons/lu";

function HowToBuy() {
  return (
    <section className="md:flex md:mr-36">
      <div className="">
        <h3 className="font-semibold text-lg mb-3 sm:mb-5 sm:text-3xl">
          Cómo comprar
        </h3>
        <p className="md:text-lg opacity-75">
          En Duck Shoes, nos enorgullece ofrecer a nuestros valiosos clientes
          una experiencia de compra sencilla y segura. Aquí te explicamos cómo
          puedes adquirir tus productos favoritos de manera rápida y sencilla.
        </p>
        <div className="my-3 sm:my-5 text-lg">
          <div className="flex items-center gap-3 ">
            <span className="bg-white p-2.5 rounded-full ring-2 ring-primaryDark">
              <FaRegHandPointer className="text-3xl fill-primaryDark" />
            </span>
            <h5 className="font-medium">Seleccioná tus productos</h5>
          </div>
          <p className="mt-2 opacity-75">
            Navega por nuestro sitio web, elige los artículos que desees y
            agrégalos a tu carrito de compras. Luego, procede al proceso de pago
            e ingresa tu información de envío y contacto.
          </p>
        </div>
        <div className="my-3 sm:my-5 text-lg">
          <div className="flex items-center gap-3 ">
            <span className="bg-white p-2.5 rounded-full ring-2 ring-primaryDark">
              <BsCartCheck className="text-3xl fill-primaryDark" />
            </span>
            <h5 className="font-medium">Procesamiento de pedido</h5>
          </div>
          <p className="mt-2 opacity-75">
            Una vez que recibimos tu pedido, nuestro equipo dedicado entra en
            acción. Seleccionamos y empacamos cuidadosamente tus artículos para
            asegurarnos de que lleguen en perfectas condiciones.
          </p>
        </div>
        <div className="my-3 sm:my-5 text-lg">
          <div className="flex items-center gap-3 ">
            <span className="bg-white p-2.5 rounded-full ring-2 ring-primaryDark">
              <BiSupport className="text-3xl fill-primaryDark" />
            </span>
            <h5 className="font-medium">Envío y seguimiento</h5>
          </div>
          <p className="mt-2 opacity-75">
            Nos asociamos con servicios de mensajería de confianza para
            garantizar entregas eficientes y oportunas. Recibirás un número de
            seguimiento para supervisar el progreso de tu paquete hasta que
            llegue a tu puerta.
          </p>
        </div>
        <div className="my-3 sm:my-5 text-lg">
          <div className="flex items-center gap-3 ">
            <span className="bg-white p-2.5 rounded-full ring-2 ring-primaryDark">
              <FaShippingFast className="text-3xl fill-primaryDark" />
            </span>
            <h5 className="font-medium">Entrega</h5>
          </div>
          <p className="mt-2 opacity-75">
            Siéntate y relájate mientras nuestros socios de envío trabajan
            diligentemente para entregar tu paquete en la dirección que
            proporcionaste. Las entregas oportunas son nuestra prioridad.
          </p>
        </div>
        <div className="my-3 sm:my-5 text-lg">
          <div className="flex items-center gap-3 ">
            <span className="bg-white p-2.5 rounded-full ring-2 ring-primaryDark">
              <LuPackageOpen className="text-3xl stroke-primaryDark" />
            </span>
            <h5 className="font-medium">Recibe tu pedido</h5>
          </div>
          <p className="mt-2 opacity-75">
            Esperamos que estés encantado con tu compra. Si surge algún
            problema, nuestro amable equipo de atención al cliente está siempre
            listo para ayudarte. Tu satisfacción es importante para nosotros.
          </p>
        </div>
      </div>
    </section>
  );
}

export default HowToBuy;
