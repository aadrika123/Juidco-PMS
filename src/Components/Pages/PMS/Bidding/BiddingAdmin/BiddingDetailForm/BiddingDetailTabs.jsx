//////////////////////////////////////////////////////////////////////////////////////
//    Author - Almaash Alam
//    Version - 1.0
//    Date - 22/05/2024
//    Revision - 1
//    Project - JUIDCO
//    Component  - ReceivedInvtHome
//    DESCRIPTION - ReceivedInvtHome
//////////////////////////////////////////////////////////////////////////////////////

import React, { useEffect, useState } from "react";
import { contextVar } from "@/Components/context/contextVar";
import { useContext } from "react";
import TitleBar from "@/Components/Pages/Others/TitleBar";

import tender from "@/Components/assets/tender.png";
import bd from "@/Components/assets/basicdetails.svg";
import cd from "@/Components/assets/cd.svg";
import wd from "@/Components/assets/wd.svg";
import fd from "@/Components/assets/fd.svg";
import cd2 from "@/Components/assets/cd2.svg";
import bo from "@/Components/assets/bo.svg";
import prev from "@/Components/assets/prev.svg";
// import BasicDetailsForm from "./BasicDetailsForm";
// import CoverDetailsForm from "./CoverDetailsForm";
// import WorkDetailsForm from "./WorkDetailsForm";
// import FeeDetailsForm from "./FeeDetailsForm";
// import CriticalDateForm from "./CriticalDateForm";
// import BidOpinerForm from "./BidOpinerForm";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import BiddingDetailForm from "./BiddingDetailForm";
// import TenderFormViewDetails from "./TenderFormViewDetails";

const BiddingDetails = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  
  const location = useLocation();
  
  const { titleBarVisibility } = useContext(contextVar);
  
  const tabNo = Number(searchParams.get("tabNo"));
  
  const handleTabClick = (tabNo) => {
    navigate(`/${location.pathname}?tabNo=${tabNo}`);
  };

  const btnDetails = [
    { label: "Bidder- 01", tab: 1, img: bd },
    { label: "Bidder- 02", tab: 2, img: bd },
    { label: "Bidder- 03", tab: 3, img: bd },
  ];

  return (
    <>
      <div className=''>
        <TitleBar
          titleBarVisibility={titleBarVisibility}
          titleText={"Bidding Form"}
        />
      </div>

      <div className='container mx-auto rounded mt-6 '>
        <div className='p-5 border shadow-xl rounded-md flex bg-white w-full justify-between'>
          <div className='w-1/2 flex'>
            <img src={tender} className='w-11' />

            <h1 className='font-bold text-xl pt-2 pl-3'>
              Bidder Details
            </h1>
          </div>

          
        </div>

        <div className='flex mt-6'>
          {btnDetails?.map((item, index) => (
            <button
              key={index}
              className={`py-2 px-2 mr-5 ${
                tabNo === item.tab
                  ? "border-b-2 border-blue-500 text-white bg-[#4338CA]"
                  : "text-gray-500 bg-white "
              } focus:outline-none flex shadow-xl border border-gray-300 rounded`}
              onClick={() => handleTabClick(item.tab)}
            >
              <img src={item.img} className='pr-2' />
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className='mt-4'>
        {tabNo === 1 && (
          <div className={`${tabNo >= 1 ? "" : "disabled:bg-red-300"}`}>
            <BiddingDetailForm/>
          </div>
        )}

        {tabNo === 2 && (
          <div className={`${tabNo >= 2 ? "" : "disabled:bg-red-300"}`}>
            <BiddingDetailForm/>
          </div>
        )}

        {tabNo === 3 && (
          <div className={`${tabNo >= 2 ? "" : "disabled:bg-red-300"}`}>
            <BiddingDetailForm/>
          </div>
        )}

      </div>
    </>
  );
};

export default BiddingDetails;
