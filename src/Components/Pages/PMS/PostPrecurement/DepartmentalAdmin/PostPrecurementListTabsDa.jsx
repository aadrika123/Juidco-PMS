// src/components/PostPrecurementListTabsDa.js
import React, { useState } from "react";
import { GoPlus } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import InventoryProposalList from "./PostPrecurementList";
import ProjectApiList from "@/Components/api/ProjectApiList";
import { FaChartPie } from "react-icons/fa";

const PostPrecurementListTabsDa = () => {
  const [activeTab, setActiveTab] = useState("inbox");
  const navigate = useNavigate();
  const {
    api_fetchPostProcurementDAListInbox,
    api_fetchProcurementDAListOutbox,
  } = ProjectApiList();

  return (
    <div className='container mx-auto bg-white rounded border border-blue-500 mt-6'>
      <div>
        <h1 className='text-[35px] text-right pb-5 pr-5 font-bold pt-5'>
          Inventory Proposal
        </h1>
      </div>
      <div>
        {/* <button 
              className="bg-[#4338CA] pl-2 pr-4 pt-3 pb-3 text-white rounded hover:bg-white hover:text-[#4338ca] border hover:border-[#4338ca] flex float-right "
              onClick={() =>
              navigate(`/sr-add-pre-procurement`)
            }
              >
              
              <GoPlus className="m-1 text-[1rem]"/>
              Request Inventory
              </button> */}
      </div>
      <div className='flex border-b border-gray-200 ml-5'>
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
      <div className='mt-4'>
        {activeTab === "inbox" && (
          <div>
            <InventoryProposalList
              page='inbox'
              api={api_fetchPostProcurementDAListInbox}
            />
          </div>
        )}
        {activeTab === "outbox" && (
          <div>
            <InventoryProposalList
              page='outbox'
              api={api_fetchProcurementDAListOutbox}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostPrecurementListTabsDa;
