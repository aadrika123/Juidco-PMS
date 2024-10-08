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
import CreateMultipleProcurement from "../../StockRequest/InventoryAdmin/CreateMultipleProcurement";

const InventoryProposalListTabs = () => {
  const [activeTab, setActiveTab] = useState("inbox");

  const { titleBarVisibility } = useContext(contextVar);

  const navigate = useNavigate();
  const { api_fetchProcurementList, api_fetchProcurementDAList } =
    ProjectApiList();

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
            {activeTab === "inbox" && (
              <button
                className='bg-[#4338CA] mb-3 mr-5 py-2.5 px-4 text-white rounded hover:bg-white hover:text-[#4338ca] border hover:border-[#4338ca] flex float-right '
                onClick={() => navigate(`/create-pre-procurement/create`)}
              >
                <GoPlus className='m-1 text-[1rem]' />
                Request Inventory
              </button>
            )}
          </div>

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

        <hr className='w-[76rem]' />

        <div className='mt-4'>
          {activeTab === "inbox" && (
            <div>
              <InventoryProposalList
                page='inbox'
                api={api_fetchProcurementList}
              />
            </div>
          )}
          {activeTab === "outbox" && (
            <div>
              <InventoryProposalList
                page='outbox'
                api={api_fetchProcurementDAList}
              />
            </div>
          )}
          {activeTab === "createMultipleProcReq" && (
            <div>
              <CreateMultipleProcurement
                page='createMultipleProcReq'
                api={api_fetchProcurementList}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default InventoryProposalListTabs;
