// src/components/ReceivedInvtHome.js
import React, { useState } from "react";
import { GoPlus } from "react-icons/go";
import { useNavigate } from "react-router-dom";
// import InventoryProposalList from "./InventoryProposalList";
import ProjectApiList from "@/Components/api/ProjectApiList";
import { FaChartPie } from "react-icons/fa";
import ReceivedInvtList from "./ReceivedInvtList";

const ReceivedInvtHome = () => {
  const [activeTab, setActiveTab] = useState("inbox");
  const navigate = useNavigate();
  const { api_fetchProcurementList, api_fetchProcurementDAList } =
    ProjectApiList();

  return (
    <div className='container mx-auto bg-white rounded border border-blue-500 mt-6'>
      <div>
        <h1 className='text-[30px] text-right pb-2 pr-5 pt-2 font-bold'>
          Inventory Proposal
        </h1>
      </div>
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

      <hr className='w-[76rem] mt-3' />

      <div className='mt-4'>
        {activeTab === "inbox" && (
          <div>
            <ReceivedInvtList
              page='inbox'
              api={api_fetchProcurementList}
            />
          </div>
        )}
        {activeTab === "outbox" && (
          <div>
            <ReceivedInvtList
              page='outbox'
              api={api_fetchProcurementDAList}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ReceivedInvtHome;