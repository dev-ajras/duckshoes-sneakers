import React from "react";
import { Link } from "react-router-dom";

function Banner() {
  return (
    <section className="flex justify-center items-center bg-background">
      <div className="md:flex items-center max-w-6xl m-5 mb-10 sm:m-10 md:m-16 md:mb-20">
        <article className="flex flex-col items-center md:items-start gap-3 md:gap-5">
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-white">
            Gestionamos tu pedido
          </h2>
          <p
            className="text-white text-lg text-center sm:text-xl md:text-2xl md:text-start"
            style={{ textWrap: "balance" }}
          >
            Simplificamos y optimizamos tu proceso de compra.
          </p>
          <Link
            to="/products"
            className="md:hover:bg-primaryExtraDark md:transition-colors md:font-normal text-white mt-3 py-2 px-3 md:px-6 md:py-4 md:text-lg bg-primaryDark rounded"
          >
            Empezar
          </Link>
        </article>
        <article className="mt-8 md:mt-0">
          <div className="flex justify-center">
            <video
              className="md:w-2/3 rounded-lg"
              src="https://handmade.company/sliperymoneys/video/index/credit-card/credit-card-video.mp4"
              alt="video"
              playsInline
              muted
              loop
              autoPlay
            />
          </div>
        </article>
      </div>
    </section>
  );
}

export default Banner;
