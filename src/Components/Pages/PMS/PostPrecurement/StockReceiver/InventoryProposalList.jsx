//////////////////////////////////////////////////////////////////////////////////////
//    Author - Almaash alam
//    Version - 1.0
//    Date - 23/05/2024
//    Revision - 1
//    Project - JUIDCO
//    Component  - InventoryProposalList
//    DESCRIPTION - InventoryProposalList
/////////////////////////////////////////////////////////////////////////////

import { useFormik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import moment from "moment";
import BarLoader from "@/Components/Common/Loaders/BarLoader";
import ThemeStyle from "@/Components/Common/ThemeStyle";
import { useNavigate, useParams } from "react-router-dom";
import ListTableParent from "@/Components/Common/ListTable2/ListTableParent";

function InventoryProposalList(props) {
  const navigate = useNavigate();

  console.log(props.page, "page========>");

  // ══════════════════════════════║🔰Usestate🔰║═══════════════════════════════════

  const [changeData, setchangeData] = useState(0);
  const [requestBody, setRequestBody] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [loader, setloader] = useState(false);

  // ══════════════════════════════║🔰Columns🔰║═══════════════════════════════════
  const COLUMNS = [
    {
      Header: "#",
      Cell: ({ row }) => <div className='pr-2'>{row.index + 1}</div>,
    },
    {
      Header: "Procurement No",
      accessor: "procurement_no",
      Cell: ({ cell }) => (
        <div className='pr-2'>{cell.row.values.procurement_no}</div>
      ),
    },
    {
      Header: "Category",
      accessor: "category",
      Cell: ({ cell }) => (
        <div className='pr-2'>{cell.row.values.category.name} </div>
      ),
    },
    {
      Header: "Sub Category",
      accessor: "subcategory",
      Cell: ({ cell }) => (
        <div className='pr-2'>{cell.row.values.subcategory.name} </div>
      ),
    },
    {
      Header: "Brand",
      accessor: "brand",
      Cell: ({ cell }) => (
        <div className='pr-2'>{cell.row.values.brand.name || "N/A"}</div>
      ),
    },

    {
      Header: "status",
      accessor: "status",
      Cell: ({ cell }) => (
        <div className='pr-2'>
          <p className='font-bold text-yellow-800'>
            {cell.row.values.status.status == -1 && "Back to SR"}
          </p>
          <p className='font-bold text-red-500'>
            {cell.row.values.status.status == -2 && "Rejected"}
          </p>
          <p className='font-bold text-blue-800'>
            {cell.row.values.status.status == 0 && "Pending"}
          </p>
          <p className='font-bold text-blue-800'>
            {cell.row.values.status.status == 1 && "DA's Inbox"}
          </p>
          <p className='font-bold text-green-800'>
            {cell.row.values.status.status == 2 && "Release for Tender"}
          </p>
          <p className='font-bold text-green-500'>
            {cell.row.values.status.status == 3 && "Supplier assigned"}
          </p>
          <p className='font-bold text-green-500'>
            {cell.row.values.status.status == 4 && "Incomplete stocks received"}
          </p>
          <p className='font-bold text-green-500'>
            {cell.row.values.status.status == 5 && "Stocks received"}
          </p>
          <p className='font-bold text-green-500'>
            {cell.row.values.status.status == 69 && "Revised"}
          </p>
          <p className='font-bold text-green-500'>
            {cell.row.values.status.status == 71 && "BOQ already created"}
          </p>
          <p className='font-bold text-green-500'>
            {cell.row.values.status.status == 70 && "Ready for BOQ"}
          </p>
          <p className='font-bold text-green-500'>
            {cell.row.values.status.status == -70 && "BOQ returned from DA"}
          </p>
          <p className='font-bold text-green-500'>
            {cell.row.values.status.status == 72 && "Ready for tendering"}
          </p>
          <p className='font-bold text-green-500'>
            {cell.row.values.status.status == -72 && "Tender back from DA"}
          </p>
          <p className='font-bold text-green-500'>
            {cell.row.values.status.status == 73 && "Tender is ready"}
          </p>
        </div>
      ),
    },
    // {
    //   Header: "Remark",
    //   accessor: "remark",
    //   Cell: ({ cell }) => (
    //     <div className='pr-2 text-green-800 truncate'>
    //       {cell.row.values.remark || "N/A"}
    //     </div>
    //   ),
    // },
    {
      Header: "Action",
      accessor: "id",
      Cell: ({ cell }) => (
        <>
          <button
            className='bg-[#4338CA] text-white px-2 py-1 rounded hover:bg-[#373081]'
            onClick={() =>
              navigate(
                `/sr-post-InvtDetailsById/${cell.row.values.id}/${props.page}`
              )
            }
          >
            View
          </button>
        </>
      ),
    },
  ];

  const fetchResouceList = (data) => {
    console.log(data, "payload data for searchin water");
    setRequestBody(data);
    setchangeData((prev) => prev + 1);
  };

  // ══════════════════════════════║🔰Loader🔰║═══════════════════════════════════
  if (isLoading) {
    return (
      <>
        <BarLoader />
        <div className='min-h-screen'></div>
      </>
    );
  }

  const tableSelector = (page) => {
    switch (page) {
      case "inbox":
        return "POSTSRIN";
      case "outbox":
        return "POSTSROUT";
      default:
        return "POSTSRIN";
    }
  };

  return (
    <>
      {loader && <BarLoader />}
      <div className='container mx-auto p-4'>
        <div className='grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 '>
          <div className='col-span-12'>
            <>
              <ListTableParent
                table={tableSelector(props?.page)}
                api={props.api}
                columns={COLUMNS}
                requestBody={requestBody} // sending body
                changeData={changeData} // send action for new payload
                showDiv={true}
              />
            </>
          </div>
        </div>
      </div>
    </>
  );
}

export default InventoryProposalList;
