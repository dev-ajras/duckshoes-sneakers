import React from 'react';

const skeletonSelectImages = Array.from({ length: 3 });

function SkeletonProductsDetails() {
  return (
    <div className='p-3 sm:p-5 bg-white rounded-md relative'>
      <div className='absolute top-3 left-3 sm:top-5 sm:left-5 flex flex-col gap-3 sm:gap-5 z-10'>
        {skeletonSelectImages.map((_, idx) => (
          <button
            key={idx}
            className='rounded-sm bg-slate-200 h-12 sm:h-16 w-12 sm:w-16'
          ></button>
        ))}
      </div>
      <div className='flex flex-col md:flex-row md:gap-10'>
        <div className='bg-left relative md:basis-2/3'>
          <div className='flex justify-center sm:mb-3 md:mb-5 ml-16'>
            <span className='bg-slate-200 animate-pulse h-56 sm:h-80 object-contain mx-5 sm:mx-20 md:mx-14 lg:mx-28 w-full'></span>
          </div>
          <div className='hidden md:block'>
            <p className='mr-24 bg-slate-200 animate-pulse h-64'></p>
          </div>
        </div>
        <div className='md:basis-1/3  md:w-full'>
          <div className='md:sticky md:top-28 my-3 md:mb-0'>
            <div className=' h-8 w-1/2 bg-slate-200 animate-pulse'></div>
            <div className='my-3 bg-slate-200 animate-pulse h-12 w-1/2'></div>
            <div className='my-3 h-6 w-1/2 bg-slate-200 animate-pulse'></div>
            <div className='mt-3 h-6 w-1/2 bg-slate-200 animate-pulse'></div>
            <div className='w-12 h-12 mt-2 rounded-full my-3 bg-slate-200 animate-pulse'></div>
            <div className='flex'>
              <div className='box-border w-full my-3 p-2 sm:my-5 sm:p-3 rounded-sm bg-slate-200 animate-pulse h-12'></div>
            </div>
            <div className='flex mb-3 gap-3 sm:gap-5'>
              <div className='w-full h-10 p-1 flex sm:p-2 sm:gap-3 rounded-sm bg-slate-200 animate-pulsebg-blue-600'></div>
              <div className='w-full h-10 bg-slate-200 animate-pulse-blue-600 p-1 gap-2 sm:p-2 sm:gap-3 rounded-sm'></div>
            </div>
            <div className='md:hidden'>
              <h3 className='font-semibold sm:text-xl opacity-80'>Details:</h3>
              <div>
                <div className='pt-3 sm:pt-5'>
                  <table className='border-collapse table-fixed w-full sm:text-lg'>
                    <tbody>
                      <tr className='bg-body'>
                        <td className='w-1/2 p-2 rounded-tl-lg sm:p-3'>
                          Brand
                        </td>
                        <td className='w-1/2 p-2 rounded-tr-lg sm:p-3'></td>
                      </tr>
                      <tr>
                        <td className='w-1/2 p-2 sm:p-3'>Nickname</td>
                        <td className='w-1/2 p-2 sm:p-3'></td>
                      </tr>
                      <tr className='bg-body'>
                        <td className='w-1/2 p-2 sm:p-3'>Release year</td>
                        <td className='w-1/2 p-2 sm:p-3'></td>
                      </tr>
                      <tr>
                        <td className='w-1/2 p-2 sm:p-3'>Category</td>
                        <td className='w-1/2 p-2 sm:p-3'></td>
                      </tr>
                      <tr className='bg-body'>
                        <td className='w-1/2 p-2 rounded-bl-lg sm:p-3'>
                          Gender
                        </td>
                        <td className='w-1/2 p-2 rounded-br-lg sm:p-3'></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SkeletonProductsDetails;
