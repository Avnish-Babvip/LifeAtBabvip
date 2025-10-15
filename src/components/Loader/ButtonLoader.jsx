import React from "react";

const ButtonLoader = () => {
  return (
    <div
      className="spinner-border text-white"
      role="status"
      style={{ width: "1rem", height: "1rem", borderWidth: "2px" }}
    >
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};

export default ButtonLoader;
