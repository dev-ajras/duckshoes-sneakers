import React from 'react';
import { Link } from 'react-router-dom';

function NotFound404() {
  return (
    <section className="flex flex-col justify-center items-center p-3">
      <h3 className="text-5xl font-bold">404</h3>
      <p className="text-xl m-2 font-semibold">Page not found</p>
      <img
        className="w-64 my-5"
        src="/assets/illustrations/notFound404.svg"
        alt="notFound404"
      />
      <Link className="bg-primaryDark p-3 rounded-md m-2 text-white" to="/">
        Back to home!
      </Link>
    </section>
  );
}

export default NotFound404;
