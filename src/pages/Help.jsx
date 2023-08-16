import React from "react";
import WorkInProgress from "../components/WorkInProgress";

function Help() {
  return (
    <section className="flex justify-center">
      <div className="m-3 sm:m-5 max-w-6xl w-full">
        <h3 className="font-medium text-lg mb-3 sm:mb-5 sm:text-2xl">Help</h3>
        <WorkInProgress />
      </div>
    </section>
  );
}

export default Help;
