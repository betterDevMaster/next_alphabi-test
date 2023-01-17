import React from "react";

const Search = ({ onChange }) => (
  <div className="position-relative fs-4 text-dark fw-bolder w-50">
    <i
      className="fa fa-search fs-4 position-absolute"
      style={{
        left: "12px",
        top: "30%",
      }}
    ></i>
    <input
      className="form-control form-control-solid w-100 ps-10"
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search Address"
    />
  </div>
);

export default Search;
