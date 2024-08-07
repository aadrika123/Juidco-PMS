//////////////////////////////////////////////////////////////////////////////////////
//    Author - Almaash Alam
//    Version - 1.0
//    Date - 06/06/2024
//    Revision - 1
//    Project - JUIDCO
//    Component  - TenderListings
//    DESCRIPTION - TenderListings
//////////////////////////////////////////////////////////////////////////////////////

import React, { useState } from "react";
import BarLoader from "@/Components/Common/Loaders/BarLoader";
import { useNavigate } from "react-router-dom";
import ListTableParent from "@/Components/Common/ListTable2/ListTableParent";
import { indianAmount } from "@/Components/Common/PowerupFunctions";

function TenderListings(props) {
  const navigate = useNavigate();

  // ══════════════════════════════║🔰Usestate🔰║═══════════════════════════════════

  const [changeData, setchangeData] = useState(0);
  const [requestBody, setRequestBody] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [loader, setloader] = useState(false);
  const [refNo, setRefNo] = useState(false);

  // ══════════════════════════════║🔰Columns🔰║═══════════════════════════════════
  const COLUMNS = [
    {
      Header: "#",
      Cell: ({ row }) => <div className='pr-2'>{row.index + 1}</div>,
    },
    {
      Header: "Reference No",
      accessor: "reference_no",
      Cell: ({ cell }) => (
        <div className='pr-2'>{cell.row.values.reference_no}</div>
      ),
    },
    {
      Header: "Category",
      accessor: "procurements",
      Cell: ({ cell }) => (
        <div className='pr-2'>
          {cell.row.values?.procurements[0]?.category?.name}{" "}
        </div>
      ),
    },
    {
      Header: "Estimated Cost",
      accessor: "estimated_cost",
      Cell: ({ cell }) => (
        <div className='pr-2'>{cell.row.values.estimated_cost} </div>
      ),
    },

    {
      Header: "Status",
      accessor: "status",
      Cell: ({ cell }) => (
        <div className='pr-2'>
          {cell.row.values.status == -1 && (
            <p className='text-status_reject_text text-center bg-status_reject_bg border-status_reject_border border-[1px] px-1 py-1  rounded-md'>
              Back from DA
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
              DA's Inbox
            </p>
          )}
          {cell.row.values.status == 2 && (
            <p className='text-status_aprv_text text-center bg-status_aprv_bg border-status_aprv_border border-[1px] px-1 py-1  rounded-md'>
              Approved by DA
            </p>
          )}
          {cell.row.values.status == 3 && (
            <p className='text-status_aprv_text text-center bg-status_aprv_bg border-status_aprv_border border-[1px] px-1 py-1  rounded-md'>
              Supplier assigned
            </p>
          )}
          {cell.row.values.status == 4 && (
            <p className='text-status_aprv_text text-center bg-status_aprv_bg border-status_aprv_border border-[1px] px-1 py-1  rounded-md'>
              Incomplete stocks received
            </p>
          )}
          {cell.row.values.status == 5 && (
            <p className='text-status_aprv_text text-center bg-status_aprv_bg border-status_aprv_border border-[1px] px-1 py-1  rounded-md'>
              Stocks received
            </p>
          )}
          {cell.row.values.status == 69 && (
            <p className='text-status_aprv_text text-center bg-status_aprv_bg border-status_aprv_border border-[1px] px-1 py-1  rounded-md'>
              Revised
            </p>
          )}
          {cell.row.values.status.status == 70 && (
            <p className='text-status_aprv_text text-center bg-status_aprv_bg border-status_aprv_border border-[1px] px-1 py-1  rounded-md'>
              Ready for BOQ
            </p>
          )}
          {cell.row.values.status.status == 71 && (
            <p className='text-status_aprv_text text-center bg-status_aprv_bg border-status_aprv_border border-[1px] px-1 py-1  rounded-md'>
              BOQ already created
            </p>
          )}
          {cell.row.values.status.status == -70 && (
            <p className='text-status_aprv_text text-center bg-status_aprv_bg border-status_aprv_border border-[1px] px-1 py-1  rounded-md'>
              BOQ returned from DA
            </p>
          )}
          {cell.row.values.status.status == 72 && (
            <p className='text-status_aprv_text text-center bg-status_aprv_bg border-status_aprv_border border-[1px] px-1 py-1  rounded-md'>
              Ready for tendering
            </p>
          )}
          {cell.row.values.status.status == -72 && (
            <p className='text-status_aprv_text text-center bg-status_aprv_bg border-status_aprv_border border-[1px] px-1 py-1  rounded-md'>
              Tender back from DA
            </p>
          )}
          {cell.row.values.status.status == 73 && (
            <p className='text-status_aprv_text text-center bg-status_aprv_bg border-status_aprv_border border-[1px] px-1 py-1  rounded-md'>
              Tender is ready
            </p>
          )}
          {cell.row.values.status.status == 69 && (
            <p className='text-status_aprv_text text-center bg-status_aprv_bg border-status_aprv_border border-[1px] px-1 py-1  rounded-md'>
              Revised
            </p>
          )}
          {/* <p className="font-bold text-yellow-800">
            {cell.row.values.status == -1 && "Back from DA"}
          </p>
          <p className="font-bold text-red-500">
            {cell.row.values.status == -2 && "Rejected"}
          </p>
          <p className="font-bold text-blue-800">
            {cell.row.values.status == 0 && "Pending"}
          </p>
          <p className="font-bold text-blue-800">
            {cell.row.values.status == 1 && "DA's Inbox"}
          </p>
          <p className="font-bold text-green-800">
            {cell.row.values.status == 2 && "Approved by DA"}
          </p>
          <p className="font-bold text-green-500">
            {cell.row.values.status == 3 && "Supplier Assigned"}
          </p>
          <p className="font-bold text-green-500">
            {cell.row.values.status == 4 && "Incomplete stocks received"}
          </p>
          <p className="font-bold text-green-500">
            {cell.row.values.status == 5 && "Stocks received"}
          </p>
          <p className="font-bold text-green-500">
            {cell.row.values.status.status == 69 && "Revised"}
          </p>
          <p className="font-bold text-green-500">
            {cell.row.values.status.status == 70 && "Ready for BOQ"}
          </p>
          <p className="font-bold text-green-500">
            {cell.row.values.status.status == 71 && "BOQ already created"}
          </p>

          <p className="font-bold text-green-500">
            {cell.row.values.status.status == -70 && "BOQ returned from DA"}
          </p>
          <p className="font-bold text-green-500">
            {cell.row.values.status.status == 72 && "Ready for tendering"}
          </p>
          <p className="font-bold text-green-500">
            {cell.row.values.status.status == -72 && "Tender back from DA"}
          </p>
          <p className="font-bold text-green-500">
            {cell.row.values.status.status == 73 && "Tender is ready"}
          </p>
          <p className="font-bold text-green-500">
            {cell.row.values.status.status == 69 && "Revised"}
          </p> */}
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
                `/boq-details-byId/${cell.row.values.reference_no}/${props?.page}`
              )
            }
          >
            View
          </button>
        </>
      ),
    },
  ];

  const COLUMNS2 = [
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
        <div className='pr-2'>{cell.row.values?.category?.name} </div>
      ),
    },
    // {
    //   Header: "Sub Category",
    //   accessor: "subcategory",
    //   Cell: ({ cell }) => (
    //     <div className="pr-2">{cell.row.values?.subcategory?.name} </div>
    //   ),
    // },
    {
      Header: "Total Rate",
      accessor: "total_rate",
      Cell: ({ cell }) => (
        <div className='pr-2'>{indianAmount(cell.row.values.total_rate)} </div>
      ),
    },

    {
      Header: <p className='text-center'>Status</p>,
      accessor: "status",
      Cell: ({ cell }) => (
        <div className='pr-2'>
          {cell.row.values?.status == 0 && (
            <p className='text-status_aprv_text text-center bg-status_aprv_bg border-status_aprv_border border-[1px] px-1 py-1  rounded-md'>
              Pending
            </p>
          )}
          {cell.row.values?.status == 10 && (
            <p className='text-status_aprv_text text-center bg-status_aprv_bg border-status_aprv_border border-[1px] px-1 py-1  rounded-md'>
              Level 1
            </p>
          )}
          {cell.row.values?.status == 11 && (
            <p className='text-status_reject_text text-center bg-status_reject_bg border-status_reject_border border-[1px] px-1 py-1  rounded-md'>
              Returned from Level 1
            </p>
          )}
          {cell.row.values?.status == 12 && (
            <p className='text-status_reject_text text-center bg-status_reject_bg border-status_reject_border border-[1px] px-1 py-1  rounded-md'>
              Rejected by Level 1
            </p>
          )}
          {cell.row.values?.status == 13 && (
            <p className='text-status_aprv_text text-center bg-status_aprv_bg border-status_aprv_border border-[1px] px-1 py-1  rounded-md'>
              Revised by IA
            </p>
          )}
          {cell.row.values?.status == 14 && (
            <p className='text-status_aprv_text text-center bg-status_aprv_bg border-status_aprv_border border-[1px] px-1 py-1  rounded-md'>
              Approved by Level 1
            </p>
          )}
          {cell.row.values?.status == 20 && (
            <p className='text-status_aprv_text text-center bg-status_aprv_bg border-status_aprv_border border-[1px] px-1 py-1  rounded-md'>
              Level 2 inbox
            </p>
          )}
          {cell.row.values?.status == 21 && (
            <p className='text-status_reject_text text-center bg-status_reject_bg border-status_reject_border border-[1px] px-1 py-1  rounded-md'>
              Return from Level 2
            </p>
          )}
          {cell.row.values?.status == 22 && (
            <p className='text-status_reject_text text-center bg-status_reject_bg border-status_reject_border border-[1px] px-1 py-1  rounded-md'>
              Rejected by Level 2
            </p>
          )}
          {cell.row.values?.status == 23 && (
            <p className='text-status_aprv_text text-center bg-status_aprv_bg border-status_aprv_border border-[1px] px-1 py-1  rounded-md'>
              Revised by Level 1
            </p>
          )}
          {cell.row.values?.status == 24 && (
            <p className='text-status_aprv_text text-center bg-status_aprv_bg border-status_aprv_border border-[1px] px-1 py-1  rounded-md'>
              Approved by Level 2
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
              // navigate(`/viewProcurement/${cell.row.values.procurement_no}`)
              navigate(
                `/ia-viewPreProcurementById/${cell.row.values.procurement_no}/${props?.activeTab}`
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
                columns={COLUMNS2}
                requestBody={requestBody}
                changeData={changeData}
                showDiv={true}
                categoryId={props.categoryId}
                subcategoryId={props.subcategoryId}
                // refNo={refNo}
                setRefNo={setRefNo}
              />
            </>
          </div>
        </div>
      </div>
    </>
  );
}

export default TenderListings;
