//////////////////////////////////////////////////////////////////////////////////////
//    Author - Almaash alam
//    Version - 1.0
//    Date - 23/05/2024
//    Revision - 1
//    Project - JUIDCO
//    Component  - PostPrecurementListTabsDa
//    DESCRIPTION - PostPrecurementListTabsDa
/////////////////////////////////////////////////////////////////////////////

import React, { useState } from "react";
import BarLoader from "@/Components/Common/Loaders/BarLoader";
import { useNavigate, useParams } from "react-router-dom";
import ListTableParent from "@/Components/Common/ListTable2/ListTableParent";
import { indianAmount, nullToNA } from "@/Components/Common/PowerupFunctions";

function PostPrecurementList(props) {
  const navigate = useNavigate();

  // ══════════════════════════════║🔰Usestate🔰║═══════════════════════════════════
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
        <div className='pr-2'>{nullToNA(cell.row.values.category?.name)} </div>
      ),
    },
    {
      Header: "Total Rate",
      accessor: "total_rate",
      Cell: ({ cell }) => (
        <div className='pr-2'>{indianAmount(cell.row.values.total_rate)} </div>
      ),
    },
    {
      Header: "Remark",
      accessor: "remark",
      Cell: ({ cell }) => (
        <div className='pr-2'>{nullToNA(cell.row.values.remark)} </div>
      ),
    },
    {
      Header: <p className='text-center'>Status</p>,
      accessor: "status",
      Cell: ({ cell }) => (
        <div className='pr-2'>
          {cell.row.values.status == -2 && (
            <p className='text-status_reject_text text-center bg-status_reject_bg border-status_reject_border border-[1px] px-1 py-1  rounded-md'>
              Rejected
            </p>
          )}
          {cell.row.values.status == 1 && (
            <p className='text-status_aprv_text text-center bg-status_aprv_bg border-status_aprv_border border-[1px] px-1 py-1  rounded-md'>
              Pending
            </p>
          )}
          {cell.row.values.status == 10 && (
            <p className='text-status_aprv_text text-center bg-status_aprv_bg border-status_aprv_border border-[1px] px-1 py-1  rounded-md'>
              Level 1
            </p>
          )}
          {cell.row.values.status == 11 && (
            <p className='text-status_reject_text text-center bg-status_reject_bg border-status_reject_border border-[1px] px-1 py-1  rounded-md'>
              Level 1 Returned
            </p>
          )}
          {cell.row.values.status == 12 && (
            <p className='text-status_reject_text text-center bg-status_reject_bg border-status_reject_border border-[1px] px-1 py-1  rounded-md'>
              Level 1 Rejected
            </p>
          )}
          {cell.row.values.status == 13 && (
            <p className='text-status_aprv_text text-center bg-status_aprv_bg border-status_aprv_border border-[1px] px-1 py-1  rounded-md'>
              Level 1 Revised
            </p>
          )}
          {cell.row.values.status == 14 && (
            <p className='text-status_aprv_text text-center bg-status_aprv_bg border-status_aprv_border border-[1px] px-1 py-1  rounded-md'>
              Add to Inventory Pending
            </p>
          )}
          {cell.row.values.status == 20 && (
            <p className='text-status_aprv_text text-center bg-status_aprv_bg border-status_aprv_border border-[1px] px-1 py-1  rounded-md'>
              Level 2
            </p>
          )}
          {cell.row.values.status == 21 && (
            <p className='text-status_reject_text text-center bg-status_reject_bg border-status_reject_border border-[1px] px-1 py-1  rounded-md'>
              Level 2 Returned
            </p>
          )}
          {cell.row.values.status == 22 && (
            <p className='text-status_reject_text text-center bg-status_reject_bg border-status_reject_border border-[1px] px-1 py-1  rounded-md'>
              Level 2 Rejected
            </p>
          )}
          {cell.row.values.status == 23 && (
            <p className='text-status_aprv_text text-center bg-status_aprv_bg border-status_aprv_border border-[1px] px-1 py-1  rounded-md'>
              Level 2 Revised
            </p>
          )}
          {cell.row.values.status == 24 && (
            <p className='text-status_aprv_text text-center bg-status_aprv_bg border-status_aprv_border border-[1px] px-1 py-1  rounded-md'>
              Pending Inventory Addition
            </p>
          )}
          {cell.row.values.status == 3 && (
            <p className='text-status_aprv_text text-center bg-status_aprv_bg border-status_aprv_border border-[1px] px-1 py-1  rounded-md'>
              Added Received Inventory
            </p>
          )}
          {cell.row.values.status == 4 && (
            <p className='text-status_aprv_text text-center bg-status_aprv_bg border-status_aprv_border border-[1px] px-1 py-1  rounded-md'>
              Stock Partially Recieved
            </p>
          )}
          {cell.row.values.status == 5 && (
            <p className='text-status_aprv_text text-center bg-status_aprv_bg border-status_aprv_border border-[1px] px-1 py-1  rounded-md'>
              Stock Recieved
            </p>
          )}
          {cell.row.values.status == 6 && (
            <p className='text-status_aprv_text text-center bg-status_aprv_bg border-status_aprv_border border-[1px] px-1 py-1  rounded-md'>
              Partially Added
            </p>
          )}
          {cell.row.values.status == 7 && (
            <p className='text-status_aprv_text text-center bg-status_aprv_bg border-status_aprv_border border-[1px] px-1 py-1  rounded-md'>
              Added
            </p>
          )}
        </div>
      ),
    },
    {
      Header: "Action",
      accessor: "id",
      Cell: ({ cell }) => (
        <>
          <button
            className='bg-[#4338CA] text-white px-2 py-1 rounded hover:bg-[#373081]'
            onClick={() =>
              navigate(
                `/ia-post-precurementbyid/${cell.row.values.procurement_no}/${props.page}`
              )
            }
          >
            View
          </button>
        </>
      ),
    },
  ];

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
        return "POSTDAIN";
      case "outbox":
        return "POSTDAOUT";
      default:
        return "POSTDAIN";
    }
  };

  return (
    <>
      {loader && <BarLoader />}
      <div className='container mx-auto p-4'>
        <div className=''>
          <div className='flex justify-between'></div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 '>
          <div className='col-span-12'>
            <>
              <ListTableParent
                table={tableSelector(props?.page)}
                api={props.api}
                columns={COLUMNS}
                requestBody={requestBody} // sending body
              />
            </>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostPrecurementList;
