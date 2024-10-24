//////////////////////////////////////////////////////////////////////////////////////
//    Author - Almaash Alam
//    Version - 1.0
//    Date - 25/05/2024
//    Revision - 1
//    Project - JUIDCO
//    Component  - ConfirmationModal
//    DESCRIPTION - ConfirmationModal
//////////////////////////////////////////////////////////////////////////////////////

import cancel from "@/Components/assets/cancel.svg";
import ThemeStyle from "../ThemeStyle";
import { IoCloseSharp } from "react-icons/io5";

function ConfirmationModal({
  confirmationHandler,
  handleCancel,
  message,
  sideMessage,
  loadingState,
  saveBtnLabel,
  cancelBtnLabel,
  cancelHandler,
}) {
  const { loading } = ThemeStyle();
  return (
    <>
      <div className='fixed inset-0 flex items-center justify-center z-[5000]'>
        <div className='absolute inset-0 bg-black bg-opacity-50 '></div>
        <div className='bg-white w-1/3 mx-auto flex flex-col max-sm:w-full z-10  rounded'>
          <div
            className='flex justify-end m-3'
            onClick={cancelHandler || handleCancel}
          >
            <IoCloseSharp
              color='grey'
              fontSize={30}
              className='hover:bg-blue-200 rounded-full hover:cursor-pointer'
            />
          </div>
          <div className='relative overflow-hidden mt-10'>
            <div className='absolute inset-0 hover:bg-white opacity-0 transition duration-700 hover:opacity-10'></div>
            <img
              className='max-w-full h-[8rem] mx-auto animate-wiggle mb-5 '
              src={cancel}
              alt='alt title'
            />
          </div>
          <div className='flex-1'>
            <div className=''>
              <h3 className='text-xl  text-center  text-black font-openSans'>
                {message}
              </h3>
            </div>
            <h3 className='text-center text-gray-500'>
              {sideMessage ? sideMessage : ""}
            </h3>
          </div>
          <div className='flex flex-col m-8'>
            <div className='flex justify-center space-x-5'>
              <div>
                <button
                  className={`bg-white border-blue-900 border text-blue-950 text-sm px-8 py-2 hover:bg-[#4338CA] hover:text-white  rounded leading-5 shadow-lg`}
                  onClick={handleCancel}
                >
                  {cancelBtnLabel ? cancelBtnLabel : "Cancel"}
                </button>
              </div>

              <div className=''>
                <button
                  className={`bg-[rgb(67,56,202)] text-sm px-8 py-2 text-white  rounded leading-5 shadow-lg`}
                  onClick={confirmationHandler}
                  disabled={loadingState}
                >
                  {loadingState ? (
                    <div className={`${loading}`}></div>
                  ) : saveBtnLabel ? (
                    saveBtnLabel
                  ) : (
                    "Continue"
                  )}
                </button>
              </div>
            </div>

            <div>
              {/* <h1 className='text-center pt-5'>
                <span className='text-red-600 text-xl'>*</span> By Clicking
                Continue your data will be Processed
              </h1> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ConfirmationModal;
