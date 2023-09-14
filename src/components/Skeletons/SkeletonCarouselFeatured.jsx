const skeletonProducts = Array.from({ length: 10 });

function SkeletonCarouselFeatured() {
  return skeletonProducts.map((_, idx) => (
    <div
      className='w-full w-40 sm:w-52 md:w-60 p-3 shadow bg-white rounded-md relative sm:p-5 '
      key={idx}
    >
      <div className='flex flex-col w-full h-full'>
        <div className='object-contain h-full bg-slate-200 animate-pulse mb-5'>
          <div className='h-32 sm:h-40 md:h-48 w-20 '></div>
        </div>
        <h3 className='line-clamp-1 h-8 w-1/2 sm:text-lg bg-slate-200 animate-pulse'></h3>
        <div className='h-10 w-1/2 mt-1  sm:mt-3 bg-slate-200 animate-pulse'></div>
      </div>
    </div>
  ));
}

export default SkeletonCarouselFeatured;
