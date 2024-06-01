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
  const handleCancilClick = () => {
    props?.setImageModal(false);
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
          id='printable-content'
        >
          <button
            className='absolute top-1 right-1 text-white bg-transparent border border-white hover:bg-indigo-600 pl-2 pr-2 rounded-lg'
            onClick={handleCancilClick}
          >
            <p className='text-3xl'>&times;</p>
          </button>

          {props?.imageUrl?.type?.match(/(jpg|jpeg|png)$/) && (
            <img
              className='max-w-full w-full h-[20rem] '
              src={props?.imageUrl}
              alt='alt title'
            />
          )}

          {!props?.imageUrl?.type?.match(/(jpg|jpeg|png)$/) && (
            <iframe
              src={props?.imageUrl}
              alt='Image Preview'
              className=''

              // style={{ width: "200px", height: "auto", marginTop: "20px" }}
            />
          )}
        </div>
        <div className='flex'>
          <button
            onClick={handlePrint}
            className={`w-96 border bg-indigo-700 text-white border-blue-950 pl-5 pr-5 pt-1 pb-1 rounded hover:bg-indigo-500 `}
          >
            Print
          </button>
        </div>
      </div>
    </>
  );
}

export default ImageModal;
