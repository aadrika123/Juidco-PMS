import React, { useContext } from "react";
import d from "@/Components/assets/ptax.jpg";
import TitleBar from "../../Others/TitleBar";
import { contextVar } from "@/Components/context/contextVar";

const TenderFormViewDetails = () => {

    const { titleBarVisibility } = useContext(contextVar);

  const descTitle = "font-bold text-[#4D4B4B]";
  const descText = "text-[#7d7d7d]";

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
     <div className=''>
        <TitleBar
          titleBarVisibility={titleBarVisibility}
          titleText={"Tender Input Form Summary"}
        />
      </div>
      <div className="" id="printable-content">
        <div className="page-content">
          {/* Basic Details */}

          <div className="bg-[#4338ca] border-b  p-4 rounded mt-5">
            <p className="text-xl text-white">Basic Details</p>
          </div>

          <div className="flex  bg-white border shadow-xl mt-2 rounded">
            <div className="p-10 text-sm space-y-4 w-1/2 ">
              <h1>
                <span className={descTitle}>Organization Chain : </span>{" "}
                <span className={descText}>XYZ Values</span>
              </h1>
              <h1>
                <span className={descTitle}>Tender Reference Number : </span>{" "}
                <span className={descText}>XYZ Values</span>
              </h1>
              <h1>
                <span className={descTitle}>Tender ID : </span>{" "}
                <span className={descText}>XYZ Values</span>
              </h1>
              <h1>
                <span className={descTitle}>Tender Type : </span>{" "}
                <span className={descText}>XYZ Values</span>
              </h1>
              <h1>
                <span className={descTitle}>Tender Category : </span>{" "}
                <span className={descText}>XYZ Values</span>
              </h1>
              <h1>
                <span className={descTitle}>
                  General Technical Evaluation Allowed :{" "}
                </span>{" "}
                <span className={descText}>XYZ Values</span>
              </h1>
              <h1>
                <span className={descTitle}>Payment Mode : </span>{" "}
                <span className={descText}>XYZ Values</span>
              </h1>
              <h1>
                <span className={descTitle}>
                  Multi Currency Allowed For Fee :{" "}
                </span>{" "}
                <span className={descText}>XYZ Values</span>
              </h1>
            </div>
            <div className="p-4 pt-9 text-sm space-y-4 w-1/2">
              <h1>
                <span className={descTitle}>Withdrawal Allowed : </span>{" "}
                <span className={descText}>XYZ Values</span>
              </h1>
              <h1>
                <span className={descTitle}>Form of Contract : </span>{" "}
                <span className={descText}>XYZ Values</span>
              </h1>
              <h1>
                <span className={descTitle}>No of Covers : </span>{" "}
                <span className={descText}>XYZ Values</span>
              </h1>
              <h1>
                <span className={descTitle}>
                  Item Wise Technical Evaluation Allowed :{" "}
                </span>{" "}
                <span className={descText}>XYZ Values</span>
              </h1>
              <h1>
                <span className={descTitle}>
                  Is Multi Currency Allowed for BOQ :{" "}
                </span>{" "}
                <span className={descText}>XYZ Values</span>
              </h1>
              <h1>
                <span className={descTitle}>Allow Two Stage Bidding : </span>{" "}
                <span className={descText}>XYZ Values</span>
              </h1>
            </div>
          </div>

          {/* Cover Details */}

          <div className="bg-[#4338ca] border-b  p-4 rounded mt-5">
            <p className="text-xl text-white">
              Cover Details, No of Covers - 4{" "}
            </p>
          </div>

          <div className="flex flex-col bg-white border shadow-xl mt-2 rounded">
            <div className="p-4 flex text-sm w-full">
              <div className="p-5 w-1/2 space-y-3">
                <h1>
                  <span className={descTitle}>No of Covers :</span>{" "}
                  <span className={descText}>Two Covers</span>
                </h1>
                <h1>
                  <span className={descTitle}>Remarks :</span>
                  <span className={descText}>
                    {" "}
                    Lipsum dolor sit amet. 33 quod temporibus sed repudiandae
                    reiciendis ex distinctio voluptatum ut deleniti possimus sit
                    dicta maxime et quae{" "}
                  </span>
                </h1>
              </div>

              <div className="flex space-x-5 w-1/2 justify-center items-center text-center">
                <div>
                  <img src={d} className="w-28 rounded" /> <p>cover 1</p>{" "}
                </div>
                <div>
                  <img src={d} className="w-28 rounded" /> <p>cover 2</p>{" "}
                </div>
                <div>
                  <img src={d} className="w-28 rounded" /> <p>cover 3</p>{" "}
                </div>
                <div>
                  <img src={d} className="w-28 rounded" /> <p>cover 4</p>{" "}
                </div>
              </div>
            </div>
          </div>

            
          {/* Work Item Details */}

          <div className="bg-[#4338ca] border-b  p-4 rounded mt-5">
            <p className="text-xl text-white">Work Item Details</p>
          </div>
          <div className="flex flex-col bg-white border shadow-xl mt-2 rounded">
            <div className="p-9 text-sm w-full space-y-3">
              <h1>
                <span className={descTitle}>Work Item Title : </span>{" "}
                <span className={descText}>XYZ Values</span>
              </h1>
              <h1>
                <span className={descTitle}>Work Discription : </span>
                <span className={descText}>
                  Lipsum dolor sit amet. 33 quod temporibus sed repudiandae
                  reiciendis ex distinctio voluptatum ut deleniti possimus sit
                  dicta maxime et quaerat doloribus. Est
                </span>
              </h1>
            </div>
            <div className="flex w-full">
              <div className="p-4 text-sm space-y-4 w-1/2 pl-10">
                <h1>
                  <span className={descTitle}>
                    Pre Qualification Details :{" "}
                  </span>{" "}
                  <span className={descText}>XYZ Values</span>
                </h1>
                <h1>
                  <span className={descTitle}>Product Category : </span>{" "}
                  <span className={descText}>XYZ Values</span>
                </h1>
                <h1>
                  <span className={descTitle}>Product Sub Category : </span>{" "}
                  <span className={descText}>XYZ Values</span>
                </h1>
                <h1>
                  <span className={descTitle}>Contract Type : </span>{" "}
                  <span className={descText}>XYZ Values</span>
                </h1>
                <h1>
                  <span className={descTitle}>Tender Value : </span>{" "}
                  <span className={descText}>XYZ Values</span>
                </h1>
                <h1>
                  <span className={descTitle}>
                    Bid Validity Date (In Days) :{" "}
                  </span>{" "}
                  <span className={descText}>XYZ Values</span>
                </h1>
              </div>
              <div className="p-4 text-sm space-y-4 w-1/2">
                <h1>
                  <span className={descTitle}>
                    Location(Work/Item/Service) :{" "}
                  </span>{" "}
                  <span className={descText}>XYZ Values</span>
                </h1>
                <h1>
                  <span className={descTitle}>Pin Code : </span>{" "}
                  <span className={descText}>XYZ Values</span>
                </h1>
                <h1>
                  <span className={descTitle}>
                    Bid Validity Date (In Days) :{" "}
                  </span>{" "}
                  <span className={descText}>XYZ Values</span>
                </h1>
                <h1>
                  <span className={descTitle}>
                    Completion Period in Months :{" "}
                  </span>{" "}
                  <span className={descText}>XYZ Values</span>
                </h1>
              </div>
            </div>
          </div>
          <div className="flex  bg-white border shadow-xl mt-2 rounded">
            <div className="p-10 text-sm space-y-4 w-1/2 ">
              <h1>
                <span className={descTitle}>Pre Bid Meeting : </span>{" "}
                <span className={descText}>XYZ Values</span>
              </h1>
              <h1>
                <span className={descTitle}>Pre Bid Meeting Place : </span>{" "}
                <span className={descText}>XYZ Values</span>
              </h1>
              <h1>
                <span className={descTitle}>Pre Bid Meeting Address : </span>{" "}
                <span className={descText}>XYZ Values</span>
              </h1>
              <h1>
                <span className={descTitle}>Bid Opening Place : </span>{" "}
                <span className={descText}>XYZ Values</span>
              </h1>
              <h1>
                <span className={descTitle}>Tender Class : </span>{" "}
                <span className={descText}>XYZ Values</span>
              </h1>
            </div>
            <div className="p-4 pt-9 text-sm space-y-4 w-1/2">
              <h1>
                <span className={descTitle}>Inviting Officer Name : </span>{" "}
                <span className={descText}>XYZ Values</span>
              </h1>
              <h1>
                <span className={descTitle}>nviting Officer Address : </span>{" "}
                <span className={descText}>XYZ Values</span>
              </h1>
              <h1>
                <span className={descTitle}>
                  Inviting Officer Phone/Email :{" "}
                </span>{" "}
                <span className={descText}>XYZ Values</span>
              </h1>
            </div>
          </div>

          {/* Tender Fee Details */}

          <div className="bg-[#4338ca] border-b  p-4 rounded mt-5">
            <p className="text-xl text-white">Tender Fee Details</p>
          </div>

          <div className="flex flex-col bg-white border shadow-xl mt-2 rounded">
            <div className="p-4 flex text-sm w-full">
              <div className="p-5 w-1/3 space-y-3">
                <h1>
                  <span className={descTitle}>Tender Fee :</span>{" "}
                  <span className={descText}>XYZ Values</span>
                </h1>
                <h1>
                  <span className={descTitle}>Processing Fee :</span>{" "}
                  <span className={descText}>XYZ Values</span>
                </h1>
              </div>

              <div className="p-5 w-1/3 space-y-3">
                <h1>
                  <span className={descTitle}>Tender Fee Payable At :</span>{" "}
                  <span className={descText}>XYZ Values</span>
                </h1>
                <h1>
                  <span className={descTitle}>Tender Fee Payable To :</span>{" "}
                  <span className={descText}>XYZ Values</span>
                </h1>
              </div>

              <div className="p-5 w-1/3 space-y-3">
                <h1>
                  <span className={descTitle}>Surg Charges :</span>{" "}
                  <span className={descText}>XYZ Values</span>
                </h1>
                <h1>
                  <span className={descTitle}>Other Charges :</span>{" "}
                  <span className={descText}>XYZ Values</span>
                </h1>
              </div>
            </div>
          </div>

          {/* EMD  Fee Details */}

          <div className="bg-[#4338ca] border-b  p-4 rounded mt-5">
            <p className="text-xl text-white">EMD Fee Details</p>
          </div>

          <div className="flex flex-col bg-white border shadow-xl mt-2 rounded">
            <div className="p-4 flex text-sm w-full">
              <div className="p-5 w-1/3 space-y-3">
                <h1>
                  <span className={descTitle}>EMD Fee :</span>{" "}
                  <span className={descText}>XYZ Values</span>
                </h1>
                <h1>
                  <span className={descTitle}>EMD (Fixed/Percentage) :</span>{" "}
                  <span className={descText}>XYZ Values</span>
                </h1>
              </div>

              <div className="p-5 w-1/3 space-y-3">
                <h1>
                  <span className={descTitle}>Tender Fee Payable At :</span>{" "}
                  <span className={descText}>XYZ Values</span>
                </h1>
                <h1>
                  <span className={descTitle}>Tender Fee Payable To :</span>{" "}
                  <span className={descText}>XYZ Values</span>
                </h1>
              </div>

              <div className="p-5 w-1/3 space-y-3">
                <h1>
                  <span className={descTitle}>EMD Exemption Allowed :</span>{" "}
                  <span className={descText}>XYZ Values</span>
                </h1>
              </div>
            </div>
          </div>

          {/* Critical Dates*/}

          <div className="bg-[#4338ca] border-b  p-4 rounded mt-5">
            <p className="text-xl text-white">Critical Dates</p>
          </div>

          <div className="flex flex-col bg-white border shadow-xl mt-2 rounded">
            <div className="p-4 flex text-sm w-full">
              <div className="p-5 w-1/3 space-y-3">
                <h1>
                  <span className={descTitle}>Publishing Date :</span>{" "}
                  <span className={descText}>XYZ Values</span>
                </h1>
                <h1>
                  <span className={descTitle}>Bid Opening Date :</span>{" "}
                  <span className={descText}>XYZ Values</span>
                </h1>
                <h1>
                  <span className={descTitle}>Pre Bid Meeting Date :</span>{" "}
                  <span className={descText}>XYZ Values</span>
                </h1>
              </div>

              <div className="p-5 w-1/3 space-y-3">
                <h1>
                  <span className={descTitle}>Document Sale Start Date :</span>{" "}
                  <span className={descText}>XYZ Values</span>
                </h1>
                <h1>
                  <span className={descTitle}>Document Sale End Date :</span>{" "}
                  <span className={descText}>XYZ Values</span>
                </h1>
              </div>

              <div className="p-5 w-1/3 space-y-3">
                <h1>
                  <span className={descTitle}>
                    Seek Clarification Start Date :
                  </span>{" "}
                  <span className={descText}>XYZ Values</span>
                </h1>
                <h1>
                  <span className={descTitle}>
                    Seek Clarification End Date :
                  </span>{" "}
                  <span className={descText}>XYZ Values</span>
                </h1>
              </div>
            </div>
          </div>

          {/* Bid Openers Selection */}

          <div className="bg-[#4338ca] border-b  p-4 rounded mt-5">
            <p className="text-xl text-white">Bid Openers Selection</p>
          </div>

          <div className="flex flex-col bg-white border shadow-xl mt-2 rounded">
            <div className="p-4 flex text-sm w-full">
              <div className="p-5 w-1/3 space-y-3">
                <h1>
                  <span className={descTitle}>BO1 Name/Designation :</span>{" "}
                  <span className={descText}>XYZ Values</span>
                </h1>
                <h1>
                  <span className={descTitle}>BO2 Name/Designation :</span>{" "}
                  <span className={descText}>XYZ Values</span>
                </h1>
                <h1>
                  <span className={descTitle}>BO3 Name/Designation :</span>{" "}
                  <span className={descText}>XYZ Values</span>
                </h1>
              </div>

              <div className="p-5 w-1/3 space-y-3">
                <h1>
                  <span className={descTitle}>Email :</span>{" "}
                  <span className={descText}>XYZ Values</span>
                </h1>
                <h1>
                  <span className={descTitle}>Email :</span>{" "}
                  <span className={descText}>XYZ Values</span>
                </h1>
                <h1>
                  <span className={descTitle}>Email :</span>{" "}
                  <span className={descText}>XYZ Values</span>
                </h1>
              </div>
            </div>
          </div>

          {/* Tender Documents */}

          <div className="bg-[#4338ca] border-b  p-4 rounded mt-5">
            <p className="text-xl text-white">Tender Documents</p>
          </div>

          <div className="w-full bg-white border shadow-xl mt-2 rounded p-9">
            <div className="flex">
              <div className="w-[70%] space-y-4 pt-9">
                <div className="flex space-x-10">
                  <h1>
                    <span className={descTitle}>File Name :</span>{" "}
                    <span className={descText}>XYZ Values</span>
                  </h1>
                  <h1>
                    <span className={descTitle}>Document Size :</span>{" "}
                    <span className={descText}>XYZ Values</span>
                  </h1>
                </div>
                <h1>
                  <span className={descTitle}>Discription :</span>{" "}
                  <span className={descText}>
                    {" "}
                    Lipsum dolor sit amet. 33 quod temporibus sed repudiandae
                    reiciendis ex distinctio voluptatum ut deleniti possimus sit
                    dicta maxime et quaerat doloribus. Est{" "}
                  </span>
                </h1>
              </div>
              <div className="w-[30%] flex justify-center items-center text-center">
                <div>
                  <img src={d} className="w-52 rounded mt-5" />{" "}
                  <p className={descTitle}>Uploaded Reference Doc</p>{" "}
                </div>
              </div>
            </div>
            <hr className="w-[71rem] mt-10" />
            {/* //////// */}
          </div>

          <div className=" mt-10 flex justify-end space-x-4">
            <button
              onClick={handlePrint}
              className="pb-2 pl-6 pr-6 pt-2 border border-indigo-500 text-base leading-tight  rounded bg-indigo-700 text-white hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out shadow-xl"
            >
              Print
            </button>
            <button className="p-2 pl-4 pr-4 border border-indigo-500 text-white text-base leading-tight rounded  hover:bg-white  hover:text-indigo-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#4338CA] active:shadow-lg transition duration-150 ease-in-out shadow-xl bg-[#4338CA] animate-pulse">
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TenderFormViewDetails;
