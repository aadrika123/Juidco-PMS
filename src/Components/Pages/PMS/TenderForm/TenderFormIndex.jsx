//////////////////////////////////////////////////////////////////////////////////////
//    Author - Almaash Alam
//    Version - 1.0
//    Date - 22/05/2024
//    Revision - 1
//    Project - JUIDCO
//    Component  - ReceivedInvtHome
//    DESCRIPTION - ReceivedInvtHome
//////////////////////////////////////////////////////////////////////////////////////

import React, { useState } from "react";
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
import BasicDetailsForm from "./BasicDetailsForm";
import CoverDetailsForm from "./CoverDetailsForm";
import WorkDetailsForm from "./WorkDetailsForm";
import FeeDetailsForm from "./FeeDetailsForm";
import CriticalDateForm from "./CriticalDateForm";
import BidOpinerForm from "./BidOpinerForm";

const TenderForm = () => {
  const [activeTab, setActiveTab] = useState("basic_details");

  const { titleBarVisibility } = useContext(contextVar);

  return (
    <>
      <div className=''>
        <TitleBar
          titleBarVisibility={titleBarVisibility}
          titleText={"Tendering"}
        />
      </div>

      <div className='container mx-auto rounded mt-6 '>
        <div className='p-5 border shadow-xl rounded-md flex bg-white'>
          <img src={tender} className='w-11' />
          <h1 className='font-bold text-xl pt-2 pl-3'>Tendering Input Form</h1>
        </div>

        <div className='flex mt-6'>
          <button
            className={`py-2 px-2 ${
              activeTab === "basic_details"
                ? "border-b-2 border-blue-500 text-white bg-[#4338CA]"
                : "text-gray-500 bg-white"
            } focus:outline-none flex shadow-xl border border-gray-200 rounded`}
            onClick={() => setActiveTab("basic_details")}
          >
            <img src={bd} className='pr-2' />
            Basic Details
          </button>

          <button
            className={`ml-4 py-2 px-2 ${
              activeTab === "cover_details"
                ? "border-b-2 border-blue-500 text-white bg-[#4338CA]"
                : "text-gray-500 bg-white"
            } focus:outline-none flex shadow-xl border border-gray-200 rounded`}
            onClick={() => setActiveTab("cover_details")}
          >
            <img src={cd} className='pr-2' />
            Cover Details
          </button>

          <button
            className={`ml-4 py-2 px-2 ${
              activeTab === "work_details"
                ? "border-b-2 border-blue-500 text-white bg-[#4338CA]"
                : "text-gray-500 bg-white"
            } focus:outline-none flex shadow-xl border border-gray-200 rounded`}
            onClick={() => setActiveTab("work_details")}
          >
            <img src={wd} className='pr-2' />
            Work Details
          </button>

          <button
            className={`ml-4 py-2 px-2 ${
              activeTab === "fee_details"
                ? "border-b-2 border-blue-500 text-white bg-[#4338CA]"
                : "text-gray-500 bg-white"
            } focus:outline-none flex shadow-xl border border-gray-200 rounded`}
            onClick={() => setActiveTab("fee_details")}
          >
            <img src={fd} className='pr-2' />
            Fee Details
          </button>

          <button
            className={`ml-4 py-2 px-2 ${
              activeTab === "critical_dates"
                ? "border-b-2 border-blue-500 text-white bg-[#4338CA]"
                : "text-gray-500 bg-white"
            } focus:outline-none flex shadow-xl border border-gray-200 rounded`}
            onClick={() => setActiveTab("critical_dates")}
          >
            <img src={cd2} className='pr-2' />
            Critical Dates
          </button>

          <button
            className={`ml-4 py-2 px-2 ${
              activeTab === "bid_openers"
                ? "border-b-2 border-blue-500 text-white bg-[#4338CA]"
                : "text-gray-500 bg-white"
            } focus:outline-none flex shadow-xl border border-gray-200 rounded`}
            onClick={() => setActiveTab("bid_openers")}
          >
            <img src={bo} className='pr-2' />
            Bid Opiners
          </button>
        </div>

        {/* <hr className='w-[76rem] mt-3' /> */}
      </div>

      <div className='mt-4'>
        {activeTab === "basic_details" && (
          <div>
            <BasicDetailsForm />
          </div>
        )}

        {activeTab === "cover_details" && (
          <div>
            <CoverDetailsForm />
          </div>
        )}

        {activeTab === "work_details" && (
          <div>
            <WorkDetailsForm />
          </div>
        )}

        {activeTab === "fee_details" && (
          <div>
            <FeeDetailsForm />
          </div>
        )}

        {activeTab === "critical_dates" && (
          <div>
            <CriticalDateForm />
          </div>
        )}

        {activeTab === "bid_openers" && (
          <div>
            <BidOpinerForm />
          </div>
        )}
      </div>
    </>
  );
};

export default TenderForm;
