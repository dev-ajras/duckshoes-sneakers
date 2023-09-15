import React from "react";

const skelentonQuantity = Array.from({ length: 16 });

function SkeletonProductsResults() {
  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:gap-5 sm:grid-cols-3 lg:grid-cols-4">
        {skelentonQuantity.map((_, idx) => (
          <div key={idx} className="shadow rounded-md bg-white p-3 sm:p-5">
            <div className="flex items-center h-40 sm:h-44 md:h-56 lg:h-60 bg-slate-200 animate-pulse"></div>
            <div className="w-1/2 my-2 h-6 bg-slate-200 animate-pulse"></div>
            <div className="w-1/2 line-clamp-1 h-8 sm:text-lg sm:h-10 bg-slate-200 animate-pulse"></div>
          </div>
        ))}
      </div>
    </>
  );
}

export default SkeletonProductsResults;
