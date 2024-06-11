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
import BasicDetailsForm from "./BasicDetailsForm";
import CoverDetailsForm from "./CoverDetailsForm";
import WorkDetailsForm from "./WorkDetailsForm";
import FeeDetailsForm from "./FeeDetailsForm";
import CriticalDateForm from "./CriticalDateForm";
import BidOpinerForm from "./BidOpinerForm";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

const TenderForm = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const tabNo = Number(searchParams.get("tabNo"));
  // console.log(tabNo)

  const location = useLocation();
  console.log(location?.pathname)

  const { titleBarVisibility } = useContext(contextVar);

  const handleTabClick = (tabNo) => {
    navigate(`/${location.pathname}?tabNo=${tabNo}`);
  };
  

  const btnDetails = [
    { label: "Basic Details", tab: 1, img: bd },
    { label: "Cover Details", tab: 2, img: cd },
    { label: "Work Details", tab: 3, img: wd },
    { label: "Fee Details", tab: 4, img: fd },
    { label: "Critical Details", tab: 5, img: cd2 },
    { label: "Bid Openers", tab: 6, img: bo },
  ];

  // useEffect(() => {
  //   console.log(location.pathname)
  //   console.log(location.search)
  //   //  location?.pathname == '/tendering' && navigate(`/tendering${location.search}`) && navigate('/tendering?tabNo=1') 
  
  // }, [])

  return (
    <>
      <div className=''>
        <TitleBar
          titleBarVisibility={titleBarVisibility}
          titleText={"Tendering"}
        />
      </div>

      <div className='container mx-auto rounded mt-6 '>
        <div className='p-5 border shadow-xl rounded-md flex bg-white w-full justify-between'>
          <div className='w-1/2 flex'>
            <img src={tender} className='w-11' />

            <h1 className='font-bold text-xl pt-2 pl-3'>Tendring Input Form</h1>
          </div>

          <div className='flex w-[15rem] bg-gray-200 rounded-full h-4 dark:bg-gray-200 mt-4'>
            {tabNo === 1 && (
              <div
                className='bg-blue-600 text-xs font-medium text-blue-100  pl-2 pt-0.5 leading-none rounded-full'
                style={{ width: "30%" }}
              >
                {" "}
                Steps: 1/6
              </div>
            )}
            {tabNo === 2 && (
              <div
                className='bg-blue-600 text-xs font-medium text-blue-100  pl-2 pt-0.5 leading-none rounded-full'
                style={{ width: "45%" }}
              >
                Steps: 2/6
              </div>
            )}
            {tabNo === 3 && (
              <div
                className='bg-blue-600 text-xs font-medium text-blue-100  pl-2 pt-0.5 leading-none rounded-full'
                style={{ width: "55%" }}
              >
                Steps: 3/6
              </div>
            )}
            {tabNo === 4 && (
              <div
                className='bg-blue-600 text-xs font-medium text-blue-100  pl-2 pt-0.5 leading-none rounded-full'
                style={{ width: "75%" }}
              >
                Steps: 4/6
              </div>
            )}
            {tabNo === 5 && (
              <div
                className='bg-blue-600 text-xs font-medium text-blue-100  pl-2 pt-0.5 leading-none rounded-full'
                style={{ width: "85%" }}
              >
                Steps: 5/6
              </div>
            )}
            {tabNo === 6 && (
              <div
                className='bg-blue-600 text-xs font-medium text-blue-100 pl-2 pt-0.5 leading-none rounded-full'
                style={{ width: "100%" }}
              >
                Steps: 6/6
              </div>
            )}
          </div>
        </div>

        <div className='flex mt-6'>
          {btnDetails?.map((item, index) => (
            <button
              key={index}
              className={`py-2 px-2 mr-5 ${
                tabNo === item.tab
                  ? "border-b-2 border-blue-500 text-white bg-[#4338CA]"
                  : "text-gray-500 bg-white"
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
          <div>
            <BasicDetailsForm />
          </div>
        )}

        {tabNo === 2 && (
          <div>
            <CoverDetailsForm />
          </div>
        )}

        {tabNo === 3 && (
          <div>
            <WorkDetailsForm />
          </div>
        )}

        {tabNo === 4 && (
          <div>
            <FeeDetailsForm />
          </div>
        )}

        {tabNo === 5 && (
          <div>
            <CriticalDateForm />
          </div>
        )}

        {tabNo === 6 && (
          <div>
            <BidOpinerForm />
          </div>
        )}
      </div>
    </>
  );
};

export default TenderForm;
