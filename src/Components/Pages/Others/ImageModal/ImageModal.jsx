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
    // navigate(`/add-pre-procurement`);
    // window.location.reload();
  };
  return (
    <>
      <div
        className={`fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 transition-opacity ${
          props.imageModal ? "opacity-100" : "opacity-0 pointer-events-none"
        } z-[1000]`}
      >
        <div
          className={`bg-white rounded-lg p-8 shadow-lg relative transform transition-transform ${
            props.imageModal ? "scale-100 modal-pop" : "scale-95"
          }`}
        >
          <button
            className='absolute top-2 right-2 text-gray-500 hover:text-gray-700'
            onClick={handleCancilClick}
          >
            <p className='text-3xl pr-3'>&times;</p>
          </button>
          <img
            className='max-w-full h-[20rem] animate-wiggle mb-5 '
            src={props?.imageUrl}
            alt='alt title'
          />
        </div>
      </div>
    </>
  );
}

export default ImageModal;
