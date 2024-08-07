//////////////////////////////////////////////////////////////////////////////////////
//    Author - Almaash Alam
//    Version - 1.0
//    Date - 22/07/2024
//    Revision - 1
//    Project - JUIDCO
//    Component  - BiddingComparisionTabs
//    DESCRIPTION - BiddingComparisionTabs
//////////////////////////////////////////////////////////////////////////////////////

// src/components/BiddingComparisionTabs.js
import React, { useState } from "react";
import { GoPlus } from "react-icons/go";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { FaChartPie } from "react-icons/fa";
import { contextVar } from "@/Components/context/contextVar";
import { useContext } from "react";
import TitleBar from "@/Components/Pages/Others/TitleBar";
import BiddingCreteria from "./BiddingCreteria";
// import TabsMenu from "./TabsMenu";
import techIcon from "@/Components/assets/TechIcon.svg";
import { HiArrowPathRoundedSquare } from "react-icons/hi2";

const BiddingComparisionTabs = () => {
  let [searchParams, setSearchParams] = useSearchParams();

  const { titleBarVisibility } = useContext(contextVar);

  const navigate = useNavigate();

  const location = useLocation();
  const tabNo = Number(searchParams.get("tabNo") || "?tabNo=1");

  const handleTabClick = (tabNo) => {
    navigate(`/${location.pathname}?tabNo=${tabNo}`);
  };

  const btnDetails = [
    { label: "Technical Comparision", tab: 1 },
    { label: "Financial Comparision", tab: 2 },
    { label: "Bidder Details", tab: 3 },
  ];

  return (
    <>
      <div className="">
        <TitleBar
          titleBarVisibility={titleBarVisibility}
          titleText={"Bidding Comparision"}
        />
      </div>

      <div className="">
        <div className="flex justify-between items-center">
          <div className="flex mt-2">
            {btnDetails?.map((item, index) => (
              <button
                key={index}
                disabled
                className={`py-2 px-2 mr-5 ${
                  tabNo === item.tab
                    ? "border-b-2 border-blue-500 text-white bg-[#4338CA]"
                    : "text-gray-500 bg-white "
                } focus:outline-none flex shadow-xl border border-gray-300 rounded justify-center items-center space-x-4`}
                onClick={() => handleTabClick(item.tab)}
              >
                <HiArrowPathRoundedSquare className="m-1 text-[1.2rem]" />

                {item.label}
              </button>
            ))}
          </div>
          <div className="mt-6"></div>
        </div>
      </div>
      <div className="container mx-auto rounded  mt-6">
        <div className="mt-4">
          {tabNo === 1 && (
            <div
              className={`${tabNo >= 1 ? "stockReq" : "disabled:bg-red-300"}`}
            >
              <BiddingCreteria
                heading={"Technical Comparision"}
                page={"stockReq"}
                tabNo={"2"}
              />
            </div>
          )}
          {tabNo === 2 && (
            <div
              className={`${
                tabNo >= 2 ? "procurement" : "disabled:bg-red-300"
              }`}
            >
              <BiddingCreteria
                heading={"Financial Comparision"}
                page={"procurement"}
                tabNo={"3"}
              />
            </div>
          )}
          {tabNo === 3 && (
            <div
              className={`${
                tabNo >= 3 ? "procurement" : "disabled:bg-red-300"
              }`}
            >
              <BiddingCreteria
                heading={"Financial Comparision"}
                page={"procurement"}
                tabNo={"4"}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BiddingComparisionTabs;
