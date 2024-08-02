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
import { indianAmount } from "@/Components/Common/PowerupFunctions";

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

    {
      Header: <p className='text-center'>Status</p>,
      accessor: "status",
      Cell: ({ cell }) => (
        <div className='pr-2 w-[12rem]'>
          {cell.row.values.status == -1 && (
            <p className='text-status_reject_text text-center bg-status_reject_bg border-status_reject_border border-[1px] px-1 py-1  rounded-md'>
              Returned
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
              Forwarded to DA
            </p>
          )}
          {cell.row.values.status == 80 && (
            <p className='text-status_aprv_text text-center bg-status_aprv_bg border-status_aprv_border border-[1px] px-1 py-1  rounded-md'>
              Forwarded to IA
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
          {cell.row.values.status == 52 && (
            <p className='text-status_aprv_text text-center bg-status_aprv_bg border-status_aprv_border border-[1px] px-1 py-1  rounded-md'>
              Returned to DD
            </p>
          )}
          {cell.row.values.status == -5 && (
            <p className='text-status_aprv_text text-center bg-status_aprv_bg border-status_aprv_border border-[1px] px-1 py-1  rounded-md'>
              Rejected
            </p>
          )}
          {cell.row.values.status == 6 && (
            <p className='text-status_aprv_text text-center bg-status_aprv_bg border-status_aprv_border border-[1px] px-1 py-1  rounded-md'>
              Dead stock pending
            </p>
          )}
          {cell.row.values.status == 61 && (
            <p className='text-status_aprv_text text-center bg-status_aprv_bg border-status_aprv_border border-[1px] px-1 py-1  rounded-md'>
              Added to dead stock
            </p>
          )}
          {cell.row.values.status == 62 && (
            <p className='text-status_aprv_text text-center bg-status_aprv_bg border-status_aprv_border border-[1px] px-1 py-1  rounded-md'>
              Returned to DD
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

  const P_COLUMNS = [
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
        <div className='pr-2'>{cell.row.original?.category?.name} </div>
      ),
    },
    {
      Header: "Total Rate",
      accessor: "total_rate",
      Cell: ({ cell }) => (
        <div className='pr-2'>
          {indianAmount(cell.row.original.total_rate)}{" "}
        </div>
      ),
    },
    {
      Header: <p className='text-center'>status</p>,
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
              Level 1 Returned
            </p>
          )}
          {cell.row.values?.status == 12 && (
            <p className='text-status_reject_text text-center bg-status_reject_bg border-status_reject_border border-[1px] px-1 py-1  rounded-md'>
              Level 1 Rejected
            </p>
          )}
          {cell.row.values?.status == 13 && (
            <p className='text-status_aprv_text text-center bg-status_aprv_bg border-status_aprv_border border-[1px] px-1 py-1  rounded-md'>
              Level 1 Revised
            </p>
          )}
          {cell.row.values?.status == 14 && (
            <p className='text-status_aprv_text text-center bg-status_aprv_bg border-status_aprv_border border-[1px] px-1 py-1  rounded-md'>
              Level 1 Approved
            </p>
          )}
          {cell.row.values?.status == 20 && (
            <p className='text-status_aprv_text text-center bg-status_aprv_bg border-status_aprv_border border-[1px] px-1 py-1  rounded-md'>
              Level 2
            </p>
          )}
          {cell.row.values?.status == 21 && (
            <p className='text-status_reject_text text-center bg-status_reject_bg border-status_reject_border border-[1px] px-1 py-1  rounded-md'>
              Level 2 Return
            </p>
          )}
          {cell.row.values?.status == 22 && (
            <p className='text-status_reject_text text-center bg-status_reject_bg border-status_reject_border border-[1px] px-1 py-1  rounded-md'>
              Level 2 Rejected
            </p>
          )}
          {cell.row.values?.status == 23 && (
            <p className='text-status_aprv_text text-center bg-status_aprv_bg border-status_aprv_border border-[1px] px-1 py-1  rounded-md'>
              Level 2 Revised
            </p>
          )}
          {cell.row.values?.status == 24 && (
            <p className='text-status_aprv_text text-center bg-status_aprv_bg border-status_aprv_border border-[1px] px-1 py-1  rounded-md'>
              Level 2 Approved
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
                `/ia-viewPreProcurementById/${cell.row.values.procurement_no}/${activeTab}`
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
              columns={P_COLUMNS}
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
              columns={P_COLUMNS}
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
