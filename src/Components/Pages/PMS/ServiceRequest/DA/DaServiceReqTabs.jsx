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
import ServiceProposalList from "./ServiceProposalList";
import ProjectApiList from "@/Components/api/ProjectApiList";
import { FaChartPie } from "react-icons/fa";
import { contextVar } from "@/Components/context/contextVar";
import { useContext } from "react";
import TitleBar from "@/Components/Pages/Others/TitleBar";

const DaServiceReqTabs = () => {
  const [activeTab, setActiveTab] = useState("inbox");
  const { api_getDaServiceInbox, api_getDaServiceOutbox } = ProjectApiList();
  const { titleBarVisibility } = useContext(contextVar);

  return (
    <>
      <div className=''>
        <TitleBar
          titleBarVisibility={titleBarVisibility}
          titleText={"Service Request Proposal"}
        />
      </div>

      <div className='container mx-auto bg-white rounded border border-blue-500 mt-6 shadow-xl'>
        <div>
          <h1 className='text-[35px] text-right pb-5 pr-5 font-bold pt-5'>
            Service Request
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
              <ServiceProposalList page='inbox' api={api_getDaServiceInbox} />
            </div>
          )}
          {activeTab === "outbox" && (
            <div>
              <ServiceProposalList page='outbox' api={api_getDaServiceOutbox} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DaServiceReqTabs;
