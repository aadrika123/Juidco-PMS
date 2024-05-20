//////////////////////////////////////////////////////////////////////////////////////
//    Author - Almaash Alam
//    Version - 1.0
//    Date - 29/09/2023
//    Revision - 1
//    Project - JUIDCO
//    Component  - PreProcurementSubmittedScreen
//    DESCRIPTION - PreProcurementSubmittedScreen
//////////////////////////////////////////////////////////////////////////////////////

import React, { useState } from "react";
import PaymentDetailsSepticTank from "./SuccessModal";
import ThemeStyleTanker from "@/Components/Common/ThemeStyleTanker";
import check from "@/Components/assets/check.svg";
import { useNavigate } from "react-router-dom";

function PreProcurementSubmittedScreen(props) {
  const navigate = useNavigate();
  const { formStyle } = ThemeStyleTanker();

  const [openPaymentModal, setOpenPaymentModal] = useState(0);

  const handleClick = () => {
    props?.submitForm()
    props?.setIsModalOpen(false)
    // navigate(`/sr-inventory-proposal`);
  };

  const handleCancilClick = () => {
    // props?.submitForm()
    // navigate(`/add-pre-procurement`);
    window.location.reload();
  };
  return (
    <>
      <div>
        {/* <PaymentDetailsSepticTank
          openPaymentModal={openPaymentModal}
          applicationId={props?.responseScreenData?.data?.applicationId}
        /> */}
      </div>
      <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
      <div className="bg-white w-1/2 mx-auto flex flex-col max-sm:w-full z-10  rounded">
        <div class="relative overflow-hidden mt-10">
          <div class="absolute inset-0 hover:bg-white opacity-0 transition duration-700 hover:opacity-10"></div>
          <img
            className="max-w-full h-[8rem] mx-auto animate-wiggle mb-5 "
            src={check}
            alt="alt title"
          />
        </div>
        <div class=" flex-1">
          <div class="">
            <h3 class="text-xl  text-center  text-black font-openSans">
            Are you Sure you want to Save
            </h3>
            {/* <h3 class="text-xl  text-center mb-3 text-gray-400 font-openSans font-semibold ">
              Booking no. - {props?.responseScreenData?.data?.bookingNo}
            </h3> */}
          </div>
        </div>
        <div className="flex flex-col m-8">
          
          <div className="flex justify-center space-x-5">
            <div>
              <button
                className={`bg-white border-blue-900 border text-blue-950 text-sm px-8 py-2 hover:bg-[#4338CA] hover:text-white  rounded leading-5 shadow-lg`}
                onClick={handleCancilClick}
              >
                Cancel
              </button>
            </div>

            <div class="">
              <button
                className={`bg-[#4338CA] text-sm px-8 py-2 text-white  rounded leading-5 shadow-lg`}
                onClick={handleClick}
              >
                Continue
              </button>
            </div>
          </div>

          <div>
            <h1 className="text-center pt-5">
              <span className="text-red-600 text-xl">*</span> By Clicking Continue your data will be Processed
            </h1>
          </div>
        </div>
        </div>
      </div>
    </>
  );
}

export default PreProcurementSubmittedScreen;
