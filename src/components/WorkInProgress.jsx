function WorkInProgress() {
  return (
    <div className="m-3 flex flex-col items-center sm:m-5">
      <h5 className="font-semibold text-lg bg-primaryLight px-3 p-1 mb-2 sm:text-2xl sm:px-5 sm:p-2 sm:mb-3">
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
