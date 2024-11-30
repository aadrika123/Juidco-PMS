//////////////////////////////////////////////////////////////////////////////////////
//    Author - Almaash alam
//    Version - 1.0
//    Date - 22/07/2024
//    Revision - 1
//    Project - JUIDCO
//    Component  - TenderingAdminTabs
//    DESCRIPTION - TenderingAdminTabs
//////////////////////////////////////////////////////////////////////////////////////

import React, { useState } from "react";
import ProjectApiList from "@/Components/api/ProjectApiList";
import { FaChartPie } from "react-icons/fa";
import { contextVar } from "@/Components/context/contextVar";
import { useContext } from "react";
import TitleBar from "@/Components/Pages/Others/TitleBar";
import TenderListings from "./TenderListings";

const TenderingAdminTabs = () => {
  const [activeTab, setActiveTab] = useState("inbox");

  const { titleBarVisibility } = useContext(contextVar);

  const { api_fetchTAOutbox, api_fetchTAInbox } = ProjectApiList();

  return (
    <>
      <div className=''>
        <TitleBar
          titleBarVisibility={titleBarVisibility}
          titleText={"BOQ Listing"}
        />
      </div>

      <div className='container mx-auto bg-white rounded border border-blue-500 mt-6 shadow-xl'>
        <div className='mt-14'>
          <div className='flex gap-4 px-3'>
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

            {/* <button
              className={` py-2 px-4 ${
                activeTab === "outbox"
                  ? "border-b-2 border-blue-500 text-white bg-[#4338CA]"
                  : "text-gray-500"
              } focus:outline-none flex border border-[#4338ca] rounded`}
              onClick={() => setActiveTab("outbox")}
            >
              <FaChartPie className='m-1 text-[1rem]' />
              Outbox
            </button> */}
          </div>
        </div>

        <hr className='w-[76rem]' />
        <div className='mt-4'>
          {activeTab === "inbox" && (
            <div>
              <TenderListings
                page='inbox'
                api={api_fetchTAInbox}
                activeTab={activeTab}
              />
            </div>
          )}
          {activeTab === "outbox" && (
            <div>
              <TenderListings
                page='outbox'
                api={api_fetchTAInbox}
                activeTab={activeTab}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TenderingAdminTabs;
