function WorkInProgress() {
  return (
    <div className="mt-10 flex flex-col items-center sm:mt-12">
      <h5 className="font-normal text-lg bg-primaryLight px-3 p-1 mb-2 sm:px-5 sm:p-2 sm:mb-3 lg:mb-5">
        Work In Progress...
      </h5>
      <img
        className="w-80 mt-5 sm:w-96 sm:mt-8"
        src="/assets/illustrations/workInProgress.svg"
        alt="favoritesEmpty"
      />
    </div>
  );
}

export default WorkInProgress;
