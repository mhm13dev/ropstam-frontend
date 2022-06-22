import React from "react";

const PageHeading = ({ text }) => {
  return (
    <h1 className="text-2xl font-semibold text-center mb-8 text-indigo-500">
      {" "}
      {text}
    </h1>
  );
};

export default PageHeading;
