//////////////////////////////////////////////////////////////////////////////////////
//    Author - Almaash alam
//    Version - 1.0
//    Date - 23/05/2024
//    Revision - 1
//    Project - JUIDCO
//    Component  - InventoryProposalList
//    DESCRIPTION - InventoryProposalList
/////////////////////////////////////////////////////

import React, { useState } from "react";
import BarLoader from "@/Components/Common/Loaders/BarLoader";
import { useNavigate } from "react-router-dom";
import ListTableParent from "@/Components/Common/ListTable2/ListTableParent";
import { indianAmount } from "@/Components/Common/PowerUps/PowerupFunctions";

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
      Header: "#",
      Cell: ({ row }) => <div className='pr-2'>{row.index + 1}</div>,
    },
    {
      Header: "Tender Reference No",
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
          {cell.row.values.procurements[0]?.category?.name}
        </div>
      ),
    },
    {
      Header: "Estimated cost",
      accessor: "estimated_cost",
      Cell: ({ cell }) => (
        <div className='pr-2'>
          {indianAmount(cell.row.values.estimated_cost)}{" "}
        </div>
      ),
    },
    {
      Header: "status",
      accessor: "status",
      Cell: ({ cell }) => (
        <div className='pr-2'>
          <p className='font-bold text-yellow-800'>
            {cell.row.values.status == -1 && "Back to SR"}
          </p>
          <p className='font-bold text-red-500'>
            {cell.row.values.status == -2 && "Rejected"}
          </p>
          <p className='font-bold text-blue-800'>
            {cell.row.values.status == 0 && "Pending"}
          </p>
          <p className='font-bold text-blue-800'>
            {cell.row.values.status == 1 && "DA's Inbox"}
          </p>
          <p className='font-bold text-green-800'>
            {cell.row.values.status == 2 && "Release for Tender"}
          </p>
          <p className='font-bold text-green-500'>
            {cell.row.values.status == 3 && "Supplier assigned"}
          </p>
          <p className='font-bold text-green-500'>
            {cell.row.values.status == 4 && "Incomplete stocks received"}
          </p>
          <p className='font-bold text-green-500'>
            {cell.row.values.status == 5 && "Stocks received"}
          </p>
          <p className='font-bold text-green-500'>
            {cell.row.values.status == 69 && "Revised"}
          </p>
          <p className='font-bold text-green-500'>
            {cell.row.values.status == 71 && "BOQ already created"}
          </p>
          <p className='font-bold text-green-500'>
            {cell.row.values.status == 70 && "Ready for BOQ"}
          </p>
          <p className='font-bold text-green-500'>
            {cell.row.values.status == -70 && "BOQ returned from DA"}
          </p>
          <p className='font-bold text-green-500'>
            {cell.row.values.status == 72 && "Ready for tendering"}
          </p>
          <p className='font-bold text-green-500'>
            {cell.row.values.status == -72 && "Tender back from DA"}
          </p>
          <p className='font-bold text-green-500'>
            {cell.row.values.status == 73 && "Tender is ready"}
          </p>
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
              navigate(`/create-boq`, {
                state: cell.row.values.reference_no,
              })
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

export default InventoryProposalList;
