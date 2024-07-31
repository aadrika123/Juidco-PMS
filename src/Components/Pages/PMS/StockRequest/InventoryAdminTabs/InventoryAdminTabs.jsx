//////////////////////////////////////////////////////////////////////////////////////
//    Author - Dimple Kumari
//    Version - 1.0
//    Date - 22/07/2024
//    Revision - 1
//    Project - JUIDCO
//    Component  - InventoryAdminTabs
//    DESCRIPTION - InventoryAdminTabs
//////////////////////////////////////////////////////////////////////////////////////

// src/components/InventoryAdminTabs.js
import React, { useState } from "react";
import { GoPlus } from "react-icons/go";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
// import ProductHistoryReportList from "./ProductHistoryReportList";
import ProjectApiList from "@/Components/api/ProjectApiList";
import { FaChartPie } from "react-icons/fa";
import { contextVar } from "@/Components/context/contextVar";
import { useContext } from "react";
import TitleBar from "@/Components/Pages/Others/TitleBar";
import TabsMenu from "./TabsMenu";

const InventoryAdminTabs = () => {
  const [activeTab, setActiveTab] = useState("pre_prec_history");
  let [searchParams, setSearchParams] = useSearchParams();

  const { titleBarVisibility } = useContext(contextVar);

  const navigate = useNavigate();

  const location = useLocation();
  const tabNo = Number(searchParams.get("tabNo"));

  const handleTabClick = (tabNo) => {
    navigate(`/${location.pathname}?tabNo=${tabNo}`);
  };

  

  const btnDetails = [
    { label: "Stock Request", tab: 1 },
    { label: "Procurement", tab: 2 },
  ];

  return (
    <>
      <div className=''>
        <TitleBar
          titleBarVisibility={titleBarVisibility}
          titleText={"Procurement History Reports"}
        />
      </div>

      <div className='mt-3'>
        <div className='flex justify-between items-center'>
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
                <FaChartPie className='m-1 text-[1rem]' />
                {item.label}
              </button>
            ))}
          </div>
          <div className="mt-6">
            <button
              className='bg-[#4338CA] mr-5 py-2.5 px-4 text-white rounded hover:bg-white hover:text-[#4338ca] border hover:border-[#4338ca] flex float-right '
              onClick={() => navigate(`/create-pre-procurement`)}
            >
              <GoPlus className='m-1 text-[1rem]' />
              Create Pre-Procurement
            </button>
          </div>
        </div>
      </div>
      <div className='container mx-auto bg-white rounded border border-blue-500 mt-6 shadow-xl'>
        <div className='mt-4'>
          {tabNo === 1 && (
            <div
              className={`${tabNo >= 1 ? "stockReq" : "disabled:bg-red-300"}`}
            >
              <TabsMenu  page={"stockReq"} />
            </div>
          )}
          {tabNo === 2 && (
            <div
              className={`${
                tabNo >= 2 ? "procurement" : "disabled:bg-red-300"
              }`}
            >
              <TabsMenu  page={"procurement"} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default InventoryAdminTabs;
