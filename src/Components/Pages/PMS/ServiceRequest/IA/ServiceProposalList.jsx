//////////////////////////////////////////////////////////////////////////////////////
//    Author - Almaash alam
//    Version - 1.0
//    Date - 23/05/2024
//    Revision - 1
//    Project - JUIDCO
//    Component  - ServiceProposalList
//    DESCRIPTION - ServiceProposalList
/////////////////////////////////////////////////////

import React, { useState } from "react";
import BarLoader from "@/Components/Common/Loaders/BarLoader";
import { useNavigate } from "react-router-dom";
import ListTableParent from "@/Components/Common/ListTable2/ListTableParent";
import { indianAmount } from "@/Components/Common/PowerUps/PowerupFunctions";

function ServiceProposalList(props) {
  const navigate = useNavigate();

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
      Header: "Handover No",
      accessor: "stock_handover_no",
      Cell: ({ cell }) => (
        <div className='pr-2'>{cell.row.values.stock_handover_no}</div>
      ),
    },
    {
      Header: "Service No",
      accessor: "service_no",
      Cell: ({ cell }) => (
        <div className='pr-2'>
          {cell.row.original.service_no}
        </div>
      ),
    },
    {
      Header: "Service",
      accessor: "service",
      Cell: ({ cell }) => (
        <div className='pr-2'>
          {cell.row.original.service}
        </div>
      ),
    },
    {
      Header: "Sub Category",
      accessor: "subcategory",
      Cell: ({ cell }) => (
        <div className='pr-2'>
          {cell.row.original.inventory?.subcategory?.name}
        </div>
      ),
    },

    {
      Header: <p className='text-center'>Status</p>,
      accessor: "status",
      Cell: ({ cell }) => (
        <div className='pr-2'>
          {cell.row.values.status == 11 && (
            <p className='text-status_reject_text text-center bg-status_reject_bg border-status_reject_border border-[1px] px-1 py-1  rounded-md'>
              Returned from Departmental Admin
            </p>
          )}
          {cell.row.values.status == 12 && (
            <p className='text-status_reject_text text-center bg-status_reject_bg border-status_reject_border border-[1px] px-1 py-1  rounded-md'>
              Rejected from Departmental Admin
            </p>
          )}
          {cell.row.values.status == 10 && (
            <p className='text-status_aprv_text text-center bg-status_aprv_bg border-status_aprv_border border-[1px] px-1 py-1  rounded-md'>
              Waiting to be Approved
            </p>
          )}
          {cell.row.values.status == 0 && (
            <p className='text-status_aprv_text text-center bg-status_aprv_bg border-status_aprv_border border-[1px] px-1 py-1  rounded-md'>
              Pending
            </p>
          )}
          {cell.row.values.status == 20 && (
            <p className='text-yellow-400 text-center bg-yellow-50 border-yellow-400 border-[1px] px-1 py-1  rounded-md'>
               Forwarded to Inventory Admin
            </p>
          )}
          {cell.row.values.status == 21 && (
            <p className='text-status_reject_text text-center bg-status_reject_bg border-status_reject_border border-[1px] px-1 py-1  rounded-md'>
              Returned from Inventory Admin
            </p>
          )}
          {cell.row.values.status == 21 && (
            <p className='text-status_reject_text text-center bg-status_reject_bg border-status_reject_border border-[1px] px-1 py-1  rounded-md'>
              Rejected from Inventory Admin
            </p>
          )}
          {cell.row.values.status == 23 && (
            <p className='text-status_aprv_text text-center bg-status_aprv_bg border-status_aprv_border border-[1px] px-1 py-1  rounded-md'>
              Approved
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
            onClick={
              () =>
                navigate(
                  `/ia-service-request-byid/${cell.row.values.service_no}/${props?.page}`
                )
              // navigate(`/create-boq`, {
              //   state: cell.row.values.reference_no,
              // })
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
        return "DAIN";
      case "outbox":
        return "DAOUT";
      default:
        return "DAIN";
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
                api={props?.api}
                columns={COLUMNS}
                requestBody={requestBody} // sending body
                changeData={changeData} // send action for new payload
              />
            </>
          </div>
        </div>
      </div>
    </>
  );
}

export default ServiceProposalList;
