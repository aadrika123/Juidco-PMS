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
      Header: "Reference No",
      accessor: "reference_no",
      Cell: ({ cell }) => (
        <div className='pr-2'>{cell.row.values.reference_no}</div>
      ),
    },
    {
      Header: "Category",
      accessor: "boq.procurement.category.name",
      Cell: ({ cell }) => (
        <div className='pr-2'>
          {cell.row.original?.boq?.procurement?.category?.name}{" "}
        </div>
      ),
    },
    {
      Header: "Estimated Cost",
      accessor: "boq.estimated_cost",
      Cell: ({ cell }) => (
        <div className='pr-2'>
          {indianAmount(cell.row.original.boq?.estimated_cost)}
        </div>
      ),
    },
    {
      Header: "Tender Type",
      accessor: "boq.pre_tendering_details.tendering_type",
      Cell: ({ cell }) => (
        <div className='pr-2'>
          {cell.row.original.boq?.pre_tendering_details?.tendering_type ===
          "least_cost"
            ? "Least Cost"
            : cell.row.original.boq?.pre_tendering_details?.tendering_type ===
              "qcbs"
            ? "QCBS"
            : "Rate Contract"}{" "}
        </div>
      ),
    },
    {
      Header: <p className='text-center'>Status</p>,
      accessor: "status",
      Cell: ({ cell }) => (
        <div className='pr-2'>
          {cell.row.original.boq?.bid_details?.creationStatus == 0 && (
            <p className='text-status_aprv_text text-center bg-status_aprv_bg border-status_aprv_border border-[1px] px-1 py-1  rounded-md'>
              Proceed for Bidding
            </p>
          )}
          {cell.row.original.boq?.bid_details == null && (
            <p className='text-status_aprv_text text-center bg-status_aprv_bg border-status_aprv_border border-[1px] px-1 py-1  rounded-md'>
              Proceed for Bidding
            </p>
          )}
          {cell.row.original.boq?.bid_details?.creationStatus == 1 && (
            <p className='text-status_aprv_text text-center bg-status_aprv_bg border-status_aprv_border border-[1px] px-1 py-1  rounded-md'>
              Bidding Type Selected
            </p>
          )}
          {cell.row.original.boq?.bid_details?.creationStatus == 2 && (
            <p className='text-status_aprv_text text-center bg-status_aprv_bg border-status_aprv_border border-[1px] px-1 py-1  rounded-md'>
              Criteria and Description added
            </p>
          )}
          {cell.row.original.boq?.bid_details?.creationStatus == 3 && (
            <p className='text-status_aprv_text text-center bg-status_aprv_bg border-status_aprv_border border-[1px] px-1 py-1  rounded-md'>
              Bidders Details Added
            </p>
          )}
          {cell.row.original.boq?.bid_details?.creationStatus == 5 && (
            <p className='text-status_aprv_text text-center bg-status_aprv_bg border-status_aprv_border border-[1px] px-1 py-1  rounded-md'>
              Unit Prices Added
            </p>
          )}
          {cell.row.original.boq?.bid_details?.creationStatus == 41 && (
            <p className='text-status_aprv_text text-center bg-status_aprv_bg border-status_aprv_border border-[1px] px-1 py-1  rounded-md'>
              Technical Winner Selected
            </p>
          )}
          {cell.row.original.boq?.bid_details?.creationStatus == 42 && (
            <p className='text-status_aprv_text text-center bg-status_aprv_bg border-status_aprv_border border-[1px] px-1 py-1  rounded-md'>
              Financial Winner Selected
            </p>
          )}
          {cell.row.original.boq?.bid_details?.creationStatus == 4 && (
            <p className='text-status_aprv_text text-center bg-status_aprv_bg border-status_aprv_border border-[1px] px-1 py-1  rounded-md'>
              Bidding Completed
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
                `/biddingViewById/${cell.row.values.reference_no}/${props.page}`
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
