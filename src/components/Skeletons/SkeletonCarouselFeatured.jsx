const skeletonProducts = Array.from({ length: 10 });

function SkeletonCarouselFeatured() {
  return skeletonProducts.map((_, idx) => (
    <div
      className='w-full flex-[0_0_40%] p-3 shadow md:hover:shadow-md md:hover:shadow-zinc-500 md:transition-shadow bg-white rounded-md relative sm:p-5 sm:flex-[0_0_30%] md:flex-[0_0_25%] lg:flex-[0_0_21%]'
      key={idx}
    >
      <div className='flex flex-col w-full h-full'>
        <div
          className='object-contain h-full'
          // src={product.image}
        >
          <div className='h-36 bg-slate-200 animate-pulse'></div>
        </div>
        <h3 className='line-clamp-1 h-8 w-1/2 sm:text-lg bg-slate-200 animate-pulse'>
          {/* {product.sku} */}
        </h3>
        <div className='h-10 w-1/2 mt-1  sm:mt-3 bg-slate-200 animate-pulse'>
          {/* ${parseFloat(product.price).toLocaleString('es-ES')} */}
        </div>
      </div>
    </div>
  ));
}

export default SkeletonCarouselFeatured;
