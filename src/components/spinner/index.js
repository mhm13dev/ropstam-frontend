import React from "react";
import { ImSpinner2 } from "react-icons/im";

const Spinner = ({ className = "" }) => {
  return (
    <ImSpinner2
      className={`mx-auto h-12 w-12 animate-spin text-indigo-500 ${className}`}
    />
  );
};

export default Spinner;
