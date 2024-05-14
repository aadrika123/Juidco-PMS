// src/components/InventoryProposalListTabs.js
import React, { useState } from 'react';
import { GoPlus } from "react-icons/go";
import { useNavigate } from 'react-router-dom';
import InventoryProposalList from './InventoryProposalList';
import ProjectApiList from "@/Components/api/ProjectApiList";

const InventoryProposalListTabs = () => {
  const [activeTab, setActiveTab] = useState('inbox');
  const navigate = useNavigate();
  const {
    
    api_fetchProcurementList,
    api_fetchProcurementDAList
  } = ProjectApiList();

  return (
    <div className="container mx-auto">
    <div>
        <h1 className='text-[35px] text-right pb-5 font-bold'>Inentvory Proposal</h1>
    </div>
      <div>
              <button 
              className="bg-[#4338CA] pl-2 pr-4 pt-3 pb-3 text-white rounded hover:bg-white hover:text-[#4338ca] border hover:border-[#4338ca] flex float-right "
              onClick={() =>
              navigate(`/add-pre-procurement`)
            }
              >
              
              <GoPlus className="m-1 text-[1rem]"/>
              Request Inventory
              </button>
        </div>
      <div className="flex border-b border-gray-200">
        <button
          className={`py-2 px-4 ${activeTab === 'inbox' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'} focus:outline-none`}
          onClick={() => setActiveTab('inbox')}
        >
          Inbox
        </button>
        <button
          className={`ml-4 py-2 px-4 ${activeTab === 'outbox' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'} focus:outline-none`}
          onClick={() => setActiveTab('outbox')}
        >
          Outbox
        </button>
      </div>
      <div className="mt-4">
        {activeTab === 'inbox' && <div><InventoryProposalList api={api_fetchProcurementList} /></div>}
        {activeTab === 'outbox' && <div><InventoryProposalList api={api_fetchProcurementDAList} /></div>}
      </div>
    </div>
  );
};

export default InventoryProposalListTabs;
