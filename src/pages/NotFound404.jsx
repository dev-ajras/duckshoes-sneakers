import React from 'react';
import { Link } from 'react-router-dom';

function NotFound404() {
  return (
    <section className="flex flex-col justify-center items-center p-3 sm:p-5">
      <h3 className="text-5xl font-bold sm:text-6xl">404</h3>
      <p className="text-xl m-2 font-semibold sm:text-3xl sm:m-3">
        Page not found
      </p>
      <img
        className="w-64 my-5 sm:w-80 sm:my-8"
        src="/assets/illustrations/notFound404.svg"
        alt="notFound404"
      />
      <Link
        className="bg-primaryDark p-3 rounded-md m-2 text-white sm:p-5 sm:m-3 sm:text-2xl"
        to="/"
      >
        Back to home!
      </Link>
    </section>
  );
}

export default NotFound404;
