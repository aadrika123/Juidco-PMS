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
      Cell: ({ row }) => <div className="pr-2">{row.index + 1}</div>,
    },
    {
      Header: "Procurement No",
      accessor: "procurement_no",
      Cell: ({ cell }) => (
        <div className="pr-2">{cell.row.values.procurement_no}</div>
      ),
    },
    // {
    //   Header: "Category",
    //   accessor: "category",
    //   Cell: ({ cell }) => (
    //     <div className="pr-2">{cell.row.values.category.name} </div>
    //   ),
    // },
    // {
    //   Header: "Sub Category",
    //   accessor: "subcategory",
    //   Cell: ({ cell }) => (
    //     <div className="pr-2">{cell.row.values.subcategory.name} </div>
    //   ),
    // },
    // {
    //   Header: "Brand",
    //   accessor: "brand",
    //   Cell: (
    //     { cell } // console.log(cell.row.values,"===================celllllll")
    //   ) => <div className="pr-2">{cell.row.values.brand.name || "N/A"}</div>,
    // },

    // {
    //   Header: "status",
    //   accessor: "status",
    //   Cell: ({ cell }) => (
    //     <div className="pr-2">
    //       {cell.row.values.status.status == -1 && (
    //         <p className="text-status_reject_text text-center bg-status_reject_bg border-status_reject_border border-[1px] px-1 py-1  rounded-md">
    //           Back to SR
    //         </p>
    //       )}
    //       {cell.row.values.status.status == -2 && (
    //         <p className="text-status_reject_text text-center bg-status_reject_bg border-status_reject_border border-[1px] px-1 py-1  rounded-md">
    //           Rejected
    //         </p>
    //       )}
    //       {cell.row.values.status.status == 0 && (
    //         <p className="text-status_aprv_text text-center bg-status_aprv_bg border-status_aprv_border border-[1px] px-1 py-1  rounded-md">
    //           Pending
    //         </p>
    //       )}
    //       {cell.row.values.status.status == 1 && (
    //         <p className="text-status_aprv_text text-center bg-status_aprv_bg border-status_aprv_border border-[1px] px-1 py-1  rounded-md">
    //           DA's Inbox
    //         </p>
    //       )}
    //       {cell.row.values.status.status == 2 && (
    //         <p className="text-status_aprv_text text-center bg-status_aprv_bg border-status_aprv_border border-[1px] px-1 py-1  rounded-md">
    //           Release for Tender
    //         </p>
    //       )}
    //       {cell.row.values.status.status == 3 && (
    //         <p className="text-status_aprv_text text-center bg-status_aprv_bg border-status_aprv_border border-[1px] px-1 py-1  rounded-md">
    //           Supplier assigned
    //         </p>
    //       )}
    //       {cell.row.values.status.status == 4 && (
    //         <p className="text-status_aprv_text text-center bg-status_aprv_bg border-status_aprv_border border-[1px] px-1 py-1  rounded-md">
    //           Incomplete stocks received
    //         </p>
    //       )}
    //       {cell.row.values.status.status == 5 && (
    //         <p className="text-status_aprv_text text-center bg-status_aprv_bg border-status_aprv_border border-[1px] px-1 py-1  rounded-md">
    //           Stocks received
    //         </p>
    //       )}
    //       {cell.row.values.status.status == 69 && (
    //         <p className="text-status_aprv_text text-center bg-status_aprv_bg border-status_aprv_border border-[1px] px-1 py-1  rounded-md">
    //           Revised
    //         </p>
    //       )}
    //       {cell.row.values.status.status == 71 && (
    //         <p className="text-status_aprv_text text-center bg-status_aprv_bg border-status_aprv_border border-[1px] px-1 py-1  rounded-md">
    //           BOQ already created
    //         </p>
    //       )}
    //       {cell.row.values.status.status == 70 && (
    //         <p className="text-status_aprv_text text-center bg-status_aprv_bg border-status_aprv_border border-[1px] px-1 py-1  rounded-md">
    //           Ready for BOQ
    //         </p>
    //       )}
    //       {cell.row.values.status.status == -70 && (
    //         <p className="text-status_aprv_text text-center bg-status_aprv_bg border-status_aprv_border border-[1px] px-1 py-1  rounded-md">
    //           BOQ returned from DA
    //         </p>
    //       )}
    //       {cell.row.values.status.status == 72 && (
    //         <p className="text-status_aprv_text text-center bg-status_aprv_bg border-status_aprv_border border-[1px] px-1 py-1  rounded-md">
    //           Ready for tendering
    //         </p>
    //       )}
    //       {cell.row.values.status.status == -72 && (
    //         <p className="text-status_aprv_text text-center bg-status_aprv_bg border-status_aprv_border border-[1px] px-1 py-1  rounded-md">
    //           Tender back from DA
    //         </p>
    //       )}
    //       {cell.row.values.status.status == 73 && (
    //         <p className="text-status_aprv_text text-center bg-status_aprv_bg border-status_aprv_border border-[1px] px-1 py-1  rounded-md">
    //           Tender is ready
    //         </p>
    //       )}
    //     </div>
    //   ),
    // },

    // {
    //   Header: "Remark",
    //   accessor: "remark",
    //   Cell: ({ cell }) => (
    //     <div className='pr-2 text-green-800 truncate w-14'>
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
            className="bg-[#4338CA] text-white px-2 py-1 rounded hover:bg-[#373081]"
            onClick={() =>
              navigate(
                `/bidding-supplierbyid/${cell.row.values.id}/${props.page}`
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
