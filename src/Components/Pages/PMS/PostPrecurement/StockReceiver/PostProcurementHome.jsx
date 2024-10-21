//////////////////////////////////////////////////////////////////////////////////////
//    Author - Almaash alam
//    Version - 1.0
//    Date - 24/05/2024
//    Revision - 1
//    Project - JUIDCO
//    Component  - PostProcurementHome
//    DESCRIPTION - PostProcurementHome
//////////////////////////////////////////////////////////////////////////////////////

// src/components/PostProcurementHome.js
import React, { useState } from "react";
import InventoryProposalList from "./InventoryProposalList";
import ProjectApiList from "@/Components/api/ProjectApiList";
import { FaChartPie } from "react-icons/fa";
import { contextVar } from "@/Components/context/contextVar";
import { useContext } from "react";
import TitleBar from "@/Components/Pages/Others/TitleBar";

const PostProcurementHome = () => {
  const [activeTab, setActiveTab] = useState("inbox");
  const { api_fetchProcurementListInbox } = ProjectApiList();

  const { titleBarVisibility } = useContext(contextVar);

  return (
    <>
      <div className=''>
        <TitleBar
          titleBarVisibility={titleBarVisibility}
          titleText={"Inventory Proposal List"}
        />
      </div>

      <div className='container mx-auto bg-white rounded border border-blue-500 mt-6 shadow-xl'>
        <div>
          <h1 className='text-[30px] text-right pb-2 pr-5 pt-2 font-bold'>
            Inventory Proposal
          </h1>
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
        </div>

        <hr className='w-[76rem] mt-3' />

        <div className='mt-4'>
          {activeTab === "inbox" && (
            <div>
              <InventoryProposalList
                page='inbox'
                api={api_fetchProcurementListInbox}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PostProcurementHome;
