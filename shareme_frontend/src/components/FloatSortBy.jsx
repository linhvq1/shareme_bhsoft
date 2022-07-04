import React from "react";
import { MdDone } from "react-icons/md";

function FloatSortBy({ name, isChecked, handleSortBy }) {
  return (
    <div
      className="p-0.5 ml-1 hover:bg-gray-200 rounded-lg flex items-center justify-between cursor-pointer"
      onClick={() => handleSortBy(name)}
    >
      <h3>{name}</h3>
      {isChecked && <MdDone />}
    </div>
  );
}

export default FloatSortBy;
