import React from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const TenderFormButton = (props) => {
  let [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();
  const location = useLocation();
  // console.log(location)

  const tabNo = Number(searchParams.get("tabNo"));
//   console.log(tabNo);

  const handleBack = (tabNo) => {
    let newTab = tabNo - 1;
    console.log(newTab);
    navigate(`/${location.pathname}?tabNo=${newTab}`);
  };

  return (
    <div className="mb-5">
      <button
        className="bg-[#4338CA] mt-5 py-2 px-4 text-sm text-white rounded hover:bg-white hover:text-[#4338ca] border hover:border-[#4338ca] flex float-left"
        onClick={() => handleBack(tabNo)}
      >
        Back
      </button>
      <button
        className="bg-[#4338CA] mt-5 py-2 px-4 text-sm text-white rounded hover:bg-white hover:text-[#4338ca] border border-[#4338ca] flex float-right animate-pulse"
        type="submit"
      >
        Save & Next
      </button>

      <button
        className="bg-white mt-5 py-2 px-4 text-sm text-black rounded hover:bg-[#4338CA] hover:text-white border border-[#4338ca] mr-5 flex float-right"
        // onClick='##'
      >
        Reset
      </button>
    </div>
  );
};

export default TenderFormButton;
