//////////////////////////////////////////////////////////////////////////////////////
//    Author - Almaash Alam
//    Version - 1.0
//    Date - 08/06/2024
//    Revision - 1
//    Project - JUIDCO
//    Component  - BoqDetailModal
//    DESCRIPTION - BoqDetailModal
//////////////////////////////////////////////////////////////////////////////////////

import AxiosInterceptors from "@/Components/Common/AxiosInterceptors";
import ApiHeader from "@/Components/api/ApiHeader";
import ProjectApiList from "@/Components/api/ProjectApiList";
import React, { useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

function BoqDetailModal(props) {
  const [applicationdata, setApplicationData] = useState();

  const { api_fetchAllBoqDetails } = ProjectApiList();

  const fetchBoqDataList = () => {
    AxiosInterceptors.post(
      `${api_fetchAllBoqDetails}`,
      { procurement_no: [props?.singleProNo] },
      ApiHeader()
    )
      .then(function (response) {
        console.log("all boq data fetched ...", response?.data?.data);
        if (response?.data?.status) {
          setApplicationData(response?.data?.data);

          // setisLoading(false);
        } else {
          // setisLoading(false);
          toast.error(response?.data?.message);
        }
      })
      .catch(function (error) {
        toast.error("");
        console.log("==2 details by id error...", error);
      });
  };

  useEffect(() => {
    fetchBoqDataList();
  }, []);

  const handleCancilClick = () => {
    props?.setDetailModal(false);
  };
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-[5000]">
        <div className=" absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm overflow-auto"></div>
        <div className="bg-white w-1/3 mx-auto flex flex-col max-sm:w-full z-10  rounded border border-blue-500 shadow-lg ">
          <AiOutlineCloseCircle
            onClick={handleCancilClick}
            className="absolute top-[9rem] right-[30rem] text-3xl text-white cursor-pointer hover:text-black"
          />
          <div className=" flex justify-center ">
            <div className="m-5">
              <h3 className="text-xl font-bold underline text-center  text-blue-700 font-openSans">
                Procurement Details
              </h3>
            </div>
          </div>
          <hr className="border w-full border-gray-200" />

          <div className="ml-20 mr-20 space-y-5 mb-10 mt-10">
            <div className="flex justify-between">
              <h1>Procurement No</h1>:
              <p>{applicationdata && applicationdata[0]?.procurement_no}</p>
            </div>
            <div className="flex justify-between">
              <h1>Category</h1>:
              <p>{applicationdata && applicationdata[0]?.category?.name}</p>
            </div>
            <div className="flex justify-between">
              <h1>Sub Category</h1>:
              <p>{applicationdata && applicationdata[0]?.subcategory?.name}</p>
            </div>
            <div className="flex justify-between">
              <h1>Brand</h1>:
              <p>{applicationdata && applicationdata[0]?.brand?.name}</p>
            </div>
            <div className="flex justify-between">
              <h1>Description</h1>:
              <p>{applicationdata && applicationdata[0]?.description}</p>
            </div>
          </div>

          {/* <div className='flex flex-col m-8'>
            <div className='flex justify-center space-x-5'>
              <div>
                <button
                  className={`bg-white border-blue-900 border text-blue-950 text-sm px-8 py-2 hover:bg-[#4338CA] hover:text-white  rounded leading-5 shadow-lg`}
                  onClick={handleCancilClick}
                >
                  No
                </button>
              </div>

              <div className=''>
                <button
                  className={`bg-[#4338CA] text-sm px-8 py-2 text-white  rounded leading-5 shadow-lg`}
                  onClick={handleClick}
                >
                  Yes
                </button>
              </div>
            </div>

            <div>
              <h1 className='text-center pt-5'>
                <span className='text-red-600 text-xl'>*</span> By Clicking
                Continue your data will be Processed
              </h1>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}

export default BoqDetailModal;
