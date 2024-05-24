//////////////////////////////////////////////////////////////////////////////////////
//    Author - Almaash Alam
//    Version - 1.0
//    Date - 29/09/2023
//    Revision - 1
//    Project - JUIDCO
//    Component  - StockReceiverModal
//    DESCRIPTION - StockReceiverModal
//////////////////////////////////////////////////////////////////////////////////////

import React, { useState, useRef } from "react";
// import PaymentDetailsSepticTank from "./SuccessModal";
import ThemeStyleTanker from "@/Components/Common/ThemeStyleTanker";
import cancel from "@/Components/assets/cancel.svg";
import uploadImg from "@/Components/assets/uploadImg.png";
import { useNavigate } from "react-router-dom";

function StockReceiverModal(props) {
  const navigate = useNavigate();
  const inputFileRef = useRef();
  const { formStyle } = ThemeStyleTanker();

  const [openPaymentModal, setOpenPaymentModal] = useState(0);

  // console.log("Res Dataaaaaaaa", props?.responseScreenData);

  // const handlePayment = () => {
  //   console.log("clicked====pay button");
  //   navigate(
  //     `/tanker-payment/${props?.responseScreenData?.data?.applicationId}/septicTanker`
  //   );
  // };

  const handleClick = () => {
    props?.postBackToSR();
    navigate(`/sr-inventory-proposal`);
  };

  const handleCancilClick = () => {
    // props?.submitForm()
    // navigate(`/add-pre-procurement`);
    props.setIsModalOpen(false);
  };
  const handleUploadDoc = () => {
    inputFileRef.current.click();
    // props?.submitForm()
    // navigate(`/add-pre-procurement`);
    // props.setIsModalOpen(false);
  };
  return (
    <>
      <div>
        {/* <PaymentDetailsSepticTank
          openPaymentModal={openPaymentModal}
          applicationId={props?.responseScreenData?.data?.applicationId}
        /> */}
      </div>

      <div className='fixed inset-0 flex items-center justify-center z-[5000]'>
        <div className='absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm'></div>
        <div className='bg-white px-16 mx-auto flex flex-col max-sm:w-full z-10  rounded'>
          <div class='relative overflow-hidden mt-5'>
            <div class='absolute inset-0 hover:bg-white opacity-0 transition duration-700 hover:opacity-10'></div>
            <img
              className='max-w-full h-[6rem] mx-auto animate-wiggle mb-5 '
              src={cancel}
              alt='alt title'
            />
          </div>
          <div>
            <div className=''>
              <h3 className='text-xl text-black font-openSans'>
                Please Enter Remark for Stock Receiver
              </h3>
              {/* <h3 class="text-xl  text-center mb-3 text-gray-400 font-openSans font-semibold ">
              Booking no. - {props?.responseScreenData?.data?.bookingNo}
            </h3> */}
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
          </div>

          <div className='mb-10'>
            <h3 class='text-xl text-black font-openSans'>Upload your File </h3>

            <div className='flex items-end gap-6 mb-6'>
              <div className='border-[3px] border-dashed border-gray-600 w-1/3 p-6 rounded-md my-2'>
                <img
                  src={uploadImg}
                  alt='upload doc icon'
                  width={100}
                  height={100}
                />
              </div>
              <div>
                <input type='file' className='hidden' ref={inputFileRef} />
                <button
                  className={`bg-white border-blue-900 border text-blue-950 text-sm px-2 py-2 hover:bg-[#1A4D8C] hover:text-white  rounded leading-5 shadow-lg`}
                  onClick={handleUploadDoc}
                >
                  Upload Doc
                </button>
              </div>
            </div>
          </div>

          <div className='flex flex-col'>
            <div className='flex gap-4 justify-end'>
              <button
                className={`bg-white border-blue-900 border text-blue-950 text-sm px-6 py-2 hover:bg-[#1A4D8C] hover:text-white  rounded leading-5 shadow-lg`}
                onClick={handleCancilClick}
              >
                Cancel
              </button>

              <button
                className={`bg-[#1A4D8C] text-sm px-8 py-2 text-white  rounded leading-5 shadow-lg`}
                onClick={handleClick}
              >
                Continue
              </button>
            </div>

            <div>
              <h1 className='text-center pt-5'>
                <span className='text-red-600 text-xl'>*</span> By Clicking
                Continue your data will be Processed
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StockReceiverModal;
