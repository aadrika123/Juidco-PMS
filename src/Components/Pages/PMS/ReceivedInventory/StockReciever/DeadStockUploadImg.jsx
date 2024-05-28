//////////////////////////////////////////////////////////////////////////////////////
//    Author - Almaash Alam
//    Version - 1.0
//    Date - 27/05/2024
//    Revision - 1
//    Project - JUIDCO
//    Component  - DeadStockUploadImg
//    DESCRIPTION - DeadStockUploadImg
//////////////////////////////////////////////////////////////////////////////////////

import React, { useState, useRef } from "react";
import { LuCloudy } from "react-icons/lu";

function DeadStockUploadImg(props) {
  const inputFileRef = useRef();

  const handleClick = () => {
    props?.postAddtoInventory();
    // props?.postBackToSR();
    // navigate(`/sr-inventory-proposal`);
  };

  const handleCancelClick = () => {
    // props?.submitForm()
    // navigate(`/add-pre-procurement`);
    props.setDeadStockImg(false);
  };
  const handleUploadDoc = () => {
    inputFileRef.current.click();
  };

  return (
    <>
      <div className='fixed inset-0 flex items-center justify-center z-[5000]'>
        <div className='absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm'></div>
        <div className='bg-white px-5 mx-auto flex flex-col max-sm:w-full z-10  rounded'>
          <div class='relative overflow-hidden mt-5 flex'>
            <div>
              <LuCloudy className='text-[2.5rem] p-2 mr-3 mt-1 border-[2px] rounded-full' />
            </div>
            <div>
              <h1>Upload Dead Stock Image</h1>
              <p className='text-[12px] text-gray-400'>
                Enter & Upload the files of your choice
              </p>
            </div>
          </div>

          <hr className='w-full mt-3' />

          <div className='mb-10 mt-5 border-[3px] rounded-xl border-dashed flex justify-center items-center flex-col w-full'>
            <div className='rounded-md mt-8'>
              <LuCloudy className='text-[1.5rem]' />
            </div>
            <h3 class='text-xl text-black font-openSans'>choose a file </h3>
            <h1 className='text-gray-400 text-sm px-6'>
              JPEG, PNG, PDG, and MP4 formats, up to 50MB
            </h1>
            <div className='mb-8'>
              <input
                type='file'
                className='hidden'
                ref={inputFileRef}
                onChange={(e) => props?.setImageDoc(e.target.files[0])}
              />
              <button
                className={`bg-white border-gray-300 border text-gray-150 text-sm px-14 py-1 mt-2 hover:bg-gray-200 hover:text-gray-500  rounded leading-5 shadow-lg`}
                onClick={handleUploadDoc}
              >
                Browse File
              </button>
            </div>
          </div>

          {/* <div>
            <div className=''>
              <h3 className='text-sm text-black font-openSans'>
                Remarks
              </h3>
              
            </div>
            <div className='flex justify-center mb-6 mt-2'>
              <textarea
                name='sr_remark'
                className='border border-[#5448dd] rounded w-[28rem] h-[5rem]'
                placeholder=' Enter Remarks...'
                onChange={(e) => props.setRemark(e.target.value)}
                required
              />
            </div>
          </div> */}

          <div className='flex flex-col'>
            <div className='flex gap-4 justify-end'>
              <button
                className={`bg-white border-blue-900 border text-blue-950 text-sm px-6 py-2 hover:bg-[#1A4D8C] hover:text-white  rounded leading-5 shadow-lg`}
                onClick={handleCancelClick}
              >
                Cancel
              </button>

              <button
                className={`bg-[#1A4D8C] text-sm px-8 py-2 text-white  rounded leading-5 shadow-lg`}
                onClick={handleClick}
              >
                Save
              </button>
            </div>

            <div>
              <h1 className='text-center pt-5'>
                {/* <span className='text-red-600 text-xl'>*</span> By Clicking
                Continue your data will be Processed */}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeadStockUploadImg;
