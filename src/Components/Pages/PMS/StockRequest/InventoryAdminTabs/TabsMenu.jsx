//////////////////////////////////////////////////////////////////////////////////////
//    Author - Almaash alam
//    Version - 1.0
//    Date - 22/07/2024
//    Revision - 1
//    Project - JUIDCO
//    Component  - TabsMenu
//    DESCRIPTION - TabsMenu
//////////////////////////////////////////////////////////////////////////////////////

import React, { useState } from "react";
import ProjectApiList from "@/Components/api/ProjectApiList";
import ListTableParent from "@/Components/Common/ListTable2/ListTableParent";
import { useNavigate } from "react-router-dom";

const TabsMenu = (props) => {
  const [activeTab, setActiveTab] = useState("inbox");

  const navigate = useNavigate();

  // console.log(activeTab)

  const {
    api_fetchProcurementList,
    api_fetchProcurementDAList,
    api_iaStockReqInbox,
    api_iaStockReqOubox,
  } = ProjectApiList();

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
      Header: "Category",
      accessor: "category",
      Cell: ({ cell }) => (
        <div className='pr-2'>
          {cell.row.original.inventory?.category?.name}{" "}
        </div>
      ),
    },
    {
      Header: "Sub Category",
      accessor: "subcategory",
      Cell: ({ cell }) => (
        <div className='pr-2'>
          {cell.row.original.inventory?.subcategory?.name}{" "}
        </div>
      ),
    },
    {
      Header: "Employee Id",
      accessor: "emp_id",
      Cell: ({ cell }) => <div className='pr-2'>{cell.row.values.emp_id} </div>,
    },
    {
      Header: "Employee Name",
      accessor: "emp_name",
      Cell: ({ cell }) => (
        <div className='pr-2'>{cell.row.values.emp_name} </div>
      ),
    },
    {
      Header: "Requested Quantity",
      accessor: "allotted_quantity",
      Cell: ({ cell }) => (
        <div className='pr-2'>{cell.row.values.allotted_quantity} </div>
      ),
    },

    // {
    //   Header: "status",
    //   accessor: "status",
    //   Cell: ({ cell }) => (
    //     <div className='pr-2'>
    //       <p className='font-bold text-yellow-800'>
    //         {cell.row.values.status.status == -1 && "Back to SR"}
    //       </p>
    //       <p className='font-bold text-red-500'>
    //         {cell.row.values.status.status == -2 && "Rejected"}
    //       </p>

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
                `/iaViewStockRequestById/${cell.row.values.stock_handover_no}/${activeTab}`
              )
            }
          >
            View
          </button>
        </>
      ),
    },
  ];

  return (
    <>
      <div className=''>
        <div className='flex ml-5'>
          <button
            className={`py-2 px-4 ${
              activeTab === "inbox"
                ? "border-b-2 border-[#4338ca] text-[#4338CA]"
                : "text-gray-500"
            } focus:outline-none flex`}
            onClick={() => setActiveTab("inbox")}
          >
            Inbox
          </button>

          <button
            className={`ml-4 py-2 px-4 ${
              activeTab === "outbox"
                ? "border-b-2 border-[#4338ca] text-[#4338CA]"
                : "text-gray-500"
            } focus:outline-none flex`}
            onClick={() => setActiveTab("outbox")}
          >
            Outbox
          </button>
        </div>
      </div>

      <hr className='w-[74rem] mt-2' />

      <div className='mt-4'>
        {activeTab === "inbox" && props?.page === "stockReq" && (
          <div className='p-5'>
            <ListTableParent
              columns={COLUMNS}
              api={api_iaStockReqInbox}
              // table={tableSelector(props?.page)}
              // requestBody={requestBody} // sending body
              // changeData={changeData} // send action for new payload
            />
          </div>
        )}

        {activeTab === "inbox" && props?.page === "procurement" && (
          <div className='p-5'>
            <ListTableParent
              columns={COLUMNS}
              api={api_fetchProcurementList}
              // table={tableSelector(props?.page)}
              // requestBody={requestBody} // sending body
              // changeData={changeData} // send action for new payload
            />
          </div>
        )}

        {activeTab === "outbox" && props?.page === "stockReq" && (
          <div className='p-5'>
            <ListTableParent
              columns={COLUMNS}
              api={api_iaStockReqOubox}
              // table={tableSelector(props?.page)}
              // requestBody={requestBody} // sending body
              // changeData={changeData} // send action for new payload
            />
          </div>
        )}

        {activeTab === "outbox" && props?.page === "procurement" && (
          <div className='p-5'>
            <ListTableParent
              columns={COLUMNS}
              api={api_fetchProcurementDAList}
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

export default TabsMenu;
