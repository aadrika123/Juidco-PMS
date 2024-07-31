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

const TabsMenu = (props) => {
  const [activeTab, setActiveTab] = useState("inbox");

  const {
    api_fetchProcurementList,
    api_fetchProcurementDAList,
    api_iaStockReqInbox,
    api_iaStockReqOubox,
  } = ProjectApiList();

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
              columns={props?.COLUMNS}
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
              columns={props?.COLUMNS}
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
              columns={props?.COLUMNS}
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
              columns={props?.COLUMNS}
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
