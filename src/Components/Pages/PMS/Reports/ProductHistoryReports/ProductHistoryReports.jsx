//////////////////////////////////////////////////////////////////////////////////////
//    Author - Almaash alam
//    Version - 1.0
//    Date - 22/07/2024
//    Revision - 1
//    Project - JUIDCO
//    Component  - ProductHistoryReports
//    DESCRIPTION - ProductHistoryReports
//////////////////////////////////////////////////////////////////////////////////////

// src/components/ProductHistoryReports.js
import React, { useState } from "react";
import { GoPlus } from "react-icons/go";
import { useNavigate } from "react-router-dom";
// import ProductHistoryReportList from "./ProductHistoryReportList";
import ProjectApiList from "@/Components/api/ProjectApiList";
import { FaChartPie } from "react-icons/fa";
import { contextVar } from "@/Components/context/contextVar";
import { useContext } from "react";
import TitleBar from "@/Components/Pages/Others/TitleBar";
import InventoryHistoryReports from "./InventoryHistoryReports";

const ProductHistoryReports = () => {
  const [activeTab, setActiveTab] = useState("pre_prec_history");

  const { titleBarVisibility } = useContext(contextVar);

  const navigate = useNavigate();
  const { api_fetchProcurementList, api_fetchProcurementDAList } =
    ProjectApiList();

  return (
    <>
      <div className=''>
        <TitleBar
          titleBarVisibility={titleBarVisibility}
          titleText={"Precurement History Reports"}
        />
      </div>

      <div className='container mx-auto bg-white rounded border border-blue-500 mt-6 shadow-xl'>
        <div className='mt-14'>
          {/* <div>
            <button
              className='bg-[#4338CA] mb-3 mr-5 py-2.5 px-4 text-white rounded hover:bg-white hover:text-[#4338ca] border hover:border-[#4338ca] flex float-right '
              onClick={() => navigate(`/sr-add-pre-procurement`)}
            >
              <GoPlus className='m-1 text-[1rem]' />
              Request Inventory
            </button>
          </div> */}

          <div className='flex ml-5'>
            <button
              className={`py-2 px-4 ${
                activeTab === "pre_prec_history"
                  ? "border-b-2 border-blue-500 text-white bg-[#4338CA]"
                  : "text-gray-500"
              } focus:outline-none flex border border-[#4338ca] rounded`}
              onClick={() => setActiveTab("pre_prec_history")}
            >
              <FaChartPie className='m-1 text-[1rem]' />
              Pre Procurement History
            </button>

            <button
              className={`ml-4 py-2 px-4 ${
                activeTab === "post_prec_history"
                  ? "border-b-2 border-blue-500 text-white bg-[#4338CA]"
                  : "text-gray-500"
              } focus:outline-none flex border border-[#4338ca] rounded`}
              onClick={() => setActiveTab("post_prec_history")}
            >
              <FaChartPie className='m-1 text-[1rem]' />
              Post Procurement History
            </button>

            <button
              className={`ml-4 py-2 px-4 ${
                activeTab === "invt_history"
                  ? "border-b-2 border-blue-500 text-white bg-[#4338CA]"
                  : "text-gray-500"
              } focus:outline-none flex border border-[#4338ca] rounded`}
              onClick={() => setActiveTab("invt_history")}
            >
              <FaChartPie className='m-1 text-[1rem]' />
              Inventory History
            </button>
          </div>
        </div>

        <hr className='w-[76rem] mt-2' />

        <div className='mt-4'>
          {activeTab === "pre_prec_history" && (
            <div className="p-5">
             Pre Prec History 
            </div>
          )}

          {activeTab === "post_prec_history" && (
            <div className="p-5">
            Post Prec History 
           </div>
          )}

          {activeTab === "invt_history" && (
           <div className="p-5">
          <InventoryHistoryReports/>
          </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductHistoryReports;
