//////////////////////////////////////////////////////////////////////////////////////
//    Author - Almaash alam
//    Version - 1.0
//    Date - 22/05/2024
//    Revision - 1
//    Project - JUIDCO
//    Component  - InventoryProposalListTabs
//    DESCRIPTION - InventoryProposalListTabs
//////////////////////////////////////////////////////////////////////////////////////

// src/components/InventoryProposalListTabs.js
import React, { useState } from "react";
import { GoPlus } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import InventoryProposalList from "./InventoryProposalList";
import ProjectApiList from "@/Components/api/ProjectApiList";
import { FaChartPie } from "react-icons/fa";
import { contextVar } from "@/Components/context/contextVar";
import { useContext } from "react";
import TitleBar from "@/Components/Pages/Others/TitleBar";

const InventoryAdminTabsOld = () => {
  const [activeTab, setActiveTab] = useState("inbox");

  const { titleBarVisibility } = useContext(contextVar);

  const navigate = useNavigate();
  const { api_iaStockReqInbox, api_iaStockReqOubox } = ProjectApiList();

  const btnDetails = [
    { label: "Pre Procurement History", tab: 1 },
    { label: "Post Procurement History", tab: 2 },
    { label: "Inventory History", tab: 3 },
  ];

  return (
    <>
      <div className=''>
        <TitleBar
          titleBarVisibility={titleBarVisibility}
          titleText={"Inventory Proposal"}
        />
      </div>

      <div className='container mx-auto bg-white rounded border border-blue-500 mt-6 shadow-xl'>
        <div className='mt-14'>
          <div>
            <button
              className='bg-[#4338CA] mb-3 mr-5 py-2.5 px-4 text-white rounded hover:bg-white hover:text-[#4338ca] border hover:border-[#4338ca] flex float-right '
              onClick={() => navigate(`/create-pre-procurement/create`)}
            >
              <GoPlus className='m-1 text-[1rem]' />
              Request Inventory
            </button>
          </div>

          <div className='flex ml-5'>
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
            {/* <button
              className={`py-2 px-4 ${
                activeTab === "inbox"
                  ? "border-b-2 border-blue-500 text-white bg-[#4338CA]"
                  : "text-gray-500"
              } focus:outline-none flex border border-[#4338ca] rounded`}
              onClick={() => setActiveTab("inbox")}
            >
              <FaChartPie className='m-1 text-[1rem]' />
              Stock Requests
            </button>
            <button
              className={`ml-4 py-2 px-4 ${
                activeTab === "outbox"
                  ? "border-b-2 border-blue-500 text-white bg-[#4338CA]"
                  : "text-gray-500"
              } focus:outline-none flex border border-[#4338ca] rounded`}
              onClick={() => setActiveTab("outbox")}
            >
              <FaChartPie className='m-1 text-[1rem]' />
              Pre-Procurement Inbox
            </button> */}
          </div>
        </div>

        <hr className='w-[76rem]' />

        <div className='mt-4'>
          {activeTab === "inbox" && (
            <div>
              <InventoryProposalList page='inbox' api={api_iaStockReqInbox} />
            </div>
          )}
          {activeTab === "outbox" && (
            <div>
              <InventoryProposalList page='outbox' api={api_iaStockReqOubox} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default InventoryAdminTabsOld;
