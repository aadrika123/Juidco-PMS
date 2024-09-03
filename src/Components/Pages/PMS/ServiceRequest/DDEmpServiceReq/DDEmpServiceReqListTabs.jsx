//////////////////////////////////////////////////////////////////////////////////////
//    Author - Almaash alam
//    Version - 1.0
//    Date - 25/06/2024
//    Revision - 1
//    Project - JUIDCO
//    Component  - DDEmpServiceReqListTabs
//    DESCRIPTION - DDEmpServiceReqListTabs
//////////////////////////////////////////////////////////////////////////////////////

import React, { useState } from "react";
import { GoPlus } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import EmployeeList from "./DDEmpServiceReqList";
import ProjectApiList from "@/Components/api/ProjectApiList";
import { FaChartPie } from "react-icons/fa";
import { contextVar } from "@/Components/context/contextVar";
import { useContext } from "react";
import TitleBar from "@/Components/Pages/Others/TitleBar";

const DDEmpServiceReqListTabs = () => {
  const [activeTab, setActiveTab] = useState("inbox");

  const { titleBarVisibility } = useContext(contextVar);

  const navigate = useNavigate();
  const { api_ddemployeeServiceInbox, api_ddemployeeServiceOutbox } =
    ProjectApiList();

  return (
    <>
      <div className="">
        <TitleBar
          titleBarVisibility={titleBarVisibility}
          titleText={"Employee service List"}
        />
      </div>

      <div className="container mx-auto bg-white rounded border border-blue-500 mt-6 shadow-xl">
        <div className="mt-14">
          <div></div>

          <div className="flex ml-5">
            <button
              className={`py-2 px-4 ${
                activeTab === "inbox"
                  ? "border-b-2 border-blue-500 text-white bg-[#4338CA]"
                  : "text-gray-500"
              } focus:outline-none flex border border-[#4338ca] rounded`}
              onClick={() => setActiveTab("inbox")}
            >
              <FaChartPie className="m-1 text-[1rem]" />
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
              <FaChartPie className="m-1 text-[1rem]" />
              Outbox
            </button>
          </div>
        </div>

        <hr className="w-[76rem]" />

        <div className="mt-4">
          {activeTab === "inbox" && (
            <div>
              <EmployeeList page="inbox" api={api_ddemployeeServiceInbox} />
            </div>
          )}
          {activeTab === "outbox" && (
            <div>
              <EmployeeList page='outbox' api={api_ddemployeeServiceOutbox} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DDEmpServiceReqListTabs;
