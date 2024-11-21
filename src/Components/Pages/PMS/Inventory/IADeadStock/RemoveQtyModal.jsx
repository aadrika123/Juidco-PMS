//////////////////////////////////////////////////////////////////////////////////////
//    Author - Almaash Alam
//    Version - 1.0
//    Date - 25/05/2024
//    Revision - 1
//    Project - JUIDCO
//    Component  - RemoveQtyModal
//    DESCRIPTION - RemoveQtyModal
//////////////////////////////////////////////////////////////////////////////////////

import ThemeStyle from "@/Components/Common/ThemeStyle";

import * as React from "react";


function RemoveQtyModal({availableQuantity,value,setValue,setServiceRequestModal,submit,loader}) {
  const { labelStyle, loading } = ThemeStyle();

  let buttonStyle2 =
    " mr-2 pb-2 pl-6 pr-6 pt-2 border border-indigo-500 text-white text-sm sm:text-sm leading-tight rounded hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out shadow-xl bg-indigo-700";
  let inputStyle2 =
    " w-full leading-5 relative py-2 px-4 rounded text-gray-800 bg-white border border-gray-300 overflow-x-auto focus:outline-none focus:border-gray-400 focus:ring-0 darks:text-gray-300 darks:bg-gray-700 darks:border-gray-700 darks:focus:border-gray-600";

    console.log("availableQuantity",availableQuantity)
  return (
    <>
      <div></div>
      <div className='fixed inset-0 flex items-center justify-center z-[5000]'>
        <div className='absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm'></div>
        <div className='bg-white w-1/3 mx-auto flex flex-col max-sm:w-full z-10  rounded p-10'>
          <h1 className='text-center text-2xl font-semibold mb-7 text-blue-950 capitalize'>
            Enter No of Quantity
          </h1>
          <div className='form-group flex-shrink max-w-full px-4 mb-4 text-center'>
            <label
              className={`${labelStyle} inline-block mb-1 text-center capitalize`}
            >
              Enter No of Quantity
            </label>
          <input
  className={inputStyle2}
  type="number"
  value={value || ""}
  onChange={(e) => {
    const enteredValue = e.target.value;
    if (enteredValue <= availableQuantity) {
     setValue(enteredValue);
    } else {
      setValue(availableQuantity);
    }
  }}
  min={0} 
/>


          </div>
          <div className='flex justify-between mt-10 m-3'>
            <button
              className={`${buttonStyle2} pl-14 pr-14`}
              onClick={() => setServiceRequestModal(false)}
            >
              Cancel
            </button>
            <button
              className={`${buttonStyle2} pl-14 pr-14`}
              onClick={() => submit()}
              disabled={loader}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default RemoveQtyModal;
