// //////////////////////////////////////////////////////////////////////////////////////
// //    Author - Talib Hussain
// //    Version - 1.0
// //    Date - 24 june 2022
// //    Revision - 1
// //    Project - JUIDCO
// //    Component  - GlobalFilter
// //    DESCRIPTION - GlobalFilter Component
// //////////////////////////////////////////////////////////////////////////////////////
// import React from "react";
// import { IoSearch } from "react-icons/io5";

// function GlobalFilter({ filter, setFilter }) {
//   return (
//     <>
//       <IoSearch
//         className='relative left-[190px] bottom-[-27px]'
//         color='black'
//         size={22}
//       />
//       <input
//         className='border-2 border-gray-600 px-2 bg-gray-200 h-8 rounded'
//         type='text'
//         value={filter || ""}
//         onChange={(e) => setFilter(e.target.value)}
//         placeholder='Search'
//       />
//     </>
//   );
// }

// export default GlobalFilter;
// /**
//  * Exported to :
//  * 1. BasicTable Component
//  *
//  */


import React, { useState, useEffect } from "react";
import { IoSearch } from "react-icons/io5";

function GlobalFilter({ filter, setFilter }) {
  const [debouncedFilter, setDebouncedFilter] = useState(filter);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilter(debouncedFilter);
    }, 1500);
    return () => clearTimeout(timer);
  }, [debouncedFilter, setFilter]);

  const handleChange = (e) => {
    setDebouncedFilter(e.target.value);
  };

  return (
    <>
      <IoSearch
        className="relative left-[190px] bottom-[-27px]"
        color="black"
        size={22}
      />
      <input
        className="border-2 border-gray-600 px-2 bg-gray-200 h-8 rounded"
        type="text"
        value={debouncedFilter || ""}
        onChange={handleChange}
        placeholder="Search"
      />
    </>
  );
}

export default GlobalFilter;

