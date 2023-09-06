const skeletonProducts = Array.from({ length: 16 });

function SkeletonCarouselFeatured({ from, to }) {
  return skeletonProducts.slice(from, to).map((_, idx) => {
    <div
      className='w-full flex-[0_0_40%] p-3 shadow md:hover:shadow-md md:hover:shadow-zinc-500 md:transition-shadow bg-white rounded-md relative sm:p-5 sm:flex-[0_0_30%] md:flex-[0_0_25%] lg:flex-[0_0_21%]'
      key={idx}
    >
      <div className='flex items-center h-64 bg-blue-600'></div>
      <h3 className='line-clamp-2 h-8 sm:text-lg'>{product.sku}</h3>
      <div className='flex justify-between  items-center text-xl sm:text-2xl'>
        <strong>${parseFloat(product.price).toLocaleString('es-ES')}</strong>
        <button
          className='absolute top-4 right-4 sm:top-5 sm:right-5'
          onClick={(e) => handleFavorite(e, product.id)}
        >
          {isFavorite ? (
            <AiFillHeart className='fill-red-500 w-5 h-5 sm:w-7 sm:h-7' />
          ) : (
            <MdFavoriteBorder className='w-5 h-5 opacity-70 sm:w-7 sm:h-7' />
          )}
        </button>
      </div>
    </div>;
  });
}

export default SkeletonCarouselFeatured;
