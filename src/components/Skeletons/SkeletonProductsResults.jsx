import React from 'react';

const skelentonQuantity = Array.from({ length: 16 });
console.log(skelentonQuantity);

function SkeletonProductsResults() {
  return (
    <>
      <div className='grid grid-cols-2 gap-3 sm:gap-5 sm:grid-cols-3 lg:grid-cols-4'>
        {skelentonQuantity.map((_, idx) => (
          <div key={idx} className='shadow rounded-md bg-white p-3 sm:p-5'>
            <div className='flex items-center h-64 bg-slate-200 animate-pulse'></div>
            <div className='flex justify-between mt-1 items-center'>
              <strong className='sm:mb-2 bg-slate-200 animate-pulse'></strong>
            </div>
            <h3 className='line-clamp-2 h-8 sm:text-lg sm:h-10 bg-slate-200 animate-pulse'></h3>
          </div>
        ))}
      </div>
    </>
  );
}

export default SkeletonProductsResults;
