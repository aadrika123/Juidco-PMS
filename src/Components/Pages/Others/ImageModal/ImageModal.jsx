//////////////////////////////////////////////////////////////////////////////////////
//    Author - dimple kumari
//    Version - 1.0
//    Date - 19/06/2024
//    Revision - 1
//    Project - JUIDCO
//    Component  - ImageModal
//    DESCRIPTION - ImageModal
//////////////////////////////////////////////////////////////////////////////////////

import React, { useRef } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useReactToPrint } from "react-to-print";

function ImageModal(props) {
  const handleCancelClick = () => {
    props?.setImageModal(false);
  };

  // Print functionality
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <div
        className={`fixed inset-0 z-[1000] flex items-center justify-center bg-gray-800 bg-opacity-50 transition-opacity duration-300 ${
          props.imageModal ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`relative bg-transparent rounded-lg transform transition-transform duration-300 ${
            props.imageModal ? "scale-100" : "scale-95"
          }`}
          ref={componentRef}
          style={{
            width: "40rem",
            height: "30rem",
            overflow: "hidden",
          }}
        >
          {/* Close Button */}
          <AiOutlineCloseCircle
            onClick={handleCancelClick}
            className="absolute top-2 right-2 text-3xl text-white cursor-pointer hover:text-black"
          />

          {/* Display Image */}
          {(props?.imageDoc?.type?.match(/(jpg|jpeg|png)$/) ||
            props?.imageUrl?.match(/(jpg|jpeg|png)$/)) && (
            <img
              className="w-full h-full object-contain"
              src={props?.imageUrl}
              alt="Preview"
            />
          )}

          {/* Display Other File Types */}
          {(props?.imageDoc?.type === "application/pdf" ||
            props?.imageDoc?.type === "text/csv" ||
            props?.imageDoc?.type ===
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
            props?.imageUrl?.includes(".pdf") ||
            props?.imageUrl?.includes(".xlsx") ||
            props?.imageUrl?.includes(".csv")) && (
            <iframe
              src={props?.imageUrl}
              title="File Preview"
              className="w-full h-full"
            />
          )}
        </div>

        {/* Print Button */}
        <div className="mt-4">
          {!(
            props?.imageDoc?.type === "application/pdf" ||
            props?.imageDoc?.type === "text/csv" ||
            props?.imageDoc?.type ===
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
            props?.imageUrl?.includes(".pdf") ||
            props?.imageUrl?.includes(".xlsx") ||
            props?.imageUrl?.includes(".csv")
          ) && (
            <button
              onClick={handlePrint}
              className="px-5 py-2 bg-indigo-700 text-white rounded hover:bg-indigo-500"
            >
              Print
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default ImageModal;

