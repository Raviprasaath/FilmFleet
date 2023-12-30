import React from "react";
import { InfinitySpin } from "react-loader-spinner";

const LazyLoader = () => {
  return (
    <div className="flex justify-center items-center">
      <InfinitySpin
        visible={true}
        width="200"
        color="#F2AFEF"
        ariaLabel="infinity-spin-loading"
      />
    </div>
  );
};

export default LazyLoader;
