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
import PaymentDetailsSepticTank from "./PaymentDetailsSepticTank";
import ThemeStyleTanker from "@/Components/Common/ThemeStyleTanker";
// import submit from "../../Components/Media/submit.jpg";
import { useNavigate } from "react-router-dom";

function PreProcurementSubmittedScreen(props) {
  const navigate = useNavigate();
  const { formStyle } = ThemeStyleTanker();

  const [openPaymentModal, setOpenPaymentModal] = useState(0);

  console.log("booking no.12", props?.responseScreenData?.data?.applicationId);

  const handlePayment = () => {
    console.log("clicked====pay button");
    navigate(
      `/tanker-payment/${props?.responseScreenData?.data?.applicationId}/septicTanker`
    );
  };

  const handleClick = () => {
    navigate(`/searchSepticTankerBooking`);
  };
  return (
    <>
      <div>
        <PaymentDetailsSepticTank
          openPaymentModal={openPaymentModal}
          applicationId={props?.responseScreenData?.data?.applicationId}
        />
      </div>
      <div class={`${formStyle} w-2/3 mx-auto flex flex-col max-sm:w-full `}>
        <div class='relative overflow-hidden'>
          <div class='absolute inset-0 hover:bg-white opacity-0 transition duration-700 hover:opacity-10'></div>
          <img
            className='max-w-full h-auto mx-auto animate-wiggle p-2 '
            src={submit}
            alt='alt title'
          />
        </div>
        <div class=' flex-1'>
          <div class='mb-2'>
            <h3 class='text-2xl  text-center mb-3 text-green-600 font-openSans font-semibold'>
              Application Submitted Successfully
            </h3>
            <h3 class='text-xl  text-center mb-3 text-gray-400 font-openSans font-semibold '>
              Booking no. - {props?.responseScreenData?.data?.bookingNo}
            </h3>
          </div>
        </div>
        <div className='flex justify-around m-8'>
          <div claclassNamess=''>
            <button
              className={`bg-[#1A4D8C] text-sm px-8 py-2 text-white  rounded leading-5 shadow-lg`}
              onClick={handlePayment}
            >
              Pay
            </button>
          </div>

          <div class=''>
            <button
              className={`bg-[#1A4D8C] text-sm px-8 py-2 text-white  rounded leading-5 shadow-lg`}
              onClick={handleClick}
            >
              Home
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default PreProcurementSubmittedScreen;
