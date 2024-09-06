//////////////////////////////////////////////////////////////////////////////////////
//    Author - Almaash alam
//    Version - 1.0
//    Date - 25/06/2024
//    Revision - 1
//    Project - JUIDCO
//    Component  - EmployeeListTabs
//    DESCRIPTION - EmployeeListTabs
//////////////////////////////////////////////////////////////////////////////////////

import React, { useState } from "react";
import EmployeeList from "./EmployeeList";
import ProjectApiList from "@/Components/api/ProjectApiList";
import { contextVar } from "@/Components/context/contextVar";
import { useContext } from "react";
import TitleBar from "@/Components/Pages/Others/TitleBar";

const EmployeeListTabs = () => {
  const [activeTab, setActiveTab] = useState("inbox");

  const { titleBarVisibility } = useContext(contextVar);
  const { api_employeeHandover } = ProjectApiList();

  return (
    <>
      <div className=''>
        <TitleBar
          titleBarVisibility={titleBarVisibility}
          titleText={"Handover List"}
        />
      </div>

      <div className='container mx-auto bg-white rounded border border-blue-500 mt-6 shadow-xl'>
        <div className='mt-14'>
          <div></div>

          <div className='flex ml-5'></div>
        </div>

        <hr className='w-[76rem]' />

        <div className='mt-4'>
          {activeTab === "inbox" && (
            <div>
              <EmployeeList page='inbox' api={api_employeeHandover} />
            </div>
          )}
          {/* {activeTab === "outbox" && (
            <div>
              <EmployeeList page='outbox' api={api_employeeOutbox} />
            </div>
          )} */}
        </div>
      </div>
    </>
  );
};

export default EmployeeListTabs;
