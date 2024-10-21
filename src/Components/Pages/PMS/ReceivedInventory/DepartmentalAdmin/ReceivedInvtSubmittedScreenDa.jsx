//////////////////////////////////////////////////////////////////////////////////////
//    Author - Almaash Alam
//    Version - 1.0
//    Date - 24/05/2024
//    Revision - 1
//    Project - JUIDCO
//    Component  - StockReceiverModal
//    DESCRIPTION - StockReceiverModal
//////////////////////////////////////////////////////////////////////////////////////

import React, { useState, useRef } from "react";
import { LuCloudy } from "react-icons/lu";
import { allowCharacterNumberInput } from "@/Components/Common/PowerupFunctions";
import toast from "react-hot-toast";
import ThemeStyle from "@/Components/Common/ThemeStyle";

function StockReceiverModal(props) {
  const inputFileRef = useRef();
  const {loading} = ThemeStyle()
  const [preview, setPreview] = useState();

  const handleClick = () => {
    props?.submitFunc();
  };

  const handleCancelClick = () => {
    props.setIsModalOpen(false);
    window.location.reload();
  };
  const handleUploadDoc = () => {
    inputFileRef.current.click();
  };

  //image validation with file type and size limit
  const imageHandler = (e) => {
    const validExtensions = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "application/pdf",
    ];

    const maxSizeInBytes = 2 * 1024 * 1024; // 2MB in bytes

    const file = e.target.files[0];
    if (!file) {
      setPreview(null);
      return toast.error("No File Selected");
    }

    // Check the file type
    if (!validExtensions.includes(file.type)) {
      toast.error(
        "Invalid file type. Please select a JPG, JPEG, PNG or PDF file."
      );
      setPreview(null);

      e.target.value = ""; // Clear the input
      return;
    }

    // Check the file size
    if (file.size > maxSizeInBytes) {
      toast.error("File size exceeds 2MB. Please select a smaller file.");
      setPreview(null);

      e.target.value = ""; // Clear the input
      return;
    }

    if (file) {
      props?.setImageDoc(file);
      setPreview(URL.createObjectURL(file));
    }
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
              <h1>Upload Remark & Files</h1>
              <p className='text-[12px] text-gray-400'>
                Enter & Upload the files of your choice
              </p>
            </div>
          </div>

          <hr className='w-full mt-3' />

          <div className='mb-10 mt-5 border-[3px] rounded-xl border-dashed flex justify-center items-center flex-col'>
            {preview == null && (
              <>
                <div className='rounded-md mt-8'>
                  <LuCloudy className='text-[1.5rem]' />
                </div>
                <h3 class='text-xl text-black font-openSans'>Choose a file </h3>
                <h1 className='text-gray-400 text-sm'>
                  JPEG, PNG, JPG, and PDF formats, up to 2MB
                </h1>
              </>
            )}

            {props?.imageDoc?.type?.match(/(jpg|jpeg|png)$/) && (
              <img
                src={preview}
                alt='Image Preview'
                // style={{ width: "200px", height: "auto", marginTop: "20px", border: "2px", borderColor: "blue" }}
                className='w-[200px] h-auto mt-[20px] border border-indigo-400 rounded'
              />
            )}

            {props?.imageDoc?.type.includes("pdf") && (
              <iframe
                src={preview}
                alt='Image Previewss'
                style={{ marginTop: "20px", width: "300px", height: "200px" }}
              />
            )}

            <div className='mb-4'>
              <input
                type='file'
                accept='.jpg, .jpeg, .pdf .png'
                className='hidden'
                ref={inputFileRef}
                onChange={(e) => imageHandler(e)}
              />

              {preview != null && (
                <p className='text-red-500 text-sm m-2'>
                  {props?.imageDoc?.name}
                </p>
              )}

              <div className='flex justify-center'>
                <button
                  className={`bg-white border-gray-300 border text-gray-150 text-sm px-14 py-1 mt-2 hover:bg-gray-200 hover:text-gray-500  rounded leading-5 shadow-lg`}
                  onClick={handleUploadDoc}
                >
                  Browse File
                </button>
              </div>
            </div>
          </div>

          <div>
            <div className=''>
              <h3 className='text-sm text-black font-openSans'>Remarks</h3>
            </div>
            <div className='flex justify-center mb-6'>
              <textarea
                name={props.remarks}
                className='border border-[#5448dd] rounded w-[28rem] h-[5rem] p-2'
                placeholder=' Enter Remarks...'
                onChange={(e) => {
                  allowCharacterNumberInput(
                    e.target.value,
                    e.target.value,
                    1000
                  );
                  props?.setFormData((prev) => ({
                    ...prev,
                    remark: e.target.value,
                  }));
                }}
                required
              />
            </div>
          </div>

          <div className='flex flex-col'>
            <div className='flex gap-4 justify-end'>
              <button
                className={`bg-white border-blue-900 border text-blue-950 text-sm px-6 py-2 hover:bg-[#1A4D8C] hover:text-white  rounded leading-5 shadow-lg`}
                onClick={handleCancelClick}
              >
                Cancel
              </button>

              <button
                className={`bg-[#1A4D8C] text-sm px-8 py-2 text-white  rounded leading-5 shadow-lg disabled:bg-indigo-300`}
                onClick={handleClick}
                disabled={props?.formData.remark == ""}
              >
                {props?.loadingState ? (
                    <div className={`${loading}`}></div>
                  ) : (
                    "Save"
                  )}
              </button>
            </div>

            <div>
              <h1 className='text-center pt-5'></h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StockReceiverModal;
