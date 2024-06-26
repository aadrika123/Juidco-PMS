import React from "react";
// import { specialButtonStyleSolid } from './tradeComponent/CommonStyles'
import { Refresh, Search } from "@mui/icons-material";
import { Tooltip } from "react-tooltip";
// import { Debounce } from './tradeComponent/TradeDebounce';

function AdvtGlobalFilterSearch(props) {
  const handleGlobalSearch = () => {
    let value = document.getElementById("searchValue").value;

    if (value != "" && value?.length > 4) {
      props?.values?.setsearchValue(value);
      props?.values?.setcurrentPageIndex(1);
      return;
    }
    if (value != "" && value?.length >= 1 && value?.length <= 3) {
      return;
    } else {
      props?.values?.setsearchValue("");
      props?.values?.setcurrentPageIndex(1);
      return;
    }
  };

  // const handleInputSearch = Debounce(handleGlobalSearch, 500);

  return (
    <div className='w-full'>
      <div className='grid grid-cols-1 md:flex '>
        <label htmlFor='search'> Search : </label>
        <input
          className={"border border-gray-400 px-2 mx-1  bg-gray-100 py-1"}
          type='text'
          id='searchValue'
          value={props?.filter}
          onChange={(e) => {
            props?.setFilter(e.target.value);
          }}
        />
        <Tooltip anchorId='searchGlobal' />
        <button
          type='button'
          id='searchGlobal'
          data-tooltip-content='Search your input globally'
          className={` whitespace-nowrap border bg-sky-400  hover:bg-sky-500 text-white rounded-md px-2 text-xs`}
          onClick={handleGlobalSearch}
        >
          <Search fontSize='medium' />
          Search Globally
        </button>
        {/* <button type='button' id='searchGlobal' data-tooltip-content='Search your input globally' className={`whitespace-nowrap`}><Search fontSize='medium' />Search Globally</button> */}
      </div>
      <div>
        <p className='text-xs  text-gray-500 font-poppins mt-4'>
          <strong>Note : </strong> If you don't find your search result in the
          box,{" "}
          <span className='text-blue-500 capitalize'> Search Globally</span> to
          get result from the server.
        </p>
      </div>
    </div>
  );
}
export default AdvtGlobalFilterSearch;
