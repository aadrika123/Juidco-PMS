//////////////////////////////////////////////////////////////////////////////////////
//    Author - Almaash Alam
//    Version - 1.0
//    Date - 23/05/2024
//    Revision - 1
//    Project - JUIDCO
//    Component  - DaRejectModal
//    DESCRIPTION - DaRejectModal
//////////////////////////////////////////////////////////////////////////////////////

import React, { useState } from "react";
// import PaymentDetailsSepticTank from "./SuccessModal";
import ThemeStyleTanker from "@/Components/Common/ThemeStyleTanker";
import cancel from "@/Components/assets/cancel.svg";
import { useNavigate } from "react-router-dom";

function DaRejectModal(props) {
  const navigate = useNavigate();

  const handleClick = () => {
    props?.postRejectTender();
    navigate(`/sr-inventory-proposal`);
  };

  const handleCancilClick = () => {
    props.setIsModalOpen3(false);
  };
  return (
    <>
      <div></div>
      <div className='fixed inset-0 flex items-center justify-center z-[5000]'>
        <div className='absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm'></div>
        <div className='bg-white w-1/3 mx-auto flex flex-col max-sm:w-full z-10  rounded'>
          <div class='relative overflow-hidden mt-10'>
            <div class='absolute inset-0 hover:bg-white opacity-0 transition duration-700 hover:opacity-10'></div>
            <img
              className='max-w-full h-[8rem] mx-auto animate-wiggle mb-5 '
              src={cancel}
              alt='alt title'
            />
          </div>
          <div class=' flex-1'>
            <div class=''>
              <h3 class='text-xl  text-center  text-black font-openSans'>
                {props?.heading || "Sure to Reject the Tender"}
              </h3>
            </div>
          </div>

          <div className='flex justify-center'>
            <textarea
              name='sr_remark'
              className='border border-[#5448dd] rounded w-[22rem]  mt-5 p-2'
              placeholder=' Enter Remarks...'
              onChange={(e) => props.setRemark(e.target.value)}
              required
            />
          </div>

          <div className='flex flex-col m-8'>
            <div className='flex justify-center space-x-5'>
              <div>
                <button
                  className={`bg-white border-blue-900 border text-blue-950 text-sm px-8 py-2 hover:bg-[#1A4D8C] hover:text-white  rounded leading-5 shadow-lg`}
                  onClick={handleCancilClick}
                >
                  Cancel
                </button>
              </div>

              <div class=''>
                <button
                  className={`bg-[#1A4D8C] text-sm px-8 py-2 text-white  rounded leading-5 shadow-lg`}
                  onClick={handleClick}
                >
                  Continue
                </button>
              </div>
            </div>

            {/* <div>
              <h1 className='text-center pt-5'>
                <span className='text-red-600 text-xl'>*</span> By Clicking
                Continue your data will be Processed
              </h1>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default DaRejectModal;
