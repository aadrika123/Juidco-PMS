//////////////////////////////////////////////////////////////////////////////////////
//    Author - Almaash Alam
//    Version - 1.0
//    Date - 25/05/2024
//    Revision - 1
//    Project - JUIDCO
//    Component  - InventoryProposalList
//    DESCRIPTION - InventoryProposalList
//////////////////////////////////////////////////////////////////////////////////////

import React, { useState } from "react";
import BarLoader from "@/Components/Common/Loaders/BarLoader";
import { useNavigate } from "react-router-dom";
import ListTableParent from "@/Components/Common/ListTable2/ListTableParent";

function InventoryProposalList(props) {
  const navigate = useNavigate();

  // ══════════════════════════════║🔰Usestate🔰║═══════════════════════════════════

  const [changeData, setchangeData] = useState(0);
  const [requestBody, setRequestBody] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [loader, setloader] = useState(false);

  // ══════════════════════════════║🔰Columns🔰║═══════════════════════════════════
  const COLUMNS = [
    {
      Header: "Handover No",
      accessor: "stock_handover_no",
      Cell: ({ cell }) => (
        <div className='pr-2'>{cell.row.values.stock_handover_no}</div>
      ),
    },
    {
      Header: "Employee Id",
      accessor: "emp_id",
      Cell: ({ cell }) => <div className='pr-2'>{cell.row.values.emp_id}</div>,
    },
    {
      Header: "Employee Name",
      accessor: "emp_name",
      Cell: ({ cell }) => (
        <div className='pr-2'>{cell.row.values.emp_name}</div>
      ),
    },
    {
      Header: "Category",
      accessor: "inventory?.category?.name",
      Cell: ({ cell }) => (
        <div className='pr-2'>
          {cell.row.original.inventory?.category?.name}{" "}
        </div>
      ),
    },
    {
      Header: "Sub Category",
      accessor: "inventory?.subcategory?.name",
      Cell: ({ cell }) => (
        <div className='pr-2'>
          {cell.row.original.inventory?.subcategory?.name}{" "}
        </div>
      ),
    },

    {
      Header: "Requested Quantity",
      accessor: "allotted_quantity",
      Cell: ({ cell }) => (
        <div className='pr-2 text-center'>
          {cell.row.values.allotted_quantity}
        </div>
      ),
    },
    {
      Header: <p className='text-center'>Status</p>,
      accessor: "status",
      Cell: ({ cell }) => (
        <div className=' w-[12rem]'>
          {cell.row.values.status == -1 && (
            <p className='text-status_reject_text text-center bg-status_reject_bg border-status_reject_border border-[1px] px-1 py-1  rounded-md'>
              Back to DA
            </p>
          )}
          {cell.row.values.status == -2 && (
            <p className='text-status_reject_text text-center bg-status_reject_bg border-status_reject_border border-[1px] px-1 py-1  rounded-md'>
              Rejected
            </p>
          )}
          {cell.row.values.status == 0 && (
            <p className='text-status_aprv_text text-center bg-status_aprv_bg border-status_aprv_border border-[1px] px-1 py-1  rounded-md'>
              Pending
            </p>
          )}
          {cell.row.values.status == 1 && (
            <p className='text-status_aprv_text text-center bg-status_aprv_bg border-status_aprv_border border-[1px] px-1 py-1  rounded-md'>
              Revised from DA
            </p>
          )}
          {cell.row.values.status == 2 && (
            <p className='text-status_aprv_text text-center bg-status_aprv_bg border-status_aprv_border border-[1px] px-1 py-1  rounded-md'>
              DA's inbox
            </p>
          )}
          {cell.row.values.status == 80 && (
            <p className='text-status_aprv_text text-center bg-status_aprv_bg border-status_aprv_border border-[1px] px-1 py-1  rounded-md'>
              Inventory Admin Inbox
            </p>
          )}
          {cell.row.values.status == 81 && (
            <p className='text-status_aprv_text text-center bg-status_aprv_bg border-status_aprv_border border-[1px] px-1 py-1  rounded-md'>
              Returned from Inventory Admin
            </p>
          )}
          {cell.row.values.status == 82 && (
            <p className='text-status_aprv_text text-center bg-status_aprv_bg border-status_aprv_border border-[1px] px-1 py-1  rounded-md'>
              Inventory Admin Rejected
            </p>
          )}
          {cell.row.values.status == 3 && (
            <p className='text-status_aprv_text text-center bg-status_aprv_bg border-status_aprv_border border-[1px] px-1 py-1  rounded-md'>
              Approved
            </p>
          )}
          {cell.row.values.status == 4 && (
            <p className='text-status_aprv_text text-center bg-status_aprv_bg border-status_aprv_border border-[1px] px-1 py-1  rounded-md'>
              Handover Pending
            </p>
          )}
          {cell.row.values.status == 41 && (
            <p className='text-status_aprv_text text-center bg-status_aprv_bg border-status_aprv_border border-[1px] px-1 py-1  rounded-md'>
              Alloted
            </p>
          )}
          {cell.row.values.status == 5 && (
            <p className='text-status_aprv_text text-center bg-status_aprv_bg border-status_aprv_border border-[1px] px-1 py-1  rounded-md'>
              Return Pending
            </p>
          )}
          {cell.row.values.status == 51 && (
            <p className='text-status_aprv_text text-center bg-status_aprv_bg border-status_aprv_border border-[1px] px-1 py-1  rounded-md'>
              Returned to Inventory
            </p>
          )}
          {cell.row.values.status.status == 52 && (
            <p className='text-status_aprv_text text-center bg-status_aprv_bg border-status_aprv_border border-[1px] px-1 py-1  rounded-md'>
              Returned to DA
            </p>
          )}
          {/* {cell.row.values.status.status == -5 && (
            <p className='text-status_aprv_text text-center bg-status_aprv_bg border-status_aprv_border border-[1px] px-1 py-1  rounded-md'>
              Rejected
            </p>
          )} */}
        </div>
      ),
    },
    // {
    //   Header: "Remark",
    //   accessor: "remark",
    //   Cell: ({ cell }) => (
    //     <div className='pr-2 text-green-800 truncate'>
    //       {cell.row.values.remark || ""}
    //     </div>
    //   ),
    // },
    {
      Header: "Action",
      accessor: "id",
      Cell: ({ cell }) => (
        <>
          <button
            className='bg-[#4338CA] text-white px-5 py-1 rounded hover:bg-[#373081]'
            onClick={() =>
              navigate(
                `/iaViewStockRequestById/${cell.row.values.stock_handover_no}/${props.page}`
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
        return "SRIN";
      case "outbox":
        return "SROUT";
      default:
        return "SRIN";
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
