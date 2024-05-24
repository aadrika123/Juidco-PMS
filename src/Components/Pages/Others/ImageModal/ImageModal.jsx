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
// import PaymentDetailsSepticTank from "./PaymentDetailsSepticTank";
import ThemeStyleTanker from "@/Components/Common/ThemeStyleTanker";
import cancel from "@/Components/assets/user copy.png";
import { useNavigate } from "react-router-dom";

function ImageModal(props) {
  const navigate = useNavigate();
  const { formStyle } = ThemeStyleTanker();

  const [openPaymentModal, setOpenPaymentModal] = useState(0);

  // console.log("Res Dataaaaaaaa", props?.responseScreenData);

  // const handlePayment = () => {
  //   console.log("clicked====pay button");
  //   navigate(
  //     `/tanker-payment/${props?.responseScreenData?.data?.applicationId}/septicTanker`
  //   );
  // };

  // const handleClick = () => {
  //   window.location.reload();
  //   // props?.submitForm()
  //   // navigate(`/add-pre-procurement`);
  // };
 
  const handleCancilClick = () => {
    props?.setImageModal(false)
    // navigate(`/add-pre-procurement`);
    // window.location.reload();
  };
  return (
    <>
      
      {/* <div className="fixed inset-0 flex items-center justify-center z-[5000]">
      <div className=" absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm overflow-auto"></div>
      <div className="bg-white w-1/3 mx-auto flex flex-col max-sm:w-full z-10  rounded">
        <div className="relative overflow-hidden mt-10">
          <div class="absolute inset-0 hover:bg-white opacity-0 transition duration-700 hover:opacity-10"></div>
          <img
            className="max-w-full h-[8rem] mx-auto animate-wiggle mb-5 "
            src={cancel}
            alt="alt title"
          />
        </div>
        <div class=" flex-1">
          <div class="">
            <h3 class="text-xl  text-center  text-black font-openSans">
            Are you Sure you want to Cancel
            </h3>
            
          </div>
        </div>
        <div className="flex flex-col m-8">
          
          <div className="flex justify-center space-x-5">
            <div>
              <button
                className={`bg-white border-blue-900 border text-blue-950 text-sm px-8 py-2 hover:bg-[#4338CA] hover:text-white  rounded leading-5 shadow-lg`}
                onClick={handleCancilClick}
              >
                No
              </button>
            </div>

            <div class="">
              <button
                className={`bg-[#4338CA] text-sm px-8 py-2 text-white  rounded leading-5 shadow-lg`}
                
              >
                Yes
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

      </div> */}

      <div className={`fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 transition-opacity ${props.imageModal ? 'opacity-100' : 'opacity-0 pointer-events-none'} z-[5000]`}>
      <div className={`bg-white rounded-lg p-8 shadow-lg relative transform transition-transform ${props.imageModal ? 'scale-100 modal-pop' : 'scale-95'}`}>
        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={handleCancilClick}>
          <p className="text-3xl pr-3">&times;</p>
        </button>
        <img
            className="max-w-full h-[8rem] animate-wiggle mb-5 "
            src={cancel}
            alt="alt title"
          />
      </div>
    </div>

      
    </>
  );
}

export default ImageModal;
