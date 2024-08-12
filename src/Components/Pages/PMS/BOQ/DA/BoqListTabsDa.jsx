//////////////////////////////////////////////////////////////////////////////////////
//    Author - Dimple Kumari
//    Version - 1.0
//    Date - 10/06/2024
//    Revision - 1
//    Project - JUIDCO
//    Component  - BoqListTabs
//    DESCRIPTION - BoqListTabs for inbox and outbox
//////////////////////////////////////////////////////////////////////////////////////

import React, { useState } from "react";
import InventoryProposalList from "./InventoryProposalList";
import ProjectApiList from "@/Components/api/ProjectApiList";
import { FaChartPie } from "react-icons/fa";
import { contextVar } from "@/Components/context/contextVar";
import { useContext } from "react";
import TitleBar from "@/Components/Pages/Others/TitleBar";

const BoqListTabsDa = () => {
  const [activeTab, setActiveTab] = useState("inbox");
  const { api_fetchDaBoqListInbox, api_fetchDaBoqListOutbox } =
    ProjectApiList();
  const { titleBarVisibility, reference_no } = useContext(contextVar);
  console.log(reference_no, "-----refff");

  return (
    <>
      <div className=''>
        <TitleBar
          titleBarVisibility={titleBarVisibility}
          titleText={"Inventory Proposal"}
        />
      </div>

      <div className='container mx-auto bg-white rounded border border-blue-500 mt-6 shadow-xl'>
        <div>
          <h1 className='text-[35px] text-right pb-5 pr-5 font-bold pt-5'>
            Inventory Proposal
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
                api={api_fetchDaBoqListInbox}
              />
            </div>
          )}
          {activeTab === "outbox" && (
            <div>
              <InventoryProposalList
                page='outbox'
                api={api_fetchDaBoqListOutbox}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BoqListTabsDa;
