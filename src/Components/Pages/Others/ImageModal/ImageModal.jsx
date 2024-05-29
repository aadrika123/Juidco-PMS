//////////////////////////////////////////////////////////////////////////////////////
//    Author - Almaash Alam
//    Version - 1.0
//    Date - 29/09/2023
//    Revision - 1
//    Project - JUIDCO
//    Component  - ImageModal
//    DESCRIPTION - ImageModal
//////////////////////////////////////////////////////////////////////////////////////

import React, { useState } from "react";
import cancel from "@/Components/assets/user copy.png";

function ImageModal(props) {

  let buttonStyle = 'pb-2 pl-6 pr-6 w-full pt-2 border border-indigo-500 text-indigo-500 text-sm leading-tight  rounded  hover:bg-indigo-700 hover:text-white hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out shadow-xl'

  const handleCancilClick = () => {
    props?.setImageModal(false);
    // navigate(`/add-pre-procurement`);
    // window.location.reload();
  };

  // Print the Image
  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <div
        className={`fixed inset-0 flex flex-col items-center justify-center bg-gray-800 bg-opacity-50 transition-opacity ${
          props.imageModal ? "opacity-100" : "opacity-0 pointer-events-none"
        } z-[1000]`}
      >
     
        <div
          className={`bg-transparent rounded-lg relative transform transition-transform ${
            props.imageModal ? "scale-100 modal-pop" : "scale-95"
          }`}
          id="printable-content"
        >
         <button
            className='absolute top-1 right-1 text-white bg-transparent border border-white hover:bg-indigo-600 pl-2 pr-2 rounded-lg'
            onClick={handleCancilClick}
          >
            <p className='text-3xl' >&times;</p>
          </button>
          
          <img
            className='max-w-full w-full h-[20rem] animate-wiggle mb-5 '
            src={props?.imageUrl}
            alt='alt title'
            
          />
          
        
        </div>
        <div className="flex">
        <button onClick={handlePrint} className={`w-96 border bg-indigo-700 text-white border-blue-950 pl-5 pr-5 pt-1 pb-1 rounded hover:bg-indigo-500 `} >Print</button>
        </div>
      </div>
    </>
  );
}

export default ImageModal;
