
import React, { useState } from "react";
import InventoryProposalList from "./InventoryProposalList";
import ProjectApiList from "@/Components/api/ProjectApiList";
import { FaChartPie } from "react-icons/fa";
import { contextVar } from "@/Components/context/contextVar";
import { useContext } from "react";
import TitleBar from "@/Components/Pages/Others/TitleBar";

const RejectedBoq = () => {
  const { api_fetchDaBoqListInbox } =
    ProjectApiList();
  const { titleBarVisibility } = useContext(contextVar);

  return (
    <>
      <div className=''>
        <TitleBar
          titleBarVisibility={titleBarVisibility}
          titleText={"Inventory Proposal"}
        />
      </div>

      <div className='container mx-auto bg-white rounded border border-blue-500 mt-6 shadow-xl'>
        <div>
          <h1 className='text-[35px] text-right pb-5 pr-5 font-bold pt-5'>
            Rejected BOQ
          </h1>
        </div>

        <hr className='w-[76rem] mt-5' />

        <div className='mt-4'>
          <InventoryProposalList
            page='inbox'
            api={api_fetchDaBoqListInbox}
          />
        </div>
      </div>
    </>
  );
};

export default RejectedBoq;
