const skeletonProducts = Array.from({ length: 5 });

// function SkeletonCarouselFeatured() {
//   return skeletonProducts.map((_, idx) => (
//     <div
//       className="w-40 sm:w-52 md:w-60 p-3 shadow md:hover:shadow-md md:hover:shadow-zinc-500 md:transition-shadow bg-white rounded-md relative sm:p-5 "
//       key={idx}
//     >
//       <div className="flex flex-col w-full h-full">
//         <div className="object-contain p-3 md:p-5 h-40 w-40"></div>
//         <h3 className="line-clamp-1 h-8 sm:text-lg">product.sku</h3>
//         <div className=" flex mt-1 items-center text-xl sm:text-2xl sm:mt-3">
//           <strong>$price</strong>
//         </div>
//       </div>
//     </div>
//   ));
// }
function SkeletonCarouselFeatured() {
  return skeletonProducts.map((_, idx) => (
    <div
      className="w-40 h-56 sm:w-52 sm:h-72 md:w-60 md:h-[340px] p-3 shadow md:hover:shadow-md md:hover:shadow-zinc-500 md:transition-shadow bg-white rounded-md relative sm:p-5 "
      key={idx}
    >
      <div className="flex flex-col w-full h-full">
        <div className="object-contain h-full bg-slate-200 animate-pulse mb-5">
          <div className="w-32 sm:w-40 md:w-52 "></div>
        </div>
        <h3 className="line-clamp-1 h-8 w-1/2 sm:text-lg bg-slate-200 animate-pulse"></h3>
        <div className="h-10 w-1/2 mt-1  sm:mt-3 bg-slate-200 animate-pulse"></div>
      </div>
    </div>
  ));
}

export default SkeletonCarouselFeatured;
