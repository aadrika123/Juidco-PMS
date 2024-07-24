//////////////////////////////////////////////////////////////////////////////////////
//    Author - Almaash alam
//    Version - 1.0
//    Date - 22/07/2024
//    Revision - 1
//    Project - JUIDCO
//    Component  - InventoryHistoryReports
//    DESCRIPTION - InventoryHistoryReports
//////////////////////////////////////////////////////////////////////////////////////

// src/components/InventoryHistoryReports.js
import React, { useState } from "react";
import { GoPlus } from "react-icons/go";
import { useNavigate } from "react-router-dom";
// import ProductHistoryReportList from "./ProductHistoryReportList";
import ProjectApiList from "@/Components/api/ProjectApiList";
import { FaChartPie } from "react-icons/fa";
import { contextVar } from "@/Components/context/contextVar";
import { useContext } from "react";
import TitleBar from "@/Components/Pages/Others/TitleBar";
import ListTableParent from "@/Components/Common/ListTable2/ListTableParent";

const InventoryHistoryReports = (props) => {
  const [activeTab, setActiveTab] = useState("assign_history");

  const { titleBarVisibility } = useContext(contextVar);

  const navigate = useNavigate();
  const { api_fetchProcurementList, api_fetchProcurementDAList } =
    ProjectApiList();

  return (
    <>
      <div className="">
        <div className="flex ml-5">
          <button
            className={`py-2 px-4 ${
              activeTab === "assign_history"
                ? "border-b-2 border-[#4338ca] text-[#4338CA]"
                : "text-gray-500"
            } focus:outline-none flex`}
            onClick={() => setActiveTab("assign_history")}
          >
            Assign History
          </button>

          <button
            className={`ml-4 py-2 px-4 ${
              activeTab === "return_history"
                ? "border-b-2 border-[#4338ca] text-[#4338CA]"
                : "text-gray-500"
            } focus:outline-none flex`}
            onClick={() => setActiveTab("return_history")}
          >
            Return History
          </button>

          <button
            className={`ml-4 py-2 px-4 ${
              activeTab === "claim_warranty_history"
                ? "border-b-2 border-[#4338ca] text-[#4338CA]"
                : "text-gray-500"
            } focus:outline-none flex`}
            onClick={() => setActiveTab("claim_warranty_history")}
          >
            Claim Warranty History
          </button>

          <button
            className={`ml-4 py-2 px-4 ${
              activeTab === "repair_history"
                ? "border-b-2 border-[#4338ca] text-[#4338CA]"
                : "text-gray-500"
            } focus:outline-none flex`}
            onClick={() => setActiveTab("repair_history")}
          >
            Repair History
          </button>

          <button
            className={`ml-4 py-2 px-4 ${
              activeTab === "dead_stock"
                ? "border-b-2 border-[#4338ca] text-[#4338CA]"
                : "text-gray-500"
            } focus:outline-none flex`}
            onClick={() => setActiveTab("dead_stock")}
          >
            Dead Stock
          </button>
        </div>
      </div>

      <hr className="w-[74rem] mt-2" />

      <div className="mt-4">
        {activeTab === "assign_history" && (
          <div className="p-5">
              <ListTableParent
                columns={props?.COLUMNS}
                api={api_fetchProcurementList}
                // table={tableSelector(props?.page)}
                // requestBody={requestBody} // sending body
                // changeData={changeData} // send action for new payload
              />
          </div>
        )}

        {activeTab === "return_history" && (
          <div className="p-5">
              <ListTableParent
                columns={props?.COLUMNS}
                api={api_fetchProcurementList}
                // table={tableSelector(props?.page)}
                // requestBody={requestBody} // sending body
                // changeData={changeData} // send action for new payload
              />

          </div>
        )}

        {activeTab === "claim_warranty_history" && (
          <div className="p-5">
            <div className="p-2">
              <ListTableParent
                columns={props?.COLUMNS}
                // table={tableSelector(props?.page)}
                api={api_fetchProcurementList}
                // requestBody={requestBody} // sending body
                // changeData={changeData} // send action for new payload
              />
            </div>
          </div>
        )}

        {activeTab === "repair_history" && (
          <div className="p-5">
              <ListTableParent
                columns={props?.COLUMNS}
                api={api_fetchProcurementList}
                // table={tableSelector(props?.page)}
                // requestBody={requestBody} // sending body
                // changeData={changeData} // send action for new payload
              />
            </div>
        )}

        {activeTab === "dead_stock" && (
          <div className="p-5">
              <ListTableParent
                columns={props?.COLUMNS}
                api={api_fetchProcurementList}
                // table={tableSelector(props?.page)}
                // requestBody={requestBody} // sending body
                // changeData={changeData} // send action for new payload
              />
          </div>
        )}
      </div>
    </>
  );
};

export default InventoryHistoryReports;
