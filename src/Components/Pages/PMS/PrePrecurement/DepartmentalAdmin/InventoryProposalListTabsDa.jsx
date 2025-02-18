//////////////////////////////////////////////////////////////////////////////////////
//    Author - Almaash alam
//    Version - 1.0
//    Date - 22/05/2024
//    Revision - 1
//    Project - JUIDCO
//    Component  - InventoryProposalListTabs
//    DESCRIPTION - InventoryProposalListTabs
//////////////////////////////////////////////////////////////////////////////////////

import React, { useState } from "react";
import InventoryProposalList from "./InventoryProposalList";
import ProjectApiList from "@/Components/api/ProjectApiList";
import { FaChartPie } from "react-icons/fa";
import { contextVar } from "@/Components/context/contextVar";
import { useContext } from "react";
import TitleBar from "@/Components/Pages/Others/TitleBar";

const InventoryProposalListTabs = () => {
  const [activeTab, setActiveTab] = useState("inbox");
  const { api_fetchStockRequestDAInbox, api_fetchStockRequestDAOutbox } =
    ProjectApiList();

  const { titleBarVisibility } = useContext(contextVar);

  return (
    <>
      <div className=''>
        <TitleBar
          titleBarVisibility={titleBarVisibility}
          titleText={"Stock Request"}
        />
      </div>

      <div className='container mx-auto bg-white rounded border border-blue-500 mt-6 shadow-xl'>
        <div>
          <h1 className='text-[35px] text-right pb-5 pr-5 font-bold pt-5'>
            Stock Request
          </h1>
        </div>

        <div className=''>
          <div className='flex ml-5'>
            <button
              className={`py-2 px-4 ${
                activeTab === "inbox"
                  ? "border-b-2 border-blue-500 text-white bg-[#4338CA]"
                  : "text-gray-500"
              } focus:outline-none flex border border-[#4338ca] rounded`}
              onClick={() => setActiveTab("inbox")}
            >
              <FaChartPie className='m-1 text-[1rem]' />
              Inbox
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
              Outbox
            </button>
          </div>
        </div>
        <hr className='w-[76rem] mt-5' />

        <div className='mt-4'>
          {activeTab === "inbox" && (
            <div>
              <InventoryProposalList
                page='inbox'
                api={api_fetchStockRequestDAInbox}
              />
            </div>
          )}
          {activeTab === "outbox" && (
            <div>
              <InventoryProposalList
                page='outbox'
                api={api_fetchStockRequestDAOutbox}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default InventoryProposalListTabs;
