//////////////////////////////////////////////////////////////////////////////////////
//    Author - Almaash alam
//    Version - 1.0
//    Date - 22/07/2024
//    Revision - 1
//    Project - JUIDCO
//    Component  - ProductHistoryReports
//    DESCRIPTION - ProductHistoryReports
//////////////////////////////////////////////////////////////////////////////////////

// src/components/ProductHistoryReports.js
import React, { useState } from "react";
import { GoPlus } from "react-icons/go";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
// import ProductHistoryReportList from "./ProductHistoryReportList";
import ProjectApiList from "@/Components/api/ProjectApiList";
import { FaChartPie } from "react-icons/fa";
import { contextVar } from "@/Components/context/contextVar";
import { useContext } from "react";
import TitleBar from "@/Components/Pages/Others/TitleBar";
import InventoryHistoryReports from "./InventoryHistoryReports";
import Report from "@/assets/Images/reports.svg";
import ListTableParent from "@/Components/Common/ListTable2/ListTableParent";

const ProductHistoryReports = () => {
  const [activeTab, setActiveTab] = useState("pre_prec_history");
  let [searchParams, setSearchParams] = useSearchParams();

  const { titleBarVisibility } = useContext(contextVar);

  const navigate = useNavigate();
  const { api_fetchProcurementList, api_fetchProcurementDAList,api_getStockHistoryReport } =
    ProjectApiList();

  const location = useLocation();
  const tabNo = Number(searchParams.get("tabNo"));

  const handleTabClick = (tabNo) => {
    navigate(`/${location.pathname}?tabNo=${tabNo}`);
  };

  const COLUMNS = [
    {
      Header: "#",
      Cell: ({ row }) => <div className="pr-2">{row.index + 1}</div>,
    },
    // {
    //   Header: "Id",
    //   accessor: "id",
    //   Cell: ({ cell }) => (
    //     <div className="pr-2">{cell.row.values.id} </div>
    //   ),
    // },
    {
      Header: "Category",
      accessor: "category",
      Cell: ({ cell }) => (
        <div className="pr-2">{cell.row.values.category.name} </div>
      ),
    },
    {
      Header: "Subcategory",
      accessor: "subcategory",
      Cell: ({ cell }) => (
        <div className="pr-2">{cell.row.values.subcategory.name} </div>
      ),
    },
    {
      Header: "Unit",
      accessor: "unit",
      Cell: ({ cell }) => (
        <div className="pr-2">{cell.row.values.unit.name} </div>
      ),
    },
    {
      Header: "Description",
      accessor: "description",
      Cell: ({ cell }) => (
        <div className="pr-2">{cell.row.values.description} </div>
      ),
    },
    {
      Header: "Quantity",
      accessor: "quantity",
      Cell: ({ cell }) => (
        <div className="pr-2">{cell.row.values.quantity} {cell.row.values.unit.abbreviation} </div>
      ),
    },
    // {
    //   Header: "Action",
    //   accessor: "id",
    //   Cell: ({ cell }) => (
    //     <>
    //       <button className="bg-[#4338CA] text-white px-2 py-1 rounded hover:bg-[#373081]">
    //         View
    //       </button>
    //     </>
    //   ),
    // },
  ];

  const btnDetails = [
    { label: "Pre Procurement History", tab: 1 },
    { label: "Post Procurement History", tab: 2 },
    { label: "Inventory History", tab: 3 },
  ];

  return (
    <>
      <div className="">
        <TitleBar
          titleBarVisibility={titleBarVisibility}
          titleText={"Procurement History Reports"}
        />
      </div>

      <div className="bg-[#4338ca] p-2 rounded-md px-6">
        <h2 className="text-xl font-medium flex items-center gap-3 text-white">
          <img alt="report icon" src={Report} />
          Procurement History Reports
        </h2>
      </div>

      <div className="mt-3">
        <div className="flex">
          <div className="flex mt-6">
            {btnDetails?.map((item, index) => (
              <button
                key={index}
                className={`py-2 px-2 mr-5 ${
                  tabNo === item.tab
                    ? "border-b-2 border-blue-500 text-white bg-[#4338CA]"
                    : "text-gray-500 bg-white "
                } focus:outline-none flex shadow-xl border border-gray-300 rounded`}
                onClick={() => handleTabClick(item.tab)}
              >
                <FaChartPie className="m-1 text-[1rem]" />
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="container mx-auto bg-white rounded border border-blue-500 mt-6 shadow-xl">
        <div className="mt-4">
          {tabNo === 1 && (
            <div className={`${tabNo >= 1 ? "" : "disabled:bg-red-300"}`}>
              <div className="p-7">
                <ListTableParent
                  columns={COLUMNS}
                  api={api_getStockHistoryReport}
                  // table={tableSelector(props?.page)}
                  // requestBody={requestBody} // sending body
                  // changeData={changeData} // send action for new payload
                />
              </div>
            </div>
          )}

          {tabNo === 2 && (
            <div className={`${tabNo >= 2 ? "" : "disabled:bg-red-300"}`}>
              <div className="p-7">
                <ListTableParent
                  columns={COLUMNS}
                  api={api_getStockHistoryReport}
                  // table={tableSelector(props?.page)}
                  // requestBody={requestBody} // sending body
                  // changeData={changeData} // send action for new payload
                />
              </div>
            </div>
          )}

          {tabNo === 3 && (
            <div className={`${tabNo >= 2 ? "" : "disabled:bg-red-300"}`}>
              <InventoryHistoryReports COLUMNS={COLUMNS} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductHistoryReports;
